'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

import RebirthApplication from '../components/RebirthApplication';
import LinkedInNativeCard from '../components/LinkedInNativeCard';
import TestimonialsSection from '../components/TestimonialsSection';

import anushkaProfile from '../anushkaProfile.jsx';
import profileBackground from '../assets/new-profile-backgroud.jpg';

export default function HomePage() {
    const reduced = useReducedMotion();
    const [showApplyForm, setShowApplyForm] = useState(false);
    const applyRef = useRef(null);

    /* ── Animation variants ──────────────────────────────────────── */
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const formReveal = {
        hidden: { opacity: 0, height: 0, marginTop: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            marginTop: 32,
            transition: { duration: 0.4, ease: 'easeOut' }
        }
    };

    /* ── Scroll to apply section helper ──────────────────────────── */
    const scrollToApply = () => {
        const el = document.getElementById('apply-section');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    /* ── Outcomes data ───────────────────────────────────────────── */
    const outcomes = [
        'Clear personal brand positioning',
        'Authority-driven content strategy',
        'Monetisation roadmap',
        'Confidence to show up consistently',
        'A brand people trust and pay',
    ];

    /* ── "For you" / "Not for you" data ──────────────────────────── */
    const forYou = [
        'You are already building something',
        'You want authority positioning',
        "You're ready to invest in growth",
    ];
    const notForYou = [
        'Freebie seekers',
        'Students looking for shortcuts',
        'People not ready to commit',
    ];

    return (
        <>
            {/* ══════════════════════════════════════════════════════════
                1. HERO — Full-bleed editorial split
                   Image: absolutely fills right 58% of viewport
                   Text: floats on left, z-above image
                   Blend: wide left-edge gradient on image dissolves
                          the photo into the section background
            ══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">

                {/* ── DESKTOP photo — right 68%, full height ─────────── */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-[68%] pointer-events-none select-none">
                    <Image
                        src={profileBackground}
                        alt="Anushka Jain"
                        priority
                        placeholder="blur"
                        fill
                        sizes="68vw"
                        className="object-cover object-top"
                    />
                    {/* Wide left-edge fade — photo dissolves into bg */}
                    <div className="absolute inset-y-0 left-0 w-[72%] z-10"
                        style={{ background: 'linear-gradient(to right, #fdf2f8 0%, #fdf5fa 15%, rgba(253,242,248,0.55) 45%, rgba(253,242,248,0.15) 70%, transparent 100%)' }} />
                    {/* Top fade */}
                    <div className="absolute inset-x-0 top-0 h-28 z-10"
                        style={{ background: 'linear-gradient(to bottom, #fdf2f8 0%, transparent 100%)' }} />
                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-36 z-10"
                        style={{ background: 'linear-gradient(to top, #fef7f0 0%, transparent 100%)' }} />
                </div>

                {/* ── Content layer (above image on desktop) ─────────── */}
                <div className="relative z-20 w-full">

                    {/* ── MOBILE layout ────────────────────────────────── */}
                    <div className="md:hidden flex flex-col">
                        <div className="relative w-full h-[52vh]">
                            <Image
                                src={profileBackground}
                                alt="Anushka Jain"
                                priority
                                placeholder="blur"
                                fill
                                sizes="100vw"
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
                                style={{ background: 'linear-gradient(to bottom, transparent 0%, #fdf2f8 50%, #fef7f0 100%)' }} />
                            <div className="absolute inset-y-0 left-0 w-12 pointer-events-none"
                                style={{ background: 'linear-gradient(to right, #fdf2f8, transparent)' }} />
                            <div className="absolute inset-y-0 right-0 w-12 pointer-events-none"
                                style={{ background: 'linear-gradient(to left, #fef7f0, transparent)' }} />
                        </div>
                        <motion.div
                            className="-mt-16 pb-14 px-6 text-center"
                            initial={reduced ? undefined : { opacity: 0, y: 20 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                        >
                            {/* Eyebrow */}
                            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-anushka-500 mb-4">
                                Personal Brand Accelerator
                            </span>
                            <h1 className="text-[3.25rem] leading-[0.88] font-bold tracking-tight mb-5">
                                <span className="bg-gradient-to-r from-anushka-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Rebirth
                                </span>
                            </h1>
                            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-2 max-w-xs mx-auto">
                                Build a personal brand that makes you visible, credible, and paid.
                            </p>
                            <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto">
                                A selective accelerator for women ready to reinvent their identity and income.
                            </p>
                            <motion.button
                                onClick={scrollToApply}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-semibold py-[14px] px-9 rounded-full shadow-[0_8px_30px_rgba(236,72,153,0.35)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.45)] transition-all duration-300 text-[15px]"
                            >
                                Apply for Rebirth
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* ── DESKTOP layout ───────────────────────────────── */}
                    <div className="hidden md:flex items-center min-h-screen">
                        <div className="pl-12 lg:pl-20 xl:pl-28 pr-4 max-w-[52%] lg:max-w-[48%] py-24">

                            {/* Eyebrow label */}
                            <motion.span
                                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-anushka-500 mb-5"
                                initial={reduced ? undefined : { opacity: 0, y: 12 }}
                                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.45 }}
                            >
                                Personal Brand Accelerator
                            </motion.span>

                            {/* Main headline */}
                            <motion.h1
                                className="text-[5rem] lg:text-[6.5rem] xl:text-[8rem] leading-[0.86] font-bold tracking-tight mb-6"
                                initial={reduced ? undefined : { opacity: 0, y: 28 }}
                                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.08 }}
                            >
                                <span className="bg-gradient-to-r from-anushka-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Rebirth
                                </span>
                            </motion.h1>

                            {/* Subheading — punchy, 1 line */}
                            <motion.p
                                className="text-xl lg:text-[1.35rem] text-gray-800 font-medium leading-snug mb-3 max-w-[360px]"
                                initial={reduced ? undefined : { opacity: 0, y: 18 }}
                                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.18 }}
                            >
                                Build a personal brand that makes you visible, credible, and paid.
                            </motion.p>

                            {/* Support line */}
                            <motion.p
                                className="text-sm lg:text-[0.9rem] text-gray-400 mb-10 max-w-[300px] leading-relaxed"
                                initial={reduced ? undefined : { opacity: 0, y: 14 }}
                                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.28 }}
                            >
                                A selective accelerator for women ready to reinvent their identity and income.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={reduced ? undefined : { opacity: 0, y: 14 }}
                                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.38 }}
                                className="flex items-center gap-5"
                            >
                                <motion.button
                                    onClick={scrollToApply}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-semibold py-4 px-10 rounded-full shadow-[0_8px_32px_rgba(236,72,153,0.38)] hover:shadow-[0_14px_44px_rgba(236,72,153,0.48)] transition-all duration-300 text-base"
                                >
                                    Apply for Rebirth
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>

                                {/* Subtle scroll cue */}
                                <button
                                    onClick={scrollToApply}
                                    className="text-sm text-gray-400 hover:text-anushka-500 transition-colors underline underline-offset-4"
                                >
                                    See how it works
                                </button>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                2. WHY REBIRTH EXISTS
            ══════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-2xl mx-auto text-center"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-bold font-serif bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent mb-8">
                            Why Rebirth Exists
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
                            <p>Most women are skilled but invisible.</p>
                            <p>
                                They consume content but struggle to convert attention into income.
                            </p>
                            <p className="text-gray-800 font-medium">
                                Rebirth exists to change that.
                            </p>
                        </div>

                        <div className="mt-10 pt-8 border-t border-anushka-100">
                            <p className="text-anushka-600 font-semibold text-lg tracking-wide">
                                This is not motivation. This is implementation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                3. WHO IT'S FOR — Qualifier section
            ══════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            {/* Left — For you */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-anushka-200/50">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 font-serif">
                                    This is for you if:
                                </h3>
                                <ul className="space-y-4">
                                    {forYou.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-anushka-500 mt-0.5 shrink-0" />
                                            <span className="text-gray-700 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right — Not for you */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 font-serif">
                                    This is NOT for:
                                </h3>
                                <ul className="space-y-4">
                                    {notForYou.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-5 h-5 flex items-center justify-center text-gray-400 mt-0.5 shrink-0 text-lg font-bold">✕</span>
                                            <span className="text-gray-500 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                4. WHAT YOU'LL ACHIEVE — Outcome bullets
            ══════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold font-serif bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent mb-10">
                            What You'll Achieve
                        </h2>

                        <ul className="space-y-5 text-left max-w-md mx-auto">
                            {outcomes.map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-4"
                                    initial={reduced ? undefined : { opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                >
                                    <Sparkles className="w-5 h-5 text-anushka-500 mt-1 shrink-0" />
                                    <span className="text-gray-800 text-lg font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Secondary CTA */}
                        <div className="mt-12">
                            <motion.button
                                onClick={scrollToApply}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Apply for Rebirth
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                5. TESTIMONIALS — Improved spacing
            ══════════════════════════════════════════════════════════ */}
            <TestimonialsSection />

            {/* ══════════════════════════════════════════════════════════
                6. LINKEDIN CARD — Centered, 450px
            ══════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent">
                            Where I Show Up
                        </h2>
                    </motion.div>

                    <div className="flex justify-center">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="w-full"
                            style={{ maxWidth: '450px' }}
                        >
                            <LinkedInNativeCard profile={anushkaProfile} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                7. APPLY FLOW — Multi-step form + Topmate embed
            ══════════════════════════════════════════════════════════ */}
            <section id="apply-section" className="py-16 md:py-24 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream scroll-mt-4" ref={applyRef}>
                <div className="container mx-auto px-6">
                    {/* form-container: governed by globals.css — expands on booking-stage */}
                    <motion.div
                        className="max-w-2xl mx-auto form-container"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Section heading */}
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-4xl font-bold font-serif bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent mb-3">
                                Ready to Begin?
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Take 2 minutes. Answer honestly. This is your first step.
                            </p>
                        </div>

                        {/* CTA to reveal form */}
                        {!showApplyForm && (
                            <div className="text-center">
                                <motion.button
                                    onClick={() => setShowApplyForm(true)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                                >
                                    Apply for Rebirth
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        )}

                        {/* Inline form — reveals on click, stays open */}
                        <AnimatePresence>
                            {showApplyForm && (
                                <motion.div
                                    variants={formReveal}
                                    initial="hidden"
                                    animate="visible"
                                    className="overflow-hidden"
                                >
                                    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-anushka-500/50 via-rose-500/30 to-anushka-600/50">
                                        <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-6 md:p-8 text-left">
                                            <RebirthApplication />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                ABOUT — Founder note (compact, near bottom)
            ══════════════════════════════════════════════════════════ */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <Image
                            src="./favicon.png"
                            alt="Anushka Jain"
                            width={100}
                            height={100}
                            className="rounded-full shadow-lg w-24 h-24 object-cover border-2 border-anushka-400/40 mx-auto mb-6"
                        />
                        <h2 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-anushka-800 to-rose-800 bg-clip-text text-transparent font-serif">
                            I believe visibility is a choice.
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-lg mx-auto">
                            I created Rebirth because I saw too many brilliant women fading into the background. You have the expertise, the vision, and the drive—but your digital presence doesn't reflect your true power. That changes here.
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
