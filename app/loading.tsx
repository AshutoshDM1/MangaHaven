"use client";
import { Loader, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        if (prev === "Loading..") return "Loading...";
        if (prev === "Loading.") return "Loading..";
        return "Loading.";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Generate random positions for particles
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animateY: Math.random() * -50 - 10,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    }));
  };

  const particles = generateParticles(15);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 [background:radial-gradient(circle,rgba(86,6,156,1)_1%,rgba(13,13,13,0.8)_77%)] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Loader className="w-16 h-16 text-white" />
        </motion.div>

        <motion.p
          className="mt-6 text-xl font-medium text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {loadingText}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-2 text-sm text-muted-foreground text-center max-w-xs"
        >
          Preparing your manga experience...
        </motion.p>
      </motion.div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-purple-500"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: `${particle.animateY}vh`,
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
