'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { COMPLIMENTS } from '@/lib/constants';

interface TapMeButtonProps {
  onInteract?: () => void;
}

const animationVariants = [
  { initial: { scale: 0, rotate: -20 }, animate: { scale: 1, rotate: 0, y: -60 } },
  { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1.5, opacity: 0, y: -80 } },
  { initial: { scale: 0, rotate: 10 }, animate: { scale: 1, rotate: -10, y: -50 } },
  { initial: { scale: 1, opacity: 0 }, animate: { scale: 0, opacity: 1, y: -90 } },
  { initial: { rotate: -180, scale: 0 }, animate: { rotate: 0, scale: 1, y: -70 } },
];

export default function TapMeButton({ onInteract }: TapMeButtonProps) {
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [usedCompliments, setUsedCompliments] = useState<Set<number>>(new Set());
  const [animStyle, setAnimStyle] = useState(0);

  const getRandomCompliment = useCallback(() => {
    const available = COMPLIMENTS.filter((_, i) => !usedCompliments.has(i));
    if (available.length === 0) {
      setUsedCompliments(new Set());
      return COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    }
    const index = Math.floor(Math.random() * available.length);
    const originalIndex = COMPLIMENTS.indexOf(available[index]);
    setUsedCompliments((prev) => {
      const newSet = new Set(prev);
      newSet.add(originalIndex);
      return newSet;
    });
    return available[index];
  }, [usedCompliments]);

  const handleTap = () => {
    const compliment = getRandomCompliment();
    setCurrentCompliment(compliment);
    setAnimStyle(Math.floor(Math.random() * animationVariants.length));
    onInteract?.();

    setTimeout(() => {
      setCurrentCompliment(null);
    }, 2500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className="relative group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 rounded-full blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white/30"
          animate={{
            boxShadow: [
              '0 0 20px rgba(244, 114, 182, 0.5)',
              '0 0 40px rgba(244, 114, 182, 0.8)',
              '0 0 20px rgba(244, 114, 182, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="flex flex-col items-center"
          >
            <Heart className="w-10 h-10 md:w-14 md:h-14 text-white fill-white" />
            <span className="text-white font-semibold text-xs md:text-sm mt-1">Tap Me</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>
        <motion.div
          className="absolute -bottom-1 -left-1"
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {currentCompliment && (
          <motion.div
            key={currentCompliment}
            className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-pink-200 max-w-xs text-center"
            initial={animationVariants[animStyle].initial}
            animate={animationVariants[animStyle].animate}
            exit={{ opacity: 0, y: -100, scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.p
              className="text-lg font-medium text-rose-600"
              style={{ fontFamily: 'var(--font-dancing)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentCompliment}
            </motion.p>
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        className="mt-6 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Tap for a sweet compliment
      </motion.p>
    </div>
  );
}
