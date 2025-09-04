function findClosest(x: number, y: number, z: number): number {
  const dx = Math.abs(x - z);
  const dy = Math.abs(y - z);

  if (dx < dy) return 1;
  if (dy < dx) return 2;
  return 0;
}

function describe(x: number, y: number, z: number, result: number): string {
  const who =
    result === 1 ? "Person 1" : result === 2 ? "Person 2" : "Both (tie)";
  return `x=${x}, y=${y}, z=${z} -> ${who} (${result})`;
}

function main(): void {
  const tests: Array<[number, number, number]> = [
    [1, 2, 3],
    [10, 4, 7],
    [-5, 12, 0],
    [100, 50, 60],
    [-3, -9, -6],
  ];

  for (const [x, y, z] of tests) {
    const ans = findClosest(x, y, z);
    console.log(describe(x, y, z, ans));
  }
}

main();

export { findClosest };
