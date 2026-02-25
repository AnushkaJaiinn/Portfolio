/**
 * POST /api/topmate-webhook
 *
 * Receives booking confirmation webhooks from Topmate.
 * When a confirmed booking event arrives, finds the lead row in Google Sheets
 * by email and updates booking_status → "Booked".
 *
 * Required Vercel environment variables:
 *   GOOGLE_CLIENT_EMAIL   — service account email
 *   GOOGLE_PRIVATE_KEY    — service account private key (with literal \n line breaks)
 *   GOOGLE_SHEET_ID       — spreadsheet ID from the sheet URL
 *
 * To add env vars in Vercel:
 *   Project → Settings → Environment Variables → Add each key above.
 *   For GOOGLE_PRIVATE_KEY: paste the full key including -----BEGIN/END----- lines.
 *   Vercel stores newlines as \n; the code below restores them automatically.
 */

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// ── Sheet structure ────────────────────────────────────────────────────────
// Column indices (0-based) matching the "Leads" sheet header row.
// If you add/remove columns, update these numbers to match.
const COL = {
    EMAIL:          3,  // D — email
    BOOKING_STATUS: 11, // L — booking_status
};

const SHEET_NAME  = 'Leads';
const SHEET_RANGE = `${SHEET_NAME}!A2:L`; // read from row 2 (skip header)

// ── Accepted booking event names ──────────────────────────────────────────
// NOTE: Confirm the exact event type string from Topmate's webhook logs.
// Navigate to Topmate dashboard → Integrations → Webhooks → View recent events
// to see the actual event.type / event values sent in the payload.
const BOOKING_EVENTS = new Set([
    'booking_confirmed',
    'payment_success',
    'meeting_booked',
    'booking.confirmed', // dot-notation variant some platforms use
]);

// ── POST handler ──────────────────────────────────────────────────────────
export async function POST(request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
        }

        // ── Signature validation placeholder ──────────────────────────────
        // When Topmate provides a webhook secret / HMAC header, validate here
        // before processing any data:
        //
        //   const sig = request.headers.get('x-topmate-signature') ?? '';
        //   const rawBody = await request.text(); // must read before json()
        //   if (!verifyHmac(sig, rawBody, process.env.TOPMATE_WEBHOOK_SECRET)) {
        //     return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
        //   }
        //
        // Until Topmate publishes their signature scheme, we trust the payload
        // and rely on the BOOKING_EVENTS allowlist as a basic filter.

        // ── Extract event type ─────────────────────────────────────────────
        // Topmate payload shape is not yet publicly documented in detail.
        // Try the most common field names; adjust once you inspect real events.
        const eventType = (
            body.event        ??  // "booking_confirmed"
            body.type         ??  // "payment_success"
            body.event_type   ??  // some platforms use event_type
            ''
        ).toString().toLowerCase();

        if (!BOOKING_EVENTS.has(eventType)) {
            console.log(`[topmate-webhook] Ignored event: "${eventType}"`);
            // Return 200 so Topmate doesn't retry non-booking events
            return NextResponse.json({ received: true, action: 'ignored' }, { status: 200 });
        }

        // ── Extract email ──────────────────────────────────────────────────
        // Try nested data object first, then flat fields, then user sub-object.
        const email = (
            body.data?.email  ??
            body.email        ??
            body.user?.email  ??
            body.customer?.email ??
            ''
        ).toString().trim();

        if (!email) {
            console.warn('[topmate-webhook] No email found in payload:', JSON.stringify(body));
            return NextResponse.json({ error: 'email_missing' }, { status: 400 });
        }

        console.log(`[topmate-webhook] Processing "${eventType}" for ${email}`);
        await updateBookingStatus(email);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('[topmate-webhook] Unhandled error:', err);
        return NextResponse.json({ error: 'internal_error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'method_not_allowed' }, { status: 405 });
}

// ── Google Sheets helpers ─────────────────────────────────────────────────

function getAuthClient() {
    // GOOGLE_PRIVATE_KEY is stored verbatim in Vercel env vars with literal \n.
    // We must convert them to real newlines for the Google auth library.
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? '')
        .replace(/\\n/g, '\n');

    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key:  privateKey,
            // Do NOT log privateKey — even the first few chars — in production
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

async function updateBookingStatus(email) {
    const auth  = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Read all lead rows
    const readRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: SHEET_RANGE,
    });

    const rows = readRes.data.values ?? [];
    const emailLower = email.toLowerCase();

    // Walk all rows, keep the last match — most recent submission wins
    let targetIndex = -1;
    for (let i = 0; i < rows.length; i++) {
        const rowEmail = (rows[i][COL.EMAIL] ?? '').toString().toLowerCase().trim();
        if (rowEmail === emailLower) {
            targetIndex = i;
        }
    }

    if (targetIndex === -1) {
        // Log and return — don't error; the webhook must still get a 200
        console.warn(`[topmate-webhook] No sheet row found for email: ${email}`);
        return;
    }

    // Sheet row number: data starts at row 2, so index 0 = row 2
    const sheetRow   = targetIndex + 2;
    const colLetter  = numberToColumnLetter(COL.BOOKING_STATUS + 1); // +1 → 1-based

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range:            `${SHEET_NAME}!${colLetter}${sheetRow}`,
        valueInputOption: 'RAW',
        requestBody: {
            values: [['Booked']],
        },
    });

    console.log(
        `[topmate-webhook] booking_status set to "Booked" for ${email} (sheet row ${sheetRow})`
    );
}

/**
 * Convert a 1-based column number to a spreadsheet column letter.
 * 1 → "A", 12 → "L", 27 → "AA", etc.
 */
function numberToColumnLetter(n) {
    let letter = '';
    while (n > 0) {
        const rem = (n - 1) % 26;
        letter = String.fromCharCode(65 + rem) + letter;
        n = Math.floor((n - 1) / 26);
    }
    return letter;
}
