'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, MessageCircle, Loader2, AlertCircle } from 'lucide-react';

// WhatsApp private channel link — update this URL when the channel is ready
const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VatEOTE6xCSm6osk4A31';

// ── Booking confirmation ─────────────────────────────────────────────────────
// Rendered immediately after successful form submission.
//
// Stages:
//   1. "pre-booking"  — CTA button prompting user to open Topmate.
//   2. "post-booking" — Welcome-back screen shown when user returns to this tab
//                        after visiting Topmate (detected via focus +
//                        visibilitychange events, gated on bookingStarted ref).
//
// No iframe. No redirect. No polling. Pure tab-return detection.
function BookingConfirmation({ bookingUrl }) {
    // True once user has clicked the CTA and Topmate opened in a new tab
    const bookingStarted = useRef(false);

    // Drives which UI is rendered — 'cta' | 'welcome'
    const [stage, setStage] = useState('cta');

    // Helper text shown below the CTA button; updated once booking starts
    const [helperText, setHelperText] = useState(
        'After completing your payment, return to this tab to continue.'
    );

    useEffect(() => {
        // Called when this tab regains focus or becomes visible.
        // Only transitions to welcome-back if user previously clicked the CTA.
        function handleReturn() {
            if (bookingStarted.current) {
                setStage('welcome');
            }
        }

        // window focus fires when OS focus moves back to this tab/window
        window.addEventListener('focus', handleReturn);

        // visibilitychange catches mobile tab-switching and alt-tab on desktop
        const onVisibility = () => {
            if (!document.hidden) handleReturn();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            window.removeEventListener('focus', handleReturn);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []); // register once — bookingStarted is a ref, no dep needed

    // ── CTA click handler ─────────────────────────────────────────
    function handleBookingClick() {
        bookingStarted.current = true;
        window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        // Update helper text to acknowledge the action
        setHelperText('Booking is open in a new tab. Complete your payment there, then come back here.');
    }

    // ── Welcome-back screen ───────────────────────────────────────
    if (stage === 'welcome') {
        return (
            <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-center max-w-[720px] mx-auto px-5 py-10"
            >
                <h2 className="text-[28px] font-bold text-gray-900 mb-4 leading-snug">
                    Welcome Back 🎉
                </h2>

                <p className="text-gray-600 mb-3 leading-relaxed">
                    If your booking is complete, your confirmation has been sent to your email and WhatsApp.
                </p>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    We're excited to support your next chapter.
                </p>

                {/* WhatsApp CTA — soft warm green to feel distinct from booking CTA */}
                <a
                    href={WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium text-base px-7 py-[13px] rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    <MessageCircle className="w-4 h-4" />
                    Join Private WhatsApp Channel
                </a>

                <p className="mt-5 text-[13px] text-gray-400 leading-relaxed">
                    Didn't complete your booking?{' '}
                    <button
                        onClick={() => {
                            bookingStarted.current = false;
                            setStage('cta');
                            setHelperText('After completing your payment, return to this tab to continue.');
                        }}
                        className="text-anushka-500 underline hover:text-anushka-700 transition-colors"
                    >
                        Go back
                    </button>
                </p>
            </motion.div>
        );
    }

    // ── Pre-booking CTA screen ────────────────────────────────────
    return (
        <motion.div
            key="cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-center max-w-[720px] mx-auto px-5 py-10"
        >
            {/* Heading */}
            <h2 className="text-[28px] font-bold text-gray-900 mb-4 leading-snug">
                Secure Your Strategy Call
            </h2>

            {/* Supporting copy */}
            <p className="text-gray-600 mb-8 leading-relaxed">
                Your details have been saved. Complete your booking to confirm your session.
            </p>

            {/* Primary CTA — opens Topmate in new tab, marks bookingStarted */}
            <button
                onClick={handleBookingClick}
                className="inline-flex items-center gap-2 bg-anushka-500 hover:bg-anushka-600 active:bg-anushka-700 text-white font-semibold text-base px-7 py-[14px] rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
                Continue to Secure Your Call
                <ArrowRight className="w-4 h-4" />
            </button>

            {/* Helper text — updates once booking tab is opened */}
            <p className="mt-5 text-[13px] text-gray-400 leading-relaxed">
                {helperText}
            </p>
        </motion.div>
    );
}

// Google Apps Script endpoint
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIQNs6Wsw0H4T0Bd47IYflMif2QTcbBTgoqAavTbtiERyUFNKtMxEJBSAHyu1Sdvpr2A/exec';

// Flow configuration with conditional branching
const FLOW_CONFIG = {
    step1: {
        id: 'spark',
        reflective: "Every transformation begins with a single spark.",
        question: "What brings you to Rebirth today?",
        type: 'choice',
        options: [
            { id: 'thought-leader', label: "I'm ready to be seen as a thought leader", next: 'step2a' },
            { id: 'opportunities', label: "I want to attract better opportunities", next: 'step2b' },
            { id: 'clarity', label: "I need clarity on my personal brand", next: 'step2c' },
            { id: 'exploring', label: "I'm just exploring for now", next: 'early-exit' },
        ]
    },
    step2a: {
        id: 'state-leader',
        reflective: "Thought leadership isn't about being the loudest voice—it's about being the most intentional one.",
        question: "Where are you in your journey right now?",
        type: 'choice',
        options: [
            { id: 'established', label: "I have a presence, but it doesn't feel like me", next: 'step3' },
            { id: 'starting', label: "I'm starting fresh and need direction", next: 'step3' },
            { id: 'struggle', label: "I know what I want but struggle to communicate it", next: 'step3' },
        ]
    },
    step2b: {
        id: 'state-opportunities',
        reflective: "The right opportunities don't find you by accident—they find you because of what you stand for.",
        question: "Where are you in your journey right now?",
        type: 'choice',
        options: [
            { id: 'established', label: "I have a presence, but it doesn't feel like me", next: 'step3' },
            { id: 'starting', label: "I'm starting fresh and need direction", next: 'step3' },
            { id: 'struggle', label: "I know what I want but struggle to communicate it", next: 'step3' },
        ]
    },
    step2c: {
        id: 'state-clarity',
        reflective: "Clarity is the foundation of confidence. You can't stand out until you know what you stand for.",
        question: "Where are you in your journey right now?",
        type: 'choice',
        options: [
            { id: 'established', label: "I have a presence, but it doesn't feel like me", next: 'step3' },
            { id: 'starting', label: "I'm starting fresh and need direction", next: 'step3' },
            { id: 'struggle', label: "I know what I want but struggle to communicate it", next: 'step3' },
        ]
    },
    step3: {
        id: 'commitment',
        reflective: "Rebirth is not a quick fix. It's a commitment to becoming who you were always meant to be.",
        question: "How ready are you to invest in your transformation?",
        type: 'choice',
        options: [
            { id: 'ready-now', label: "I'm ready to start now", next: 'step4' },
            { id: 'ready-soon', label: "I'm ready within the next month", next: 'step4' },
            { id: 'need-time', label: "I need more time to decide", next: 'soft-exit' },
        ]
    },
    step4: {
        id: 'vision',
        reflective: "Let's paint a picture of your future self.",
        question: "In 90 days, what does success look like for you?",
        type: 'textarea',
        placeholder: "Take your time. There are no wrong answers here...",
        next: 'step5'
    },
    step5: {
        id: 'connection',
        reflective: "You've taken the first step. Now let's connect.",
        question: "How can I reach you?",
        type: 'contact-form',
    },
    'early-exit': {
        id: 'early-exit',
        type: 'exit',
        title: "That's completely okay.",
        message: "Rebirth isn't for everyone, and it shouldn't be. When you're ready to take the leap, I'll be here.",
        showWhatsApp: true,
    },
    'soft-exit': {
        id: 'soft-exit',
        type: 'exit',
        title: "Taking time is wise.",
        message: "Transformation shouldn't be rushed. Join my community to stay connected and step in when you're ready.",
        showWhatsApp: true,
    }
};

export default function RebirthApplication() {
    const [currentStep, setCurrentStep] = useState('step1');
    const [responses, setResponses] = useState({});
    const [history, setHistory] = useState(['step1']);
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
        platform: '',
        instagram: '',
        linkedin: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [visionText, setVisionText] = useState('');
    // Stores the final Topmate URL (with prefill params) set on submit success
    const [bookingUrl, setBookingUrl] = useState('');
    // Captured before contactInfo is reset — passed to BookingConfirmation
    // so it can call /api/check-booking?email=… on tab return
    const [submittedEmail, setSubmittedEmail] = useState('');

    const step = FLOW_CONFIG[currentStep];

    const handleChoice = (option) => {
        setResponses(prev => ({ ...prev, [step.id]: option.label }));
        setHistory(prev => [...prev, option.next]);
        setCurrentStep(option.next);
    };

    const handleBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            setHistory(newHistory);
            setCurrentStep(newHistory[newHistory.length - 1]);
        }
    };

    const handleTextareaNext = () => {
        if (visionText.trim()) {
            setResponses(prev => ({ ...prev, [step.id]: visionText }));
            setHistory(prev => [...prev, step.next]);
            setCurrentStep(step.next);
        }
    };

    const handleContactChange = (field, value) => {
        setContactInfo(prev => ({ ...prev, [field]: value }));
        // Clear error when user makes changes
        if (submitError) setSubmitError('');
    };

    const isContactValid = () => {
        const hasName = contactInfo.name.trim().length > 0;
        const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email);
        const hasPhone = contactInfo.phone.trim().length >= 10;
        const hasPlatform = contactInfo.platform.length > 0;
        const hasSocial = contactInfo.instagram.trim().length > 0 || contactInfo.linkedin.trim().length > 0;
        return hasName && hasEmail && hasPhone && hasPlatform && hasSocial;
    };

    const handleSubmit = async () => {
        if (!isContactValid() || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitError('');

        // Build payload matching the exact required format
        const payload = {
            name: contactInfo.name.trim(),
            email: contactInfo.email.trim(),
            phone: contactInfo.phone.trim(),
            platform: contactInfo.platform,
            instagram: contactInfo.instagram.trim(),
            linkedin: contactInfo.linkedin.trim(),
            step1: responses['spark'] || '',
            step2: responses['state-leader'] || responses['state-opportunities'] || responses['state-clarity'] || '',
            step3: responses['commitment'] || '',
            step4: visionText.trim(),
            intention: responses['spark'] || '',
            // Initial booking status — set to "Applied" on form submit.
            // The topmate-webhook API updates this to "Booked" after payment.
            booking_status: 'Applied',
        };

        console.log("Submitting payload:", payload);

        try {
            // Using mode: 'no-cors' is essential for Google Apps Script
            // It allows the request to complete even though we can't read the response (opaque)
            // This prevents the "Network Error" caused by Google's 302 redirects
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload),
            });

            // no-cors returns an opaque response — assume success if fetch resolves.

            // Build prefill URL — capture visionText NOW before state reset below.
            // Topmate may not support all params; if not, they're silently ignored.
            const prefilled = new URL('https://topmate.io/anushka_jain10/1307274');
            prefilled.searchParams.set('name',  contactInfo.name.trim());
            prefilled.searchParams.set('email', contactInfo.email.trim());
            prefilled.searchParams.set('phone', contactInfo.phone.trim());
            // Pass the 90-day vision as notes — surfaces context for the call
            if (visionText.trim()) {
                prefilled.searchParams.set('notes', visionText.trim());
            }
            setBookingUrl(prefilled.toString());
            // Capture email before contactInfo is reset below
            setSubmittedEmail(contactInfo.email.trim());

            // Show booking confirmation UI — no iframe, no redirect
            setIsSubmitted(true);
            setResponses({});
            setVisionText('');
            setContactInfo({
                name: '',
                email: '',
                phone: '',
                platform: '',
                instagram: '',
                linkedin: '',
            });

        } catch (error) {
            console.error("Submission failed:", error);
            setSubmitError('Unable to submit. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progressPercent = () => {
        const stepOrder = ['step1', 'step2a', 'step2b', 'step2c', 'step3', 'step4', 'step5'];
        const currentIndex = stepOrder.findIndex(s => s === currentStep ||
            (currentStep.startsWith('step2') && s.startsWith('step2')));
        return Math.min(((currentIndex + 1) / 5) * 100, 100);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    // ── Success state: Booking confirmation ──────────────────────────
    // Form fades out, confirmation UI fades in.
    // BookingConfirmation handles CTA → tab-return → API check → confirmed/pending.
    if (isSubmitted) {
        return <BookingConfirmation bookingUrl={bookingUrl} userEmail={submittedEmail} />;
    }

    // Exit screens (early exit or soft exit)
    if (step.type === 'exit') {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-8"
            >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent font-serif">
                    {step.title}
                </h3>
                <p className="text-gray-700 mb-8 max-w-md mx-auto leading-relaxed">
                    {step.message}
                </p>
                {step.showWhatsApp && (
                    <motion.a
                        href="https://chat.whatsapp.com/YOUR_CHANNEL_LINK"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        <MessageCircle size={20} />
                        Join the Rebirth Community
                    </motion.a>
                )}
                <button
                    onClick={() => { setCurrentStep('step1'); setHistory(['step1']); setResponses({}); }}
                    className="block mx-auto mt-6 text-anushka-600 hover:text-anushka-700 underline text-sm"
                >
                    Start over
                </button>
            </motion.div>
        );
    }

    return (
        <div className="relative">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="h-1 bg-anushka-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-anushka-500 to-rose-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent()}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Reflective statement */}
                    <p className="text-anushka-600 font-medium mb-2 text-sm uppercase tracking-wider">
                        {step.reflective}
                    </p>

                    {/* Question */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 font-serif">
                        {step.question}
                    </h3>

                    {/* Choice options */}
                    {step.type === 'choice' && (
                        <div className="space-y-3">
                            {step.options.map((option, index) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleChoice(option)}
                                    className="w-full text-left p-4 rounded-xl border-2 border-anushka-200 hover:border-anushka-400 bg-white/60 hover:bg-white/80 transition-all duration-200 group"
                                >
                                    <span className="text-gray-700 group-hover:text-anushka-700 font-medium">
                                        {option.label}
                                    </span>
                                    <ArrowRight className="inline-block ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-anushka-500" />
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* Textarea for vision */}
                    {step.type === 'textarea' && (
                        <div className="space-y-4">
                            <textarea
                                value={visionText}
                                onChange={(e) => setVisionText(e.target.value)}
                                placeholder={step.placeholder}
                                rows={5}
                                className="w-full p-4 rounded-xl border-2 border-anushka-200 focus:border-anushka-400 bg-white/60 focus:bg-white/80 transition-all duration-200 resize-none text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/30"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleTextareaNext}
                                disabled={!visionText.trim()}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-anushka-500 to-rose-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Continue <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    )}

                    {/* Contact form (final step) */}
                    {step.type === 'contact-form' && (
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name *"
                                    value={contactInfo.name}
                                    onChange={(e) => handleContactChange('name', e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-anushka-200 focus:border-anushka-400 bg-white/60 focus:bg-white/80 transition-all text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/30"
                                />
                                <input
                                    type="email"
                                    placeholder="Your email *"
                                    value={contactInfo.email}
                                    onChange={(e) => handleContactChange('email', e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-anushka-200 focus:border-anushka-400 bg-white/60 focus:bg-white/80 transition-all text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/30"
                                />
                            </div>
                            <input
                                type="tel"
                                placeholder="Phone number *"
                                value={contactInfo.phone}
                                onChange={(e) => handleContactChange('phone', e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-anushka-200 focus:border-anushka-400 bg-white/60 focus:bg-white/80 transition-all text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/30"
                            />

                            {/* Platform selection */}
                            <div>
                                <p className="text-gray-600 mb-2 text-sm">Which platform do you primarily use? *</p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleContactChange('platform', 'Instagram')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${contactInfo.platform === 'Instagram'
                                            ? 'border-anushka-500 bg-anushka-50 text-anushka-700'
                                            : 'border-anushka-200 bg-white/60 text-gray-600 hover:border-anushka-300'
                                            }`}
                                    >
                                        Instagram
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleContactChange('platform', 'LinkedIn')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${contactInfo.platform === 'LinkedIn'
                                            ? 'border-anushka-500 bg-anushka-50 text-anushka-700'
                                            : 'border-anushka-200 bg-white/60 text-gray-600 hover:border-anushka-300'
                                            }`}
                                    >
                                        LinkedIn
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleContactChange('platform', 'Both')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${contactInfo.platform === 'Both'
                                            ? 'border-anushka-500 bg-anushka-50 text-anushka-700'
                                            : 'border-anushka-200 bg-white/60 text-gray-600 hover:border-anushka-300'
                                            }`}
                                    >
                                        Both
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Instagram handle"
                                    value={contactInfo.instagram}
                                    onChange={(e) => handleContactChange('instagram', e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-anushka-200 focus:border-anushka-400 bg-white/60 focus:bg-white/80 transition-all text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/30"
                                />
                                <input
                                    type="text"
                                    placeholder="LinkedIn profile URL"
                                    value={contactInfo.linkedin}
                                    onChange={(e) => handleContactChange('linkedin', e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-anushka-200 focus:border-anushka-400 bg-white/60 focus:bg-white/80 transition-all text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/30"
                                />
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                * At least one social profile is required
                            </p>

                            {/* Error message */}
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                                >
                                    <AlertCircle size={18} />
                                    <span>{submitError}</span>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                onClick={handleSubmit}
                                disabled={!isContactValid() || isSubmitting}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-anushka-500 to-rose-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Application <Send size={18} />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    )}

                    {/* Back button (except first step and exits) */}
                    {history.length > 1 && step.type !== 'exit' && (
                        <button
                            onClick={handleBack}
                            className="mt-6 flex items-center gap-2 text-gray-500 hover:text-anushka-600 transition-colors text-sm"
                        >
                            <ArrowLeft size={16} /> Go back
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
