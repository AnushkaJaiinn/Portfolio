import React from 'react';
import Image from 'next/image';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import LinkedInCard from '../components/LinkedInCard';
import profileBackground from '../assets/profile-background.png';
import mobileBackground from '../assets/mobile-background.png';
// using public favicon image for about/profile
import SkillPill from '../components/SkillPill';
import ServiceCard from '../components/ServiceCard';
import TimelineItem from '../components/TimelineItem';
import InstagramProfileCard from '../components/InstagramProfileCard';
import TwitterProfileCard from '../components/TwitterProfileCard';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import coreSkills from '../skills.jsx';
import services from '../services.jsx';
import journey from '../journey.jsx';
import linkedinClients from '../linkedinClients.jsx';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-start relative text-white">
        {/* Optimized hero background with Next/Image for faster, smoother LCP */}
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
          <Image
            src={mobileBackground}
            alt=""
            priority
            placeholder="blur"
            sizes="100vw"
            fill
            className="block md:hidden object-cover object-center"
          />
          {/* Mobile-specific smooth radial blur - protects main person area */}
          <div className="md:hidden absolute inset-0 backdrop-blur-sm bg-black/5" 
               style={{ 
                 maskImage: 'radial-gradient(ellipse 350px 500px at 65% 40%, transparent 55%, black 80%)',
                 WebkitMaskImage: 'radial-gradient(ellipse 350px 500px at 65% 40%, transparent 55%, black 80%)'
               }}>
          </div>
        </div>
        {/* Selective background blur for text readability while keeping person image clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/60 md:via-black/30 md:to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl text-left">
            {/* Main Tagline with better contrast and text shadow */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              <span className="bg-gradient-to-r from-anushka-300 via-rose-300 to-anushka-400 bg-clip-text text-transparent font-bold drop-shadow-lg">
                IMPACTING,
              </span>
              <br />
              <span className="text-white font-bold drop-shadow-lg">
                NOT INFLUENCING
              </span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-100 mb-8 font-medium drop-shadow-lg space-y-3" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-anushka-400 to-rose-500 rounded-lg rotate-45 shadow-lg"></div>
                  <div className="absolute inset-0 w-8 h-8 bg-gradient-to-tl from-transparent via-white/30 to-transparent rounded-lg rotate-45 animate-pulse"></div>
                </div>
                <p>Strategic Marketing Professional</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[24px] border-l-transparent border-r-transparent border-b-gradient-to-r border-b-rose-500 filter drop-shadow-lg"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-l-transparent border-r-transparent border-b-anushka-400 animate-pulse"></div>
                </div>
                <p>Brand Storyteller</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-anushka-500 to-rose-500 transform rotate-12 shadow-lg" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                  <div className="absolute inset-0 w-8 h-8 bg-white/30 transform rotate-12 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                </div>
                <p>Growth Catalyst</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="#about" className="bg-gradient-to-r from-anushka-500 to-rose-500 hover:from-anushka-600 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out shadow-xl transform hover:scale-105 border border-white/20 hover:shadow-anushka-500/60 hover:shadow-2xl hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">Know More</a>
              <a href="https://topmate.io/anushka_jain10/1307274" target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out shadow-xl transform hover:scale-105 border border-white/40 hover:shadow-white/40 hover:shadow-2xl hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:border-white/80">Book 1:1 Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`}}>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-16 font-serif bg-gradient-to-r from-anushka-800 to-rose-800 bg-clip-text text-transparent">About Me</h2>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/3">
                            <div className="relative group">
                             <Image src="./favicon.png" alt="Anushka Jain" width={320} height={320} className="rounded-full shadow-2xl mx-auto w-80 h-80 object-cover border-4 border-anushka-500/50 relative z-10" />
                <div className="absolute inset-0 rounded-full bg-anushka-500/20 group-hover:bg-anushka-500/0 transition-all duration-300 scale-105 group-hover:scale-110 border-2 border-anushka-500/50 animate-pulse group-hover:animate-none -z-10"></div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-anushka-800 to-rose-800 bg-clip-text text-transparent font-serif">Hello! I'm Anushka.</h3>
              <p className="text-gray-800 mb-4 leading-relaxed text-lg">I am a passionate and results-driven marketing specialist with a proven track record of helping individuals and brands flourish on LinkedIn. My expertise lies in crafting compelling narratives, optimizing profiles for maximum impact, and building strategic connections that translate into tangible growth.</p>
              <p className="text-gray-800 mb-6 leading-relaxed text-lg">My mission is to empower my clients to build a powerful and authentic personal brand that resonates with their target audience. Whether you're an executive looking to establish thought leadership, a startup aiming to generate leads, or a professional seeking to advance your career, I provide the dedicated guidance and strategic support you need to not just succeed, but thrive.</p>
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-anushka-800 to-rose-800 bg-clip-text text-transparent font-serif">My Core Skills:</h4>
              <ul className="flex flex-wrap" style={{ gap: '1.75rem' }}>
                {coreSkills.map(skill => (
                  <li key={skill} className="list-none">
                    <SkillPill skill={skill} as="span" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`}}>
        {/* Ambient animated orbs for visual flair */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-anushka-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-anushka-600 via-rose-500 to-anushka-700">How I Can Help You Grow</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Crafted service packages with strategy, content, and growth—no filters, just value.</p>
          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={index}>
                <ServiceCard {...service} reverse={index % 2 === 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`}}>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-6 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">My Impact: Client Success Stories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Here's a glimpse into the transformations I've helped my clients achieve. We focus on real metrics and tangible growth.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {linkedinClients.map((client, index) => (
              <div key={index}>
                <LinkedInCard client={client} />
              </div>
            ))}
          </div>
          
          {/* Social media section heading (personal profiles) */}
          <h3 className="text-3xl font-bold text-center mt-4 mb-2 font-serif bg-clip-text text-transparent bg-gradient-to-r from-anushka-600 via-rose-500 to-anushka-700">
            My Social Profiles
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with me across platforms—follow along for marketing, branding, and growth insights.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Modern Social Profile Cards */}
            <div className="flex justify-center">
              <InstagramProfileCard />
            </div>
            <div className="flex justify-center">
              <TwitterProfileCard />
            </div>
          </div>
          <p className="text-center mt-12 text-gray-500 italic">Note: Client names and specific visuals are representational to protect privacy.</p>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`}}>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-center mb-16 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">My Professional Journey</h2>
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            {journey.map((item, index) => (
              <div key={index}>
                <TimelineItem {...item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`}}>
        <div className="container mx-auto px-6 max-w-3xl relative">
          <h2 className="text-4xl font-bold mb-3 text-center font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">Let's Create Impact Together</h2>
          <p className="text-gray-700 mb-10 text-center">Tell me what you're exploring—strategy, content, or growth. I read every message.</p>
          
          {/* Glass card with gradient border */}
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-anushka-500/60 via-rose-500/40 to-anushka-600/60">
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6 md:p-8 border border-anushka-200/30">
              {/* Quick topic chips */}
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider text-gray-600 mb-3">What brings you here?</p>
                <div className="flex flex-wrap gap-2">
                  {['Brand Building', 'Content', 'Lead Gen', 'Audit', 'Collaboration'].map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      className="px-3 py-1.5 rounded-full text-sm transition-colors bg-anushka-100 text-anushka-700 hover:bg-anushka-200"
                      aria-pressed="false"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency selector */}
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider text-gray-600 mb-3">How soon do you need help?</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Now', 'Soon', 'Later'].map(level => (
                    <button
                      type="button"
                      key={level}
                      className={`py-2 rounded-lg text-sm border transition-colors ${level === 'Soon' ? 'bg-anushka-500 text-white border-anushka-400' : 'bg-anushka-50 text-anushka-700 border-anushka-200 hover:bg-anushka-100'}`}
                      aria-pressed={level === 'Soon'}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* The form */}
              <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="space-y-5">
                {/* Hidden fields to pass selections */}
                <input type="hidden" name="topics" value="" />
                <input type="hidden" name="urgency" value="Soon" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute top-1/2 left-4 -translate-y-1/2 text-anushka-400 pointer-events-none" />
                    <Input type="text" name="name" placeholder="Your Name" required className="pl-12 bg-white/60 border-anushka-200 focus-visible:ring-anushka-500 focus-visible:border-anushka-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/50 focus:border-anushka-400" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-anushka-400 pointer-events-none" />
                    <Input type="email" name="email" placeholder="Your Email" required className="pl-12 bg-white/60 border-anushka-200 focus-visible:ring-anushka-500 focus-visible:border-anushka-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/50 focus:border-anushka-400" />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute top-6 left-4 -translate-y-1/2 text-anushka-400 pointer-events-none" />
                  <Textarea
                    name="message"
                    placeholder="Tell me a bit about your challenge, goal, or idea..."
                    required
                    rows="5"
                    className="pl-12 bg-white/60 border-anushka-200 focus-visible:ring-anushka-500 focus-visible:border-anushka-400 focus:outline-none focus:ring-2 focus:ring-anushka-500/50 focus:border-anushka-400"
                  />
                  <div className="mt-1 text-right text-xs text-gray-500">0/1000</div>
                </div>

                {/* Consent checkbox */}
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="consent" className="accent-anushka-500" defaultChecked />
                  You can email me back about this message.
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-anushka-500 via-rose-500 to-anushka-600 py-3 font-semibold text-white shadow-lg shadow-anushka-500/25"
                >
                  <span className="relative z-10 inline-flex items-center justify-center">
                    Send Message <Send size={20} className="ml-2" />
                  </span>
                  <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}