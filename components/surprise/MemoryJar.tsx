'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MEMORY_JAR_NOTES } from '@/lib/constants';

interface MemoryJarProps {
  onInteract?: () => void;
}

const colorMap: Record<string, string> = {
  rose: 'bg-gradient-to-br from-rose-300 to-pink-400',
  lavender: 'bg-gradient-to-br from-purple-300 to-indigo-400',
  peach: 'bg-gradient-to-br from-orange-200 to-rose-300',
  sky: 'bg-gradient-to-br from-sky-300 to-blue-400',
  mint: 'bg-gradient-to-br from-emerald-300 to-teal-400',
};

export default function MemoryJar({ onInteract }: MemoryJarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<(typeof MEMORY_JAR_NOTES[0]) | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenJar = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onInteract?.();

    setTimeout(() => {
      setIsOpen(true);
      const randomNote = MEMORY_JAR_NOTES[Math.floor(Math.random() * MEMORY_JAR_NOTES.length)];
      setCurrentNote(randomNote);
      setTimeout(() => setIsAnimating(false), 500);
    }, 500);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentNote(null);
    setIsAnimating(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenJar}
        disabled={isAnimating}
        className="relative group"
      >
        <motion.div
          className="w-28 h-36 relative"
          animate={isAnimating ? { y: [-5, 5, -5] } : { y: [-2, 2, -2] }}
          transition={isAnimating ? { duration: 0.2, repeat: 3 } : { duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-3xl rounded-t-lg shadow-lg overflow-hidden group-hover:from-amber-200 group-hover:to-amber-300 transition-colors">
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-amber-400/50 to-transparent" />
            <div className="absolute inset-x-4 top-4 bottom-4 bg-white/20 rounded backdrop-blur-sm" />
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-amber-400/30 to-transparent" />

            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-sm opacity-60"
                style={{
                  top: `${40 + Math.random() * 40}%`,
                  left: `${20 + Math.random() * 60}%`,
                  width: '12px',
                  height: '16px',
                }}
                initial={{ rotate: -10 + Math.random() * 20 }}
                animate={{ rotate: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <div
                  className={`w-full h-full rounded-sm ${colorMap[MEMORY_JAR_NOTES[i].color]}`}
                  style={{ transform: `rotate(${Math.random() * 20 - 10}deg)` }}
                />
              </motion.div>
            ))}
          </div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg shadow-md" />
        </motion.div>

        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-amber-600"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
      </motion.button>

      <p className="mt-4 text-gray-500 text-sm">Click to open the Memory Jar</p>

      <AnimatePresence>
        {isOpen && currentNote && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`${colorMap[currentNote.color]} p-8 rounded-lg shadow-2xl max-w-sm relative`}
                initial={{ y: 100, rotateX: -30, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-full bg-white/30"
                      style={{ left: `${(i + 1) * 18}%` }}
                    />
                  ))}
                </div>

                <motion.div
                  className="absolute -top-3 left-4 right-4 h-6 bg-gradient-to-b from-white/30 to-transparent"
                  style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />

                <motion.p
                  className="text-white font-medium text-lg leading-relaxed relative z-10 text-center"
                  style={{
                    fontFamily: 'var(--font-dancing)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    fontSize: '1.25rem',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentNote.text}
                </motion.p>

                <motion.div
                  className="absolute bottom-2 right-3 opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-white text-xs">A memory</span>
                </motion.div>

                <motion.button
                  onClick={handleClose}
                  className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm transition-colors relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Note
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
