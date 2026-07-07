'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Butterfly {
  id: number;
  startX: number;
  startY: number;
  color: string;
  delay: number;
  size: number;
}

const colors = [
  '#f472b6',
  '#c084fc',
  '#fbbf24',
  '#60a5fa',
];

export default function Butterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [activeButterflies, setActiveButterflies] = useState<Set<number>>(new Set());

  useEffect(() => {
    const butterflies = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      startX: 10 + Math.random() * 30,
      startY: 40 + Math.random() * 50,
      color: colors[i % colors.length],
      delay: i * 0.5,
      size: 25 + Math.random() * 15,
    }));
    setButterflies(butterflies);
  }, []);

  const handleClick = (id: number) => {
    setActiveButterflies((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    setTimeout(() => {
      setActiveButterflies((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 5000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" style={{ pointerEvents: 'none' }}>
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute cursor-pointer"
          style={{
            left: `${butterfly.startX}%`,
            top: `${butterfly.startY}%`,
            width: butterfly.size,
            height: butterfly.size,
            pointerEvents: 'auto',
          }}
          animate={
            activeButterflies.has(butterfly.id)
              ? {
                  x: [0, 100, 200, 150, 300],
                  y: [0, -100, -50, -150, -200],
                  rotate: [0, 20, -20, 10, -10, 0],
                }
              : {
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }
          }
          transition={{
            duration: activeButterflies.has(butterfly.id) ? 5 : 3,
            repeat: activeButterflies.has(butterfly.id) ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          onClick={() => handleClick(butterfly.id)}
        >
          <motion.svg
            viewBox="0 0 40 32"
            fill="none"
            animate={{
              rotateY: [0, 180, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            <motion.path
              d="M20 16C20 16 10 8 6 2C2 -4 -4 8 2 14C8 20 20 16 20 16Z"
              fill={butterfly.color}
              style={{ transformOrigin: '20px 16px' }}
              animate={{ scaleX: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            <motion.path
              d="M20 16C20 16 30 8 34 2C38 -4 44 8 38 14C32 20 20 16 20 16Z"
              fill={butterfly.color}
              style={{ transformOrigin: '20px 16px' }}
              animate={{ scaleX: [1, 0.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
            />
            <ellipse cx="20" cy="16" rx="2" ry="8" fill={butterfly.color} />
          </motion.svg>

          <motion.span
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-pink-400 opacity-0"
            animate={activeButterflies.has(butterfly.id) ? { opacity: [0, 1, 0], y: [-5, -15, -25] } : {}}
            transition={{ duration: 1.5 }}
          >
            &lt;3
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
