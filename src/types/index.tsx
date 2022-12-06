export type algSpeed =
  | { speed: "Very Fast"; ms: 1 }
  | { speed: "Fast"; ms: 50 }
  | { speed: "Normal"; ms: 250 }
  | { speed: "Slow"; ms: 500 }
  | { speed: "Very Slow"; ms: 800 };
