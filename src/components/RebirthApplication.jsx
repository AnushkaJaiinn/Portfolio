'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, MessageCircle, Check, Loader2, AlertCircle } from 'lucide-react';

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
        };

        console.log("Submitting payload:", payload);

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            console.log("Server response:", text);

            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                // If response isn't JSON, assume success if status is ok (though unlikely with this script)
                if (response.ok) {
                    result = { success: true };
                } else {
                    throw new Error('Invalid server response');
                }
            }

            if (result.success) {
                setIsSubmitted(true);
                // Clear form state on success
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
            } else {
                setSubmitError(result.message || 'Something went wrong. Please try again.');
            }
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

    // Success state
    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-anushka-500 to-rose-500 flex items-center justify-center"
                >
                    <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent font-serif">
                    Your application has been received.
                </h3>
                <p className="text-gray-700 max-w-md mx-auto leading-relaxed">
                    I personally review every application. If Rebirth feels like the right fit for both of us,
                    I'll reach out within 48 hours to schedule a conversation.
                </p>
            </motion.div>
        );
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
