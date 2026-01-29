'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

import RebirthApplication from '../components/RebirthApplication';
import LinkedInCard from '../components/LinkedInCard';
import LinkedInNativeCard from '../components/LinkedInNativeCard';
import profileBackground from '../assets/new-profile-backgroud.jpg';
import ServiceCard from '../components/ServiceCard';
import TestimonialsSection from '../components/TestimonialsSection';

import services from '../services.jsx';
import linkedinClients from '../linkedinClients.jsx';
import anushkaProfile from '../anushkaProfile.jsx';

export default function HomePage() {
    const reduced = useReducedMotion();
    const [showApplyForm, setShowApplyForm] = useState(false);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    // Inline form reveal animation
    const formReveal = {
        hidden: { opacity: 0, height: 0, marginTop: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            marginTop: 32,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            transition: { duration: 0.3, ease: "easeIn" }
        }
    };

    const handleApplySubmit = async (data) => {
        const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyPEp0WbIMixZu8Q-OBn6qFw0vWESec5Ncu4wwbjPK6kE6gGRFP6RukNheDSLDG4lJJrQ/exec';
        try {
            const response = await fetch(GOOGLE_APP_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'rebirth-application', ...data })
            });
            if (!response.ok) {
                await fetch(GOOGLE_APP_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'rebirth-application', ...data })
                });
            }
        } catch (error) {
            console.error('Submission error:', error);
            await fetch(GOOGLE_APP_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'rebirth-application', ...data })
            });
        }
    };

    return (
        <>
            {/* ═══════════════════════════════════════════════════════════════
                HERO - Bold, Declarative, First-Person
            ═══════════════════════════════════════════════════════════════ */}
            <section className="min-h-screen flex items-center justify-start relative text-white">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={profileBackground}
                        alt=""
                        priority
                        placeholder="blur"
                        sizes="100vw"
                        fill
                        className="hidden md:block object-cover object-center"
                    />
                    <div className="block md:hidden absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-300 to-rose-300">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 50%),
                                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 0%, transparent 50%)`
                        }} />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/60 md:via-black/30 md:to-transparent" />

                <motion.div
                    className="relative z-10 container mx-auto px-6 flex items-center min-h-[inherit]"
                    initial={reduced ? undefined : { opacity: 0, x: -40 }}
                    animate={reduced ? undefined : { opacity: 1, x: 0 }}
                    transition={{ duration: reduced ? 0 : 0.8 }}
                >
                    <div className="w-full md:max-w-[55%] lg:max-w-[48%] space-y-6">
                        <motion.h1
                            className="text-[3.5rem] md:text-[4.5rem] leading-[0.95] font-bold text-white tracking-tight"
                            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                            initial={reduced ? undefined : { opacity: 0, y: 24 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.6, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-anushka-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                                Rebirth
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-white/90 font-medium max-w-md leading-relaxed"
                            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
                            initial={reduced ? undefined : { opacity: 0, y: 20 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.5, delay: 0.35 }}
                        >
                            I help ambitious women build personal brands that command attention.
                        </motion.p>

                        <motion.div
                            className="pt-2"
                            initial={reduced ? undefined : { opacity: 0, y: 16 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.5, delay: 0.5 }}
                        >
                            <motion.button
                                onClick={() => {
                                    const el = document.getElementById('apply-section');
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-3 bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
                            >
                                Start Here
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-6 h-6 text-white/50" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                POSITIONING STATEMENT CARD
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-2xl mx-auto"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Positioning Card */}
                        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-anushka-500/40 via-rose-500/30 to-anushka-600/40">
                            <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-8 md:p-10">
                                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium text-center">
                                    Most talented women stay invisible—not because they lack value, but because they haven't learned how to <span className="text-anushka-600">position themselves with intention</span>.
                                </p>
                                <p className="text-lg text-gray-600 mt-6 text-center">
                                    Rebirth is for women who are done waiting to be discovered.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                WHAT YOU'LL ACHIEVE - Program Cards
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                            What You'll Achieve
                        </h2>
                    </motion.div>

                    <motion.div layout className="space-y-10 max-w-4xl mx-auto">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <ServiceCard {...service} reverse={index % 2 === 1} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                PROOF - Client Results
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                            Real Results
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
                    >
                        {linkedinClients.map((client, index) => (
                            <motion.div variants={fadeInUp} key={index}>
                                <LinkedInCard client={client} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                LINKEDIN PROOF CARD - Where I Show Up
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                            Where I Show Up
                        </h2>
                    </motion.div>

                    <div className="flex justify-center">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="w-full max-w-[450px]"
                        >
                            <LinkedInNativeCard profile={anushkaProfile} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                TESTIMONIALS - Kept As-Is, Tightened Spacing
            ═══════════════════════════════════════════════════════════════ */}
            <div className="py-12 md:py-16">
                <TestimonialsSection />
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                ABOUT - Moved to Bottom, Founder Perspective
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="shrink-0">
                                <div className="relative">
                                    <Image
                                        src="./favicon.png"
                                        alt="Anushka Jain"
                                        width={160}
                                        height={160}
                                        className="rounded-full shadow-xl w-40 h-40 object-cover border-3 border-anushka-500/40"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-anushka-800 to-rose-800 bg-clip-text text-transparent font-serif">
                                    I believe visibility is a choice.
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    I created Rebirth because I saw too many brilliant women fading into the background. You have the expertise, the vision, and the drive—but your digital presence doesn't reflect your true power. That changes here.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FINAL CTA - Inline Expandable Form
            ═══════════════════════════════════════════════════════════════ */}
            <section id="apply-section" className="py-20 md:py-28 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream scroll-mt-8">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                            Ready to be seen?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            If this resonates, let's talk.
                        </p>

                        {/* CTA Button - Toggles inline form */}
                        <motion.button
                            onClick={() => setShowApplyForm(!showApplyForm)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
                        >
                            {showApplyForm ? 'Close' : 'Apply for Rebirth'}
                            <ArrowRight className={`w-5 h-5 transition-transform ${showApplyForm ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </motion.button>

                        {/* Inline Form - Reveals on click */}
                        <AnimatePresence>
                            {showApplyForm && (
                                <motion.div
                                    variants={formReveal}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="overflow-hidden"
                                >
                                    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-anushka-500/50 via-rose-500/30 to-anushka-600/50">
                                        <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 md:p-8 text-left">
                                            <RebirthApplication onSubmit={handleApplySubmit} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
