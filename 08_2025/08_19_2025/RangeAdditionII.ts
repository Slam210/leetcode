function maxCount(m: number, n: number, ops: number[][]): number {
  if (ops.length === 0) {
    return m * n;
  }

  let minA = m;
  let minB = n;

  for (const [a, b] of ops) {
    minA = Math.min(minA, a);
    minB = Math.min(minB, b);
  }

  return minA * minB;
}

function main() {
  console.log(
    maxCount(3, 3, [
      [2, 2],
      [3, 3],
    ])
  );
  console.log(maxCount(3, 3, []));
  console.log(maxCount(4, 5, [[3, 3]]));
  console.log(
    maxCount(4, 5, [
      [4, 2],
      [2, 5],
    ])
  );
}

main();
