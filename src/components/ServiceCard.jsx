'use client';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const ServiceCard = ({ icon, title, description, category = [], reverse = false }) => {
  // 3D tilt on desktop; falls back gracefully on mobile
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  // Custom smooth scroll function to prevent double-scroll
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update URL hash without triggering scroll
      window.history.pushState(null, '', `#${targetId}`);
    }
  }

  const highlightMap = {
    'Foundation': [
      'Brand Archetype',
      'Visual Identity',
      'Core Offering',
    ],
    'Expression': [
      'Content Strategy',
      'Thought Leadership',
      'Voice & Tone',
    ],
    'Expansion': [
      'Network Growth',
      'Opportunity Flow',
      'Authority Assets',
    ],
  }

  // derive up to 3 unique highlights from categories
  const highlights = Array.from(
    new Set(category.flatMap((c) => highlightMap[c] || []))
  ).slice(0, 3)

  function handleMouseMove(e) {
    if (window && !window.matchMedia('(pointer:fine)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-50, Math.min(50, dx)))
    y.set(Math.max(-50, Math.min(50, dy)))
  }

  function resetTilt() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="[transform-style:preserve-3d] transform-gpu"
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      <Card className={`bg-white/80 backdrop-blur-sm border-anushka-200 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-anushka-500/10 will-change-transform transform-gpu`}>
        <CardContent className="p-0 md:p-0">
          <div className={`flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-10`}>
            {/* Visual side */}
            <div className={`relative md:w-1/3 text-center p-6 ${reverse ? 'md:order-last' : ''}`}>
              <div className="relative inline-block">
                <span className="absolute -inset-1 rounded-full bg-anushka-500/20 blur-2xl" aria-hidden></span>
                <Image src={icon} alt={title} width={192} height={192} className="relative mx-auto rounded-full border-4 border-anushka-400/80 shadow-lg" />
              </div>
            </div>

            {/* Content side */}
            <div className="md:w-2/3 p-6 pt-0 md:p-8 will-change-transform transform-gpu">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {category.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-anushka-100 text-anushka-700 border border-anushka-200">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent font-serif tracking-tight will-change-transform transform-gpu antialiased">{title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4 will-change-transform transform-gpu antialiased">{description}</p>

              {highlights.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 text-anushka-500 shrink-0" />
                      <span className="text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden"
                >
                  <a
                    href="#apply"
                    onClick={(e) => handleSmoothScroll(e, 'apply')}
                    className="inline-block bg-gradient-to-r from-anushka-500 via-rose-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Apply for Rebirth</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-anushka-600 via-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
        {/* Accent divider */}
        <div className="h-0.5 w-full bg-gradient-to-r from-anushka-500/40 via-rose-400/40 to-anushka-600/40" />
      </Card>
    </motion.div>
  )
}

export default ServiceCard;
