import P5_canvas from "@/game/p5_canvas";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <h1 className="text-center py-4">Water Game Demo</h1>

      <div className="flex-1">
        <P5_canvas />
      </div>
    </main>
  );
}
