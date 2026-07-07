'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Stars } from 'lucide-react';

interface MoonToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
  onInteract?: () => void;
}

export default function MoonToggle({ isNightMode, onToggle, onInteract }: MoonToggleProps) {
  const handleClick = () => {
    onToggle();
    onInteract?.();
  };

  return (
    <motion.div
      className="fixed top-4 left-4 z-30 flex flex-col items-center"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={handleClick}
        className="relative w-16 h-16 rounded-full flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            isNightMode
              ? 'bg-gradient-to-br from-indigo-900 to-slate-900'
              : 'bg-gradient-to-br from-blue-300 to-amber-100'
          }`}
          animate={{
            boxShadow: isNightMode
              ? '0 0 20px rgba(99, 102, 241, 0.5)'
              : '0 0 30px rgba(251, 191, 36, 0.5)',
          }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence mode="wait">
          {isNightMode ? (
            <motion.div
              key="night"
              initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <Moon className="w-8 h-8 text-blue-200 fill-blue-300" />
            </motion.div>
          ) : (
            <motion.div
              key="day"
              initial={{ opacity: 0, rotate: 30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -30, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <Sun className="w-8 h-8 text-amber-500 fill-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {isNightMode && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Stars className="w-3 h-3 text-white" />
              </motion.div>
            ))}
          </>
        )}
      </motion.button>

      <motion.span
        className="mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
      >
        {isNightMode ? 'Day Mode' : 'Night Mode'}
      </motion.span>
    </motion.div>
  );
}

function AnimatePresence({ children, mode }: { children: React.ReactNode; mode: string }) {
  return <>{children}</>;
}
