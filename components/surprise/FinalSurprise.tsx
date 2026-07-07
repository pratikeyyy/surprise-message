'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINAL_SURPRISE_MESSAGE } from '@/lib/constants';

interface FinalSurpriseProps {
  onReset?: () => void;
}

export default function FinalSurprise({ onReset }: FinalSurpriseProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const intervalId: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(intervalId);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f472b6', '#c084fc', '#fbbf24', '#34d399', '#60a5fa'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f472b6', '#c084fc', '#fbbf24', '#34d399', '#60a5fa'],
      });
    }, 250);
  }, []);

  const fireHearts = useCallback(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.5, y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
      shapes: ['circle'],
      scalar: 1.5,
      drift: 0.5,
      gravity: 0.5,
    });
  }, []);

  useEffect(() => {
    if (!hasTriggered) {
      setHasTriggered(true);

      const fire = async () => {
        await new Promise((r) => setTimeout(r, 200));
        setShowBalloons(true);
        await new Promise((r) => setTimeout(r, 300));
        setShowMessage(true);
        await new Promise((r) => setTimeout(r, 500));
        fireConfetti();
        fireHearts();

        const heartInterval: NodeJS.Timeout = setInterval(fireHearts, 2000);
      };

      fire();
    }
  }, [hasTriggered, fireConfetti, fireHearts]);

  const balloons = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    color: ['#f472b6', '#c084fc', '#fbbf24', '#34d399', '#60a5fa', '#fb923c'][
      Math.floor(Math.random() * 6)
    ],
    size: 40 + Math.random() * 30,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100/90 via-purple-100/90 to-amber-100/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))' }} />
          </motion.div>
        ))}
      </div>

      {showBalloons && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              className="absolute"
              style={{ left: `${balloon.x}%`, bottom: '-100px' }}
              initial={{ y: 0 }}
              animate={{
                y: -window.innerHeight - 150,
                x: [0, Math.sin(balloon.id) * 30, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: balloon.delay,
                ease: 'easeOut',
              }}
            >
              <svg
                width={balloon.size}
                height={balloon.size * 1.3}
                viewBox="0 0 40 52"
                fill="none"
              >
                <ellipse cx="20" cy="20" rx="18" ry="20" fill={balloon.color} />
                <path d="M20 39L18 52M20 39L22 52" stroke={balloon.color} strokeWidth="2" />
                <circle cx="20" cy="42" r="3" fill={balloon.color} />
                <ellipse cx="15" cy="15" rx="5" ry="7" fill="white" opacity="0.3" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="relative text-center z-10 px-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 20,
            }}
          >
            <motion.div
              className="mb-8"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <PartyPopper className="w-16 h-16 text-yellow-500 mx-auto block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1
                className="text-4xl md:text-6xl font-bold text-gradient mb-4 drop-shadow-lg"
                style={{ fontFamily: 'var(--font-dancing)' }}
              >
                {FINAL_SURPRISE_MESSAGE.title}
              </h1>
              <p
                className="text-2xl md:text-3xl text-rose-500 font-medium"
                style={{ fontFamily: 'var(--font-dancing)' }}
              >
                {FINAL_SURPRISE_MESSAGE.subtitle}
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Heart className="w-10 h-10 text-rose-500 fill-rose-500 drop-shadow-lg" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-8 text-white/80 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Keep scrolling to enjoy more!
      </motion.div>
    </motion.div>
  );
}
