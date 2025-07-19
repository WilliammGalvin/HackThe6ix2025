"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type p5 from "p5";

const P5Canvas = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  let p5Instance: p5 | undefined;

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

          p.createCanvas(w, h);
        };

        p.windowResized = () => {
          if (canvasParent) {
            p.resizeCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
          }
        };

        p.draw = () => {
          p.background(240);
          p.fill(100, 100, 255);
          p.ellipse(p.mouseX, p.mouseY, 50, 50);
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

  // 🔧 Set the parent container to take available space
  return (
    <div
      ref={sketchRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(P5Canvas), { ssr: false });
