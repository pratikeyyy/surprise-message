'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningExperience from '@/components/surprise/OpeningExperience';
import PhotoReveal from '@/components/surprise/PhotoReveal';
import TapMeButton from '@/components/surprise/TapMeButton';
import MemoryJar from '@/components/surprise/MemoryJar';
import MagicLetter from '@/components/surprise/MagicLetter';
import WhyYoureAmazing from '@/components/surprise/WhyYoureAmazing';
import MoodMeter from '@/components/surprise/MoodMeter';
import HeartMeter from '@/components/surprise/HeartMeter';
import FinalSurprise from '@/components/surprise/FinalSurprise';
import MusicButton from '@/components/surprise/MusicButton';
import MoonToggle from '@/components/surprise/MoonToggle';
import Butterflies from '@/components/surprise/Butterflies';
import HeartBurst from '@/components/surprise/HeartBurst';
import FloatingHearts from '@/components/surprise/FloatingHearts';
import Sparkles from '@/components/surprise/Sparkles';
import { INTERACTION_POINTS, MOODS } from '@/lib/constants';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [heartProgress, setHeartProgress] = useState(0);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [currentMood, setCurrentMood] = useState<typeof MOODS[0] | null>(null);

  const addProgress = useCallback((points: number) => {
    setHeartProgress((prev) => {
      const newProgress = Math.min(prev + points, 100);
      return newProgress;
    });
  }, []);

  useEffect(() => {
    if (heartProgress >= 100 && !showFinalSurprise) {
      setTimeout(() => setShowFinalSurprise(true), 500);
    }
  }, [heartProgress, showFinalSurprise]);

  const handleMoodChange = (mood: typeof MOODS[0]) => {
    setCurrentMood(mood);
  };

  useEffect(() => {
    if (isOpened) {
      addProgress(5);
    }
  }, [isOpened, addProgress]);

  const handlePhotoInteract = () => addProgress(INTERACTION_POINTS.photoDoubleTap);
  const handleTapMeInteract = () => addProgress(INTERACTION_POINTS.tapCompliment);
  const handleJarInteract = () => addProgress(INTERACTION_POINTS.clickJar);
  const handleLetterInteract = () => addProgress(INTERACTION_POINTS.openLetter);
  const handleAmazingInteract = () => addProgress(INTERACTION_POINTS.viewAmzingReason);
  const handleMoodInteract = () => addProgress(INTERACTION_POINTS.changeMood);
  const handleMoonInteract = () => addProgress(INTERACTION_POINTS.findEasterEgg);

  if (!isOpened) {
    return <OpeningExperience onComplete={() => setIsOpened(true)} />;
  }

  return (
    <main
      className={`relative min-h-screen transition-all duration-700 ${
        isNightMode ? 'night-mode' : ''
      }`}
    >
      <div className={`fixed inset-0 pointer-events-none transition-all duration-700 ${
        currentMood ? `bg-gradient-to-br ${currentMood.bgGradient} opacity-30` : ''
      }`} />

      <FloatingHearts count={isNightMode ? 8 : 15} />
      <Sparkles count={isNightMode ? 50 : 30} />
      <Butterflies />
      <HeartBurst />

      <MoonToggle
        isNightMode={isNightMode}
        onToggle={() => setIsNightMode(!isNightMode)}
        onInteract={handleMoonInteract}
      />

      <MusicButton />

      {heartProgress > 0 && heartProgress < 100 && (
        <HeartMeter
          progress={heartProgress}
          onUnlock={() => setShowFinalSurprise(true)}
        />
      )}

      <AnimatePresence>
        {showFinalSurprise && (
          <FinalSurprise />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1
              className="text-5xl md:text-7xl font-bold text-gradient mb-4"
              style={{ fontFamily: 'var(--font-dancing)' }}
            >
              A Little Surprise
            </h1>
            <p className="text-xl text-rose-400">
              <span className="animate-pulse inline-block">❤️</span>
            </p>
          </motion.div>

          <PhotoReveal onInteract={handlePhotoInteract} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <TapMeButton onInteract={handleTapMeInteract} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <MemoryJar onInteract={handleJarInteract} />
            <MagicLetter onInteract={handleLetterInteract} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="min-h-screen px-4 py-20"
        >
          <WhyYoureAmazing onInteract={handleAmazingInteract} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20"
        >
          <MoodMeter onMoodChange={handleMoodChange} onInteract={handleMoodInteract} />
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 text-center"
        >
          <p
            className="text-2xl text-gray-600"
            style={{ fontFamily: 'var(--font-dancing)' }}
          >
            Made with love, just for you
          </p>
          <motion.div
            className="mt-4 flex justify-center gap-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">❤️</span>
          </motion.div>
        </motion.footer>
      </div>

      {isNightMode && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
