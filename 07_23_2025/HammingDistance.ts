function hammingDistance(x: number, y: number): number {
  let xor = x ^ y;
  let count = 0;

  while (xor !== 0) {
    count += xor & 1;
    xor >>= 1;
  }

  return count;
}

function main() {
  const testCases = [
    { x: 1, y: 4, expected: 2 },
    { x: 3, y: 1, expected: 1 },
    { x: 0, y: 0, expected: 0 },
    { x: 7, y: 15, expected: 1 },
    { x: 255, y: 0, expected: 8 },
  ];

  for (const { x, y, expected } of testCases) {
    const result = hammingDistance(x, y);
    console.log(
      `x = ${x}, y = ${y} → Output: ${result} | Expected: ${expected}`
    );
  }
}

main();
