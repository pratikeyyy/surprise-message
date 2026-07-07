'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface OpeningExperienceProps {
  onComplete: () => void;
}

export default function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), 2500);
    const buttonTimer = setTimeout(() => setShowButton(true), 3500);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <AnimatePresence>
              {loading && (
                <motion.div
                  className="flex flex-col items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="relative">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          top: `${Math.cos((i * Math.PI * 2) / 5) * 60}px`,
                          left: `${Math.sin((i * Math.PI * 2) / 5) * 60 + 30}px`,
                        }}
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
                      </motion.div>
                    ))}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="relative"
                    >
                      <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-lg text-gray-600 font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Preparing something special...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!loading && (
                <motion.div
                  className="flex flex-col items-center gap-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <motion.p
                      className="text-2xl md:text-4xl font-semibold text-gradient mb-4"
                      style={{ fontFamily: 'var(--font-dancing), cursive' }}
                    >
                      Someone made something special
                    </motion.p>
                    <motion.p
                      className="text-2xl md:text-4xl font-semibold text-gradient"
                      style={{ fontFamily: 'var(--font-dancing), cursive' }}
                    >
                      just for you...
                    </motion.p>
                  </motion.div>

                  <AnimatePresence>
                    {showButton && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        className="relative px-10 py-5 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white text-xl font-semibold shadow-lg glow-pulse overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <Sparkles className="w-6 h-6" />
                          Open Your Surprise
                          <Sparkles className="w-6 h-6" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                        />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex gap-4"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        transition={{ delay: 1 + i * 0.2 }}
                        className="flex items-center gap-1 text-pink-400"
                      >
                        <Heart className="w-4 h-4 fill-pink-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
