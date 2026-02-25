/**
 * GET /api/check-booking?email=user@example.com
 *
 * Returns the booking_status for a given lead email from Google Sheets.
 * Used by the frontend after the user returns from Topmate to verify
 * whether their booking was confirmed.
 *
 * Responses:
 *   200 { status: "Booked" }   — booking confirmed by webhook
 *   200 { status: "Applied" }  — form submitted, booking not yet confirmed
 *   400 { error: "email_required" }
 *   404 { error: "not_found" }
 *   500 { error: "internal_error" }
 *
 * Required Vercel environment variables (same as topmate-webhook):
 *   GOOGLE_CLIENT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 *   GOOGLE_SHEET_ID
 */

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Column indices (0-based) — must match the "Leads" sheet structure
const COL = {
    EMAIL:          3,  // D
    BOOKING_STATUS: 11, // L
};

const SHEET_RANGE = 'Leads!A2:L';

// ── GET handler ───────────────────────────────────────────────────────────
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get('email') ?? '').trim();

    if (!email) {
        return NextResponse.json({ error: 'email_required' }, { status: 400 });
    }

    try {
        const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? '')
            .replace(/\\n/g, '\n');

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key:  privateKey,
            },
            // Read-only scope — this endpoint never writes
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range:         SHEET_RANGE,
        });

        const rows = response.data.values ?? [];
        const emailLower = email.toLowerCase();

        // Walk all rows, keep last match (most recent submission for this email)
        let matchedRow = null;
        for (const row of rows) {
            const rowEmail = (row[COL.EMAIL] ?? '').toString().toLowerCase().trim();
            if (rowEmail === emailLower) {
                matchedRow = row;
            }
        }

        if (!matchedRow) {
            return NextResponse.json({ error: 'not_found' }, { status: 404 });
        }

        // Default to "Applied" if the cell is empty or not yet set
        const status = matchedRow[COL.BOOKING_STATUS] || 'Applied';
        return NextResponse.json({ status }, { status: 200 });

    } catch (err) {
        console.error('[check-booking] Error:', err);
        return NextResponse.json({ error: 'internal_error' }, { status: 500 });
    }
}

export async function POST() {
    return NextResponse.json({ error: 'method_not_allowed' }, { status: 405 });
}
