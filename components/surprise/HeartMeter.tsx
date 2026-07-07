'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartMeterProps {
  progress: number;
  onUnlock: () => void;
}

export default function HeartMeter({ progress, onUnlock }: HeartMeterProps) {
  const [prevProgress, setPrevProgress] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);

  useEffect(() => {
    if (progress > prevProgress) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500);
    }
    setPrevProgress(progress);
  }, [progress, prevProgress]);

  useEffect(() => {
    if (progress >= 100 && !hasUnlocked) {
      setHasUnlocked(true);
      setTimeout(onUnlock, 500);
    }
  }, [progress, hasUnlocked, onUnlock]);

  const segments = 10;

  return (
    <motion.div
      className="fixed top-4 right-4 z-30 bg-white/80 backdrop-blur-md rounded-full shadow-lg p-3 pr-5 flex items-center gap-3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="relative w-10 h-10"
        animate={isPulsing ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`w-10 h-10 ${
            progress >= 100 ? 'text-yellow-400 fill-yellow-400' : 'text-rose-400 fill-rose-400'
          }`}
        />
        {isPulsing && (
          <motion.div
            className="absolute inset-0 bg-rose-400 rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>

      <div className="flex items-center gap-1">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = (i + 1) * 10 <= progress;
          return (
            <motion.div
              key={i}
              className={`w-2.5 h-5 rounded-full ${
                isActive
                  ? progress >= 100
                    ? 'bg-gradient-to-t from-yellow-400 to-amber-400'
                    : 'bg-gradient-to-t from-rose-400 to-pink-400'
                  : 'bg-gray-200'
              }`}
              initial={{ scale: 0 }}
              animate={
                isActive && progress >= 100
                  ? {
                      scale: 1,
                      boxShadow: [
                        '0 0 0 0 rgba(251, 191, 36, 0)',
                        '0 0 10px 2px rgba(251, 191, 36, 0.5)',
                        '0 0 0 0 rgba(251, 191, 36, 0)',
                      ],
                    }
                  : { scale: 1 }
              }
              transition={
                isActive && progress >= 100
                  ? { duration: 1, repeat: Infinity, delay: i * 0.1 }
                  : { delay: i * 0.05 }
              }
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {progress >= 100 ? (
          <motion.div
            key="unlocked"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Unlock className="w-5 h-5 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Lock className="w-4 h-4 text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        className="text-sm font-medium text-gray-700 min-w-[3rem]"
        animate={
          progress > prevProgress
            ? { scale: [1, 1.2, 1], color: ['#374151', '#f43f5e', '#374151'] }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        {Math.min(progress, 100)}%
      </motion.span>

      {progress < 100 && progress >= 80 && (
        <motion.span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-rose-500 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Almost there!
        </motion.span>
      )}
    </motion.div>
  );
}
