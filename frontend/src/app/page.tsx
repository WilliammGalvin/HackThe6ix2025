"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [isAnimationStart, setIsAnimationStart] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.key === " ") {
        setIsAnimationStart(true);

        setTimeout(() => {
          setIsAnimationEnd(true);
        }, 1000);

        setTimeout(() => {
          setHideOverlay(true);
        }, 1200);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return isAnimationEnd ? (
    <>
      {!hideOverlay && (
        <motion.div
          className="absolute w-screen h-screen top-0 left-0 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        />
      )}

      <main className="w-screen h-screen text-center overflow-y-scroll">
        <section className="relative min-h-screen flex flex-col justify-center items-center">
          <h1 className="font-silkscreen font-bold text-6xl mb-12">
            Thirst for Profit
          </h1>

          <Link
            href="/game"
            className="font-silkscreen text-3xl px-8 py-3 relative rounded-lg"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 rounded-lg z-0" />
            <span className="relative text-black z-10">Play game</span>
          </Link>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <img
              src="down-arrow.png"
              className="w-12 h-12 opacity-40 -mb-9"
              alt="Scroll down"
            />
            <img src="down-arrow.png" className="w-12 h-12" alt="Scroll down" />
          </div>
        </section>

        <section className="min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center">
            <div className="flex gap-x-4 mb-4">
              <Link
                href="/petition"
                className="font-silkscreen text-3xl px-8 py-3 relative rounded-lg"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 rounded-lg z-0" />
                <span className="relative text-black z-10">Petition</span>
              </Link>

              <Link
                href="/resources"
                className="font-silkscreen text-3xl px-8 py-3 relative rounded-lg"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 rounded-lg z-0" />
                <span className="relative text-black z-10">Resources</span>
              </Link>
            </div>

            <Link
              href="https://devpost.com/software/thirst-for-profit"
              target="_blank"
              className="font-silkscreen text-3xl px-8 py-3 relative rounded-lg"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 rounded-lg z-0" />
              <span className="relative text-black z-10">DevPost</span>
            </Link>
          </div>
        </section>

        <footer className="-translate-y-full text-gray-300">
          <span>
            Made with ❤️ by William, Brianna, Aditi, Robert for{" "}
            <b>HackThe6ix</b>.
          </span>
        </footer>
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

        <motion.span>Thirst for Profit</motion.span>
      </main>
    </>
  );
}
