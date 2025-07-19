import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-3xl font-semibold mb-6">AI Water Project</h1>
        <Link
          href="/game"
          className="border-2 border-white rounded-lg py-2 px-6"
        >
          Play Game
        </Link>
      </div>
    </main>
  );
}
