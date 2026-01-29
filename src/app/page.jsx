'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

import RebirthApplication from '../components/RebirthApplication';
import LinkedInCard from '../components/LinkedInCard';
import LinkedInNativeCard from '../components/LinkedInNativeCard';
import profileBackground from '../assets/new-profile-backgroud.jpg';
import ServiceCard from '../components/ServiceCard';

import services from '../services.jsx';
import linkedinClients from '../linkedinClients.jsx';
import anushkaProfile from '../anushkaProfile.jsx';

export default function HomePage() {
    const reduced = useReducedMotion();

    // Custom smooth scroll function
    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${targetId}`);
        }
    };

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    return (
        <>
            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION - Bold, Direct, First-Person
            ═══════════════════════════════════════════════════════════════ */}
            <section id="home" className="h-screen flex items-center justify-start relative text-white">
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
                        <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute bottom-32 right-16 w-40 h-40 bg-rose-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/60 md:via-black/30 md:to-transparent" />

                <motion.div
                    className="relative z-10 container mx-auto px-6 flex items-center min-h-[inherit]"
                    style={{ willChange: 'transform, opacity' }}
                    initial={reduced ? undefined : { opacity: 0, x: -50 }}
                    animate={reduced ? undefined : { opacity: 1, x: 0 }}
                    transition={{ duration: reduced ? 0 : 1 }}
                >
                    <div className="w-full md:max-w-[55%] lg:max-w-[50%] space-y-8">
                        <motion.h1
                            className="text-[4rem] md:text-[5rem] leading-none font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] text-left tracking-tight"
                            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                            initial={reduced ? undefined : { opacity: 0, y: 30 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.8, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-anushka-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                                Rebirth
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-white/90 font-medium max-w-md leading-relaxed"
                            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
                            initial={reduced ? undefined : { opacity: 0, y: 20 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.6, delay: 0.4 }}
                        >
                            I help ambitious women build personal brands that command attention. No hype. Just clarity, strategy, and execution.
                        </motion.p>

                        <motion.div
                            className="pt-4"
                            initial={reduced ? undefined : { opacity: 0, y: 20 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.6, delay: 0.6 }}
                        >
                            <motion.a
                                href="#apply"
                                onClick={(e) => handleSmoothScroll(e, 'apply')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-block bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-bold py-5 px-12 rounded-full transition-all duration-300 ease-in-out shadow-xl border border-white/20 hover:shadow-anushka-500/60 hover:shadow-2xl hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] text-center text-lg"
                            >
                                Apply for Rebirth
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                ABOUT SECTION - POV-Driven, Short, Bold
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
                id="about"
                className="py-20 md:py-32 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
                variants={fadeInUp}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={reduced ? undefined : { once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-6 relative">
                    <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto">
                        <motion.div
                            className="md:w-1/3"
                            initial={reduced ? undefined : { scale: 0.8, opacity: 0 }}
                            whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                            viewport={reduced ? undefined : { once: true, amount: 0.5 }}
                            transition={{ duration: reduced ? 0 : 0.8 }}
                        >
                            <div className="relative group">
                                <Image src="./favicon.png" alt="Anushka Jain" width={280} height={280} className="rounded-full shadow-2xl mx-auto w-72 h-72 object-cover border-4 border-anushka-500/50 relative z-10" />
                                <div className="absolute inset-0 rounded-full bg-anushka-500/20 group-hover:bg-anushka-500/0 transition-all duration-300 scale-105 group-hover:scale-110 border-2 border-anushka-500/50 animate-pulse group-hover:animate-none -z-10" />
                            </div>
                        </motion.div>
                        <div className="md:w-2/3 max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-anushka-800 to-rose-800 bg-clip-text text-transparent font-serif">
                                I believe visibility is a choice.
                            </h2>
                            <p className="text-gray-800 mb-5 leading-relaxed text-lg">
                                Most talented women stay invisible—not because they lack value, but because they haven't been shown how to position themselves with intention.
                            </p>
                            <p className="text-gray-800 leading-relaxed text-lg">
                                <span className="font-bold text-anushka-600">Rebirth</span> is for women who are done waiting to be discovered. It's a strategic transformation—identity, narrative, and presence—built to attract the right opportunities without chasing.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                APPLY SECTION - Work With Me (Intentional Invitation)
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
                id="apply"
                className="py-20 md:py-32 scroll-mt-24 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
                variants={fadeInUp}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={reduced ? undefined : { once: true, amount: 0.1 }}
            >
                <div className="container mx-auto px-6 max-w-2xl relative">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                        Work With Me
                    </h2>
                    <p className="text-gray-700 mb-12 text-center text-lg max-w-lg mx-auto">
                        This is an invitation, not an open door. I work with a small number of women each quarter.
                    </p>

                    <motion.div
                        className="relative rounded-2xl p-[1px] bg-gradient-to-r from-anushka-500/60 via-rose-500/40 to-anushka-600/60"
                        initial={reduced ? undefined : { opacity: 0, y: 20 }}
                        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6 md:p-10 border border-anushka-200/30">
                            <RebirthApplication
                                onSubmit={async (data) => {
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
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                LINKEDIN PROOF SECTION - Where I Show Up
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
                id="linkedin"
                className="py-20 md:py-32 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
                variants={fadeInUp}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={reduced ? undefined : { once: true, amount: 0.1 }}
            >
                <div className="container mx-auto px-6 relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                        Where I Show Up
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto text-lg">
                        This is where my thinking, work, and results live publicly.
                    </p>

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
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                PROOF & PERSPECTIVE - Client Results (Minimal)
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
                id="results"
                className="py-20 md:py-32 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
                variants={fadeInUp}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={reduced ? undefined : { once: true, amount: 0.1 }}
            >
                <div className="container mx-auto px-6 relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                        Proof & Perspective
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto text-lg">
                        Real transformations. Real results.
                    </p>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
                    >
                        {linkedinClients.map((client, index) => (
                            <motion.div variants={fadeInUp} key={index}>
                                <LinkedInCard client={client} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                THE PROGRAM - What You'll Achieve
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
                id="transformation"
                className="py-20 md:py-32 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
                variants={fadeInUp}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={reduced ? undefined : { once: true, amount: 0.1 }}
            >
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-anushka-500/20 blur-3xl"
                    animate={reduced ? undefined : { x: [0, 16, 0], y: [0, -12, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl"
                    animate={reduced ? undefined : { x: [0, -18, 0], y: [0, 16, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="container mx-auto px-6 relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-anushka-600 via-rose-500 to-anushka-700">
                        What You'll Achieve
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto text-lg">
                        A roadmap to authority. Not a checklist.
                    </p>
                    <motion.div layout className="space-y-16 max-w-4xl mx-auto">
                        {services.map((service, index) => (
                            <motion.div
                                layout
                                key={index}
                                variants={fadeInUp}
                                whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                            >
                                <ServiceCard {...service} reverse={index % 2 === 1} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                FINAL CTA - Simple Anchor
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section
                className="py-20 md:py-32 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")` }}
                variants={fadeInUp}
                initial={reduced ? undefined : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={reduced ? undefined : { once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">
                        Ready to be seen?
                    </h2>
                    <p className="text-gray-700 mb-10 text-lg max-w-md mx-auto">
                        If this resonates, let's talk.
                    </p>
                    <motion.a
                        href="#apply"
                        onClick={(e) => handleSmoothScroll(e, 'apply')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-bold py-5 px-12 rounded-full transition-all duration-300 ease-in-out shadow-xl border border-white/20 hover:shadow-anushka-500/60 hover:shadow-2xl hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] text-lg"
                    >
                        Apply for Rebirth
                    </motion.a>
                </div>
            </motion.section>
        </>
    );
}
