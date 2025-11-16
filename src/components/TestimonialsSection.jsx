'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from "@/components/ui/carousel";
import testimonials from '../testimonials.jsx';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function TestimonialsSection() {
  return (
    <motion.section id="testimonial" className="min-h-[120vh] pb-32 scroll-mt-24 py-20 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" style={{backgroundImage: `linear-gradient(rgba(253, 242, 248, 0.9), rgba(254, 247, 240, 0.9)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ec4899' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`, contentVisibility: 'auto'}} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
      <div className="container mx-auto px-6 text-center relative">
        <h2 className="text-4xl font-bold mb-12 font-serif bg-gradient-to-r from-anushka-600 to-rose-600 bg-clip-text text-transparent">What My Clients Are Saying</h2>
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-anushka-200/50 text-center">
                    <blockquote className="text-xl italic text-gray-700 mb-4">"{testimonial.text}"</blockquote>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent font-serif">{testimonial.name}</h3>
                    <p className="text-anushka-600 font-medium">{testimonial.service}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-anushka-300 text-anushka-600 hover:bg-anushka-100" />
          <CarouselNext className="border-anushka-300 text-anushka-600 hover:bg-anushka-100" />
          <CarouselDots />
        </Carousel>
      </div>
    </motion.section>
  );
}
