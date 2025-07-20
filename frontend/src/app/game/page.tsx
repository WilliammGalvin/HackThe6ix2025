"use client";

import P5_canvas from "@/game/p5_canvas";
import StartSettings from "@/game/start_settings";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
  const [hasGameAnimationStarted, setHasGameAnimationStarted] =
    useState<boolean>(false);
  const [hasGameEnded, setHasGameEnded] = useState<boolean>(false);
  const [startSettings, setStartSettings] = useState<StartSettings | null>(
    null
  );

  const onGameEnd = () => {
    setHasGameEnded(true);
    setHasGameStarted(false);
  };

  const startGame = (startSettings: StartSettings) => {
    setStartSettings(startSettings);
    setHasGameAnimationStarted(true);
    setHasGameEnded(false);

    setTimeout(() => {
      setHasGameStarted(true);
      setHasGameAnimationStarted(false);
    }, 1000);
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        {!hasGameAnimationStarted ? (
          hasGameStarted ? (
            <div className="flex-1 w-full h-full relative">
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
    <div className="text-center w-full h-full flex justify-center items-center">
      <div>
        <h2 className="font-semibold text-3xl mb-2">Game Over</h2>
        <p className="text-lg">In this situation, nobody wins.</p>
      </div>
    </div>
  );
}
