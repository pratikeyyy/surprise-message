'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Heart, X } from 'lucide-react';
import { MAGIC_LETTER_CONTENT } from '@/lib/constants';

interface MagicLetterProps {
  onInteract?: () => void;
}

export default function MagicLetter({ onInteract }: MagicLetterProps) {
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleClick = () => {
    if (!isUnfolding && !isFullyOpen) {
      setIsUnfolding(true);
      onInteract?.();
      setTimeout(() => {
        setIsFullyOpen(true);
        setIsUnfolding(false);
        setHasOpened(true);
      }, 1000);
    }
  };

  const handleClose = () => {
    setIsFullyOpen(false);
    setIsUnfolding(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10">
      <AnimatePresence>
        {!isFullyOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            disabled={isUnfolding}
            className="relative group"
          >
            <motion.div
              className="relative"
              animate={isUnfolding ? { y: -50, scale: 1.1 } : { y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl overflow-visible relative"
                style={{
                  width: '160px',
                  height: '100px',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
                initial={{ rotateX: 0 }}
                exit={{ opacity: 0, scale: 0, rotateX: 10 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {!isUnfolding && !hasOpened ? (
                    <motion.div
                      key="envelope"
                      className="absolute inset-0 overflow-hidden"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50" />
                      <div
                        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-rose-200 to-pink-300 origin-bottom"
                        style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
                      />
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-rose-100/50 to-pink-100/50" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }} />
                      <div className="absolute bottom-4 inset-x-1/2 w-8 -translate-x-1/2">
                        <Heart className="w-8 h-8 text-rose-400 fill-rose-300 mx-auto" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unfolding"
                      className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50 shadow-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotateY: [0, 180, 360] }}
                          transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                          <Heart className="w-10 h-10 text-rose-500 fill-rose-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="absolute -top-2 -right-2 bg-rose-400 rounded-full p-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Mail className="w-4 h-4 text-white" />
              </motion.div>

              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent to-rose-200/20 rounded-lg blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <p className="mt-4 text-gray-500 text-sm group-hover:text-gray-700 transition-colors">
              {hasOpened ? 'Open Again' : 'Open the Magic Letter'}
            </p>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFullyOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative max-w-md w-full"
                initial={{ scale: 0.5, rotateY: -90, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotateY: 90, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="bg-gradient-to-br from-rose-50 via-white to-amber-50 rounded-lg shadow-2xl relative overflow-hidden"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div className="absolute top-0 left-0 h-12 bg-gradient-to-b from-rose-100/50 to-transparent w-full" />
                  <div className="absolute inset-x-0 top-12 bottom-0 pointer-events-none">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t border-rose-100"
                        style={{ top: `${(i + 1) * 25}%` }}
                      />
                    ))}
                  </div>
                  <div className="p-8 pt-16">
                    {MAGIC_LETTER_CONTENT.map((line, i) => (
                      <motion.p
                        key={i}
                        className="text-gray-700"
                        style={{
                          fontFamily: 'var(--font-dancing)',
                          fontSize: line === '' ? '0.5rem' : '1.125rem',
                          letterSpacing: line.includes('My Dearest') || line.includes('Forever yours') ? '0.05em' : 'normal',
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    className="absolute bottom-4 right-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Heart className="w-6 h-6 text-rose-300 fill-rose-200 opacity-50" />
                  </motion.div>

                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300" />
                </motion.div>

                <motion.button
                  onClick={handleClose}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-rose-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
