"use client";

import P5_canvas from "@/game/p5_canvas";
import StartSettings from "@/game/start_settings";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";

export default function Home() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
  const [hasGameAnimationStarted, setHasGameAnimationStarted] =
    useState<boolean>(false);
  const [hasGameEnded, setHasGameEnded] = useState<boolean>(false);
  const [hasGameEndAnimationStarted, setHasGameEndAnimationStarted] =
    useState<boolean>(false);
  const [startSettings, setStartSettings] = useState<StartSettings | null>(
    null
  );

  const router = useRouter();

  const onGameEnd = () => {
    setHasGameEndAnimationStarted(true);

    setTimeout(() => {
      setHasGameEnded(true);
      setHasGameStarted(false);
      setHasGameEndAnimationStarted(false);
    }, 5000);
  };

  const startGame = (startSettings: StartSettings) => {
    setStartSettings(startSettings);
    setHasGameAnimationStarted(true);
    setHasGameEnded(false);

    setTimeout(() => {
      setHasGameStarted(true);
      setHasGameAnimationStarted(false);
    }, 2000);
  };

  return (
    <main className="flex-1 flex flex-col">
      {hasGameEndAnimationStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-screen h-screen bg-black z-10"
        />
      )}

      <button
        onClick={() => {
          router.back();
        }}
        className="absolute top-8 left-8 flex items-center"
      >
        <BiChevronLeft className="w-8 h-8" />
        <span>Back</span>
      </button>

      <div className="flex-1 flex flex-col p-8">
        {!hasGameAnimationStarted ? (
          hasGameStarted ? (
            <div className="flex-1 w-full h-full relative p-2 bg-black rounded-xl">
              <P5_canvas startSettings={startSettings!} onGameEnd={onGameEnd} />
            </div>
          ) : hasGameEnded ? (
            <EndScreen />
          ) : (
            <StartScreen startGame={startGame} />
          )
        ) : (
          <motion.h1
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold tracking-wide"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            Are you ready?
          </motion.h1>
        )}
      </div>
    </main>
  );
}

function StartScreen({
  startGame,
}: {
  startGame: (startSettings: StartSettings) => void;
}) {
  const onStartClick = () => {
    const companyName = (
      document.getElementById("companyName") as HTMLInputElement
    ).value;

    if (companyName.trim() === "") {
      alert("Please enter a valid company name.");
      return;
    }

    startGame(new StartSettings(companyName));
  };

  return (
    <div className="text-center w-full h-full flex justify-center items-center">
      <div className="flex flex-col -translate-y-[35%]">
        <h2 className="font-semibold text-3xl mb-6">Welcome</h2>
        <input
          id="companyName"
          type="text"
          placeholder="Company Name"
          className="mb-4 py-2 px-2.5 border-2 border-border rounded"
        />
        <button
          onClick={onStartClick}
          className="bg-blue-600 shadow px-6 py-2 rounded-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

function EndScreen() {
  return (
    <>
      <div className="bg-black absolute top-0 left-0 z-0 w-screen h-screen" />
      <Link href="/" className="absolute top-8 left-8 flex items-center">
        <BiChevronLeft className="w-8 h-8" />
        <span>Back</span>
      </Link>

      <div className="text-center w-full h-full flex justify-center items-center">
        <div className="z-10">
          <h2 className="font-semibold text-3xl mb-2">Game Over</h2>
          <p className="text-lg">In this situation, nobody wins.</p>
        </div>
      </div>
    </>
  );
}
