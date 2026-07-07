'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MOODS } from '@/lib/constants';

interface MoodMeterProps {
  onMoodChange?: (mood: (typeof MOODS)[0]) => void;
  onInteract?: () => void;
}

export default function MoodMeter({ onMoodChange, onInteract }: MoodMeterProps) {
  const [selectedMood, setSelectedMood] = useState<(typeof MOODS)[0] | null>(null);

  const handleMoodSelect = (mood: (typeof MOODS)[0]) => {
    if (selectedMood?.name !== mood.name) {
      onInteract?.();
    }
    setSelectedMood(mood);
    onMoodChange?.(mood);
  };

  return (
    <div className="relative py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gradient mb-4" style={{ fontFamily: 'var(--font-dancing)' }}>
          How do you feel?
        </h2>
        <p className="text-gray-500">Select your mood to change the page vibe</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto px-4">
        {MOODS.map((mood, index) => (
          <motion.button
            key={mood.name}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood)}
            className={`relative px-8 py-6 rounded-2xl transition-all duration-300 ${
              selectedMood?.name === mood.name
                ? `bg-gradient-to-br ${mood.bgGradient} shadow-xl ring-2 ring-${mood.color}-400 ring-offset-2`
                : 'bg-white/50 hover:bg-white/70 shadow-md'
            }`}
          >
            <motion.div
              className="text-4xl mb-2"
              animate={
                selectedMood?.name === mood.name
                  ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {mood.emoji}
            </motion.div>
            <span className="text-gray-700 font-medium">{mood.name}</span>

            {selectedMood?.name === mood.name && (
              <motion.div
                className="absolute -top-2 -right-2 bg-white rounded-full shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}

            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.bgGradient}`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: selectedMood?.name !== mood.name ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p
            className="text-lg text-gray-600"
            style={{ fontFamily: 'var(--font-dancing)' }}
          >
            Feeling {selectedMood.name.toLowerCase()} today? Let's make it even better!
          </p>
        </motion.div>
      )}
    </div>
  );
}
