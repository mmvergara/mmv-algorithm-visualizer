import Link from "next/link";

export default function Home() {
  const Links = [
    { href: "/algorithms/sudoku-solver", text: "Sudoku Solver" },
    { href: "/algorithms/sorting/bubble-sort", text: "Bubble Sort" },
    { href: "/algorithms/sorting/insertion-sort", text: "Insertion Sort" },
    { href: "/algorithms/sorting/selection-sort", text: "Selection Sort" },
    { href: "/algorithms/sorting/merge-sort", text: "Merge Sort" },
  ];
  return (
    <main className="text-white flex flex-col overflow-hidden">
      {Links.map((x, i) => {
        return (
          <Link className="btn-1" href={x.href} key={i}>
            {x.text}
          </Link>
        );
      })}
    </main>
  );
}
