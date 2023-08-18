import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-white flex flex-col">
      <Link href="/algorithms/sudoku-solver">Sudoku Solver</Link>
      <Link href="/algorithms/sorting/bubble-sort">Bubble Sort</Link>
    </main>
  );
}
