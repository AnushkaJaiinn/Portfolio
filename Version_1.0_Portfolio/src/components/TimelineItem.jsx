'use client';
import { motion } from 'framer-motion';

const TimelineItem = ({ icon, title, company, period, description, index = 0 }) => (
    <motion.div 
        className="relative"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
    >
        {/* Desktop Layout */}
        <div className="hidden md:block">
            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                {/* Content Card */}
                <div className="flex-1 max-w-md">
                    <motion.div 
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-anushka-200/50 relative"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Arrow pointing to timeline */}
                        <div className={`absolute top-8 ${index % 2 === 0 ? '-right-3' : '-left-3'} w-6 h-6 bg-white/90 border-anushka-200/50 ${index % 2 === 0 ? 'border-r border-b' : 'border-l border-t'} rotate-45`}></div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 bg-anushka-100 text-anushka-700 rounded-full text-sm font-medium">
                                    {period}
                                </span>
                                <div className="p-2 bg-anushka-50 rounded-lg text-anushka-600">
                                    {icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent font-serif">
                                {title}
                            </h3>
                            <p className="text-anushka-600 font-medium">{company}</p>
                            <p className="text-gray-700 leading-relaxed">{description}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Timeline Center */}
                <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-anushka-500 to-rose-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    {index < 1 && <div className="w-0.5 h-24 bg-gradient-to-b from-anushka-300 to-rose-300 mt-2"></div>}
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 max-w-md"></div>
            </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
            <div className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-anushka-500 to-rose-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    {index < 1 && <div className="w-0.5 h-full bg-gradient-to-b from-anushka-300 to-rose-300 mt-2"></div>}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                    <motion.div 
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-anushka-200/50"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <span className="px-3 py-1 bg-anushka-100 text-anushka-700 rounded-full text-sm font-medium">
                                    {period}
                                </span>
                                <div className="p-2 bg-anushka-50 rounded-lg text-anushka-600">
                                    {icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold bg-gradient-to-r from-anushka-700 to-rose-700 bg-clip-text text-transparent font-serif">
                                {title}
                            </h3>
                            <p className="text-anushka-600 font-medium text-sm">{company}</p>
                            <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </motion.div>
);

export default TimelineItem;
