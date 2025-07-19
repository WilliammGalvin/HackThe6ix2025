import P5_canvas from "@/game/p5_canvas";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <h1 className="text-center py-4">Water Game Demo</h1>

      <div className="flex justify-center items-center w-full h-full">
        <div className="flex-1 w-full h-full">
          <P5_canvas />
        </div>
      </div>
    </main>
  );
}
