"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type p5 from "p5";
import Game from "./game";

const P5Canvas = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  let p5Instance: p5 | undefined;
  let game: Game | undefined;

  useEffect(() => {
    let mounted = true;

    import("p5").then((p5Module) => {
      const P5Constructor = p5Module.default;

      const sketch = (p: p5) => {
        let canvasParent: HTMLElement;

        p.setup = () => {
          canvasParent = sketchRef.current!;
          const w = canvasParent.clientWidth;
          const h = canvasParent.clientHeight;

          Game.loadAssets(p);
          p.createCanvas(w, h).parent(canvasParent);
          game = new Game(p, w, h);
        };

        p.windowResized = () => {
          if (canvasParent) {
            p.resizeCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
          }
        };

        p.draw = () => {
          p.background(200);
          game?.runGame(p);
        };

        p.mouseClicked = () => {
          if (game) {
            game.onMouseClick(p.mouseX, p.mouseY);
          }
        };
      };

      if (mounted) {
        p5Instance = new P5Constructor(sketch, sketchRef.current!);
      }
    });

    return () => {
      mounted = false;
      p5Instance?.remove();
    };
  }, []);

  return (
    <div
      ref={sketchRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        pointerEvents: "auto",
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(P5Canvas), { ssr: false });
