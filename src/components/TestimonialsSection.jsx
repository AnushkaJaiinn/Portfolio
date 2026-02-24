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
    <motion.section id="testimonial" className="scroll-mt-24 py-16 md:py-24 bg-gradient-to-br from-anushka-50 via-rose-50 to-cream relative overflow-hidden" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
      <div className="container mx-auto px-6 text-center relative">
        <h2 className="text-2xl md:text-4xl font-bold mb-10 font-serif bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent">What My Clients Are Saying</h2>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-md border border-anushka-200/50 text-center">
                    <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</blockquote>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent font-serif">{testimonial.name}</h3>
                    <p className="text-anushka-600 font-medium text-sm mt-1">{testimonial.service}</p>
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
