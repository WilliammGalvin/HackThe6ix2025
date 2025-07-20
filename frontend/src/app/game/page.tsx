"use client";

import P5_canvas from "@/game/p5_canvas";
import StartSettings from "@/game/start_settings";
import { useState } from "react";

export default function Home() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);
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
    setHasGameStarted(true);
    setHasGameEnded(false);
  };

  return (
    <main className="w-screen h-screen flex flex-col">
      <div className="flex-1">
        {hasGameStarted ? (
          <P5_canvas startSettings={startSettings!} onGameEnd={onGameEnd} />
        ) : hasGameEnded ? (
          <EndScreen />
        ) : (
          <StartScreen startGame={startGame} />
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
      <div className="flex flex-col">
        <h2 className="font-semibold text-3xl mb-6">Welcome</h2>
        <input
          id="companyName"
          type="text"
          placeholder="Company Name"
          className="mb-4 p-2 border-2 rounded"
        />
        <button
          onClick={onStartClick}
          className="border-2 border-white px-6 py-2 rounded-lg"
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
