'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

export default function HeartBurst() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const photoContainer = target.closest('[data-photo-container]');
      if (photoContainer) {
        const rect = photoContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setBursts((prev) => [...prev, { id: Date.now(), x: centerX, y: centerY }]);
      }
    };

    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h') {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        setBursts((prev) => [...prev, { id: Date.now(), x, y }]);

        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            const randX = Math.random() * window.innerWidth;
            const randY = Math.random() * window.innerHeight;
            setBursts((prev) => [...prev, { id: Date.now() + i, x: randX, y: randY }]);
          }, i * 100);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBursts((prev) => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [bursts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="absolute"
            style={{
              left: burst.x,
              top: burst.y,
              position: 'fixed',
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const radians = (angle * Math.PI) / 180;
              const distance = 100 + Math.random() * 50;
              const endX = Math.cos(radians) * distance;
              const endY = Math.sin(radians) * distance;
              const size = 15 + Math.random() * 10;
              const duration = 1 + Math.random() * 0.5;

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    x: endX,
                    y: endY,
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration,
                    ease: 'easeOut',
                  }}
                >
                  <Heart
                    className="fill-current"
                    style={{
                      color: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#c084fc'][
                        Math.floor(Math.random() * 5)
                      ],
                      width: size,
                      height: size,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
