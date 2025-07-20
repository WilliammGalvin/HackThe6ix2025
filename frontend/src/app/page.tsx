"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [isAnimationStart, setIsAnimationStart] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.key === " ") {
        setIsAnimationStart(true);

        setTimeout(() => {
          setIsAnimationEnd(true);
        }, 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return isAnimationEnd ? (
    <>
      <motion.div
        className="absolute w-screen h-screen top-0 left-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      />

      <main className="w-screen h-screen flex justify-center items-center text-center">
        Hello, world!
      </main>
    </>
  ) : (
    <>
      <div className="fixed bottom-0 left-0 w-screen h-screen z-20 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-black"
          initial={{ height: 0 }}
          animate={isAnimationStart ? { height: "150vh" } : {}}
          transition={{ duration: 0.35, ease: "easeIn", delay: 0.56 }}
        />
      </div>

      <main className="w-screen h-screen flex justify-center items-center text-center">
        <div className="absolute top-0 left-0 w-screen h-screen bg-white z-10">
          <motion.span
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-large"
            initial={{ opacity: 100 }}
            animate={isAnimationStart ? { opacity: 0 } : {}}
            transition={{ duration: 0.28, ease: "easeIn" }}
          >
            Press space bar to enter
          </motion.span>
        </div>

        <motion.img
          src="drop.png"
          initial={{ y: "-100%" }}
          animate={isAnimationStart ? { y: "100vh" } : {}}
          transition={{ duration: 0.58, ease: "easeIn" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 z-20"
        />
      </main>
    </>
  );
}
