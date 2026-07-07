'use client';

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const nodesRef = useRef<{
    nodes: { type: number; duration: number; start: number }[];
    index: number;
    timeoutId: NodeJS.Timeout | null;
  }>({
    nodes: [],
    index: 0,
    timeoutId: null,
  });

  useEffect(() => {
    return () => {
      if (nodesRef.current.timeoutId) {
        clearTimeout(nodesRef.current.timeoutId);
      }
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createMelody = () => {
    const nodes = [
      { type: 261.63, duration: 0.3, start: 0 },
      { type: 329.63, duration: 0.3, start: 0.35 },
      { type: 392.0, duration: 0.3, start: 0.7 },
      { type: 329.63, duration: 0.3, start: 1.05 },
      { type: 261.63, duration: 0.3, start: 1.4 },
      { type: 293.66, duration: 0.3, start: 1.75 },
      { type: 329.63, duration: 0.6, start: 2.1 },
      { type: 293.66, duration: 0.3, start: 2.8 },
      { type: 261.63, duration: 0.3, start: 3.15 },
      { type: 196.0, duration: 0.6, start: 3.5 },
    ];
    nodesRef.current.nodes = [...nodes, ...nodes];
    nodesRef.current.index = 0;
  };

  const playNext = async () => {
    if (!isPlaying || !audioContextRef.current) return;

    const { nodes, index } = nodesRef.current;

    if (index >= nodes.length) {
      nodesRef.current.index = 0;
      playNext();
      return;
    }

    const node = nodes[index % nodes.length];

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = node.type;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + node.duration);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + node.duration);

    nodesRef.current.index = (index + 1) % nodes.length;

    nodesRef.current.timeoutId = setTimeout(playNext, node.duration * 1000);
  };

  const toggleMusic = () => {
    setHasInteracted(true);

    if (!isPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      createMelody();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      if (nodesRef.current.timeoutId) {
        clearTimeout(nodesRef.current.timeoutId);
      }
    }
  };

  useEffect(() => {
    if (isPlaying && hasInteracted) {
      playNext();
    }
  }, [isPlaying, hasInteracted]);

  return (
    <motion.button
      className="fixed bottom-4 right-4 z-30 bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white/90 transition-colors group"
      onClick={toggleMusic}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-pink-500" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-500 group-hover:text-gray-700 transition-colors" />
        )}
      </motion.div>

      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-400/20"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {!isPlaying && (
        <motion.span
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm"
        >
          Click to play music
        </motion.span>
      )}
    </motion.button>
  );
}
