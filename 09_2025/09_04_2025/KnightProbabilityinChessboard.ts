function knightProbability(
  n: number,
  k: number,
  row: number,
  column: number
): number {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  const memo = new Map<string, number>();

  function dfs(k: number, r: number, c: number): number {
    if (r < 0 || r >= n || c < 0 || c >= n) return 0;
    if (k === 0) return 1;

    const key = `${k},${r},${c}`;
    if (memo.has(key)) return memo.get(key)!;

    let prob = 0;
    for (const [dr, dc] of moves) {
      prob += dfs(k - 1, r + dr, c + dc) / 8;
    }

    memo.set(key, prob);
    return prob;
  }

  return dfs(k, row, column);
}

function main(): void {
  console.log("Result 1:", knightProbability(3, 2, 0, 0));
  console.log("Result 2:", knightProbability(8, 30, 6, 4));
}

main();

export { knightProbability };
