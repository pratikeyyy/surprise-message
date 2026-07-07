'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Shield, Lightbulb, Rocket } from 'lucide-react';
import { AMAZING_REASONS } from '@/lib/constants';

interface WhyYoureAmazingProps {
  onInteract?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  lightbulb: <Lightbulb className="w-6 h-6" />,
  star: <Sparkles className="w-6 h-6" />,
  rocket: <Rocket className="w-6 h-6" />,
};

const colorMap = [
  'from-rose-400 to-pink-500',
  'from-purple-400 to-indigo-500',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-pink-400 to-rose-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
];

export default function WhyYoureAmazing({ onInteract }: WhyYoureAmazingProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hasViewed, setHasViewed] = useState<Set<number>>(new Set());

  const handleCardView = (index: number) => {
    if (!hasViewed.has(index)) {
      const newSet = new Set(hasViewed);
      newSet.add(index);
      setHasViewed(newSet);
      onInteract?.();
    }
    const newVisible = new Set(visibleCards);
    newVisible.add(index);
    setVisibleCards(newVisible);
  };

  return (
    <div className="relative py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gradient mb-4" style={{ fontFamily: 'var(--font-dancing)' }}>
          Why You're Amazing
        </h2>
        <p className="text-gray-500">Every reason is a celebration of you</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {AMAZING_REASONS.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.15 }}
            onViewportEnter={() => handleCardView(index)}
            className="group perspective-1000"
          >
            <motion.div
              className="relative h-56 rounded-2xl overflow-hidden glass cursor-pointer"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${colorMap[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="p-6 h-full flex flex-col justify-between relative z-10">
                <div>
                  <motion.div
                    className={`inline-flex p-3 rounded-full bg-gradient-to-br ${colorMap[index]} text-white mb-4 shadow-lg`}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(255,255,255,0)',
                        '0 0 20px 5px rgba(255,255,255,0.3)',
                        '0 0 0 0 rgba(255,255,255,0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {iconMap[reason.icon]}
                  </motion.div>

                  <motion.h3
                    className="text-xl font-semibold text-gray-800 mb-3"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {reason.title}
                  </motion.h3>
                </div>

                <motion.p
                  className="text-gray-600 text-sm leading-relaxed"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {reason.description}
                </motion.p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                />
              </div>

              <motion.div
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-gray-300" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
