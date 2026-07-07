'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { PHOTO_URL } from '@/lib/constants';

interface PhotoRevealProps {
  onInteract?: () => void;
}

export default function PhotoReveal({ onInteract }: PhotoRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => setShowPhoto(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasInteracted) {
      setHasInteracted(true);
      onInteract?.();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10">
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{
                    scale: 0,
                    rotate: -180,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    opacity: [0, 0.8, 0.6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: `radial-gradient(circle, hsl(${
                          350 + i * 3
                        } 80% 80%) 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 20) * (150 + Math.random() * 100),
                    y: Math.sin((i * Math.PI * 2) / 20) * (150 + Math.random() * 100),
                    opacity: 0,
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                  }}
                >
                  <Sparkles
                    className="w-4 h-4"
                    style={{
                      color: `hsl(${45 + (i % 5) * 10} 100% 70%)`,
                    }}
                  />
                </motion.div>
              ))}

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: showPhoto ? 1 : 0, opacity: showPhoto ? 1 : 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                <div
                  data-photo-container
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/50 cursor-pointer"
                  onDoubleClick={handleDoubleClick}
                >
                  <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-pink-100/40 to-purple-100/40"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1.5 }}
                  />
                  <img
                    src={PHOTO_URL}
                    alt="Special someone"
                    className="w-full h-full object-cover"
                  />

                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`heart-${i}`}
                      className="absolute"
                      style={{
                        top: `${Math.sin((i * Math.PI * 2) / 8) * 45 + 50}%`,
                        left: `${Math.cos((i * Math.PI * 2) / 8) * 45 + 50}%`,
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <Heart
                        className="w-5 h-5 text-pink-400 fill-pink-400 drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 0 3px rgba(255, 100, 150, 0.8))',
                        }}
                      />
                    </motion.div>
                  ))}

                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={`star-${i}`}
                      className="absolute"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      <Sparkles
                        className="w-3 h-3"
                        style={{
                          color: 'white',
                          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {showPhoto && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -bottom- flex items-center gap-2 text-gray-500 text-sm mt-4"
                >
                  <span className="text-xs">Double-click for a surprise</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
