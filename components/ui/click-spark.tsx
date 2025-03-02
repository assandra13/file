"use client";

import type React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkCount?: number;
  sparkSize?: number;
  sparkDuration?: number;
  sparkColor?: string;
}

export function ClickSpark({ children, sparkCount = 5, sparkSize = 10, sparkDuration = 500, sparkColor = "bg-primary" }: ClickSparkProps) {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createSparks = (x: number, y: number) => {
    const newSparks: { id: number; x: number; y: number }[] = []; // Explicit type
    const id = Date.now();

    for (let i = 0; i < sparkCount; i++) {
      newSparks.push({ id, x, y });
    }

    setSparks((prev) => [...prev, ...newSparks]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => spark.id !== id));
    }, sparkDuration);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createSparks(x, y);
  };

  return (
    <div ref={containerRef} className="relative inline-block" onClick={handleClick} role="button" aria-label="Click to see spark effect">
      <AnimatePresence>
        {sparks.map((spark, i) => {
          const angle = Math.random() * 360;
          const distance = 20 + Math.random() * 20;
          const size = sparkSize + Math.random() * 5;

          return (
            <motion.div
              key={`${spark.id}-${i}`}
              className={`absolute rounded-full ${sparkColor} z-10`}
              style={{
                width: size,
                height: size,
                x: spark.x - size / 2,
                y: spark.y - size / 2,
              }}
              animate={{
                x: spark.x - size / 2 + Math.cos(angle * (Math.PI / 180)) * distance,
                y: spark.y - size / 2 + Math.sin(angle * (Math.PI / 180)) * distance,
                opacity: [1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: sparkDuration / 1000,
                ease: "easeOut",
              }}
              exit={{ opacity: 0 }}
            />
          );
        })}
      </AnimatePresence>
      {children}
    </div>
  );
}
