/**
 *
 * We are given an array machines[] where machines[i] is the number of dresses in the i-th washing machine.
 * In one move, any subset of machines can give 1 dress to one of its adjacent machines. The goal is to
 * make all machines have the same number of dresses using the minimum number of moves. If it’s not possible,
 * return -1. To balance all machines, the total number of dresses must be divisible by the number of machines.
 * After that, we simulate passing dresses left to right, tracking the cumulative imbalance at each position.
 *
 */

function findMinMoves(machines: number[]): number {
  const total = machines.reduce((sum, val) => sum + val, 0);
  const n = machines.length;

  if (total % n !== 0) return -1;

  const target = total / n;
  let maxMoves = 0;
  let cumulative = 0;

  for (let i = 0; i < n; i++) {
    const load = machines[i] - target;
    cumulative += load;
    maxMoves = Math.max(maxMoves, Math.abs(cumulative), load);
  }

  return maxMoves;
}

function main() {
  const tests = [
    { machines: [1, 0, 5], expected: 3 },
    { machines: [0, 3, 0], expected: 2 },
    { machines: [0, 2, 0], expected: -1 },
  ];

  for (const { machines, expected } of tests) {
    const result = findMinMoves(machines);
    console.log(`Input: ${machines}, Output: ${result}, Expected: ${expected}`);
  }
}

main();

/**
 *
 * Time Complexity is O(n)
 * Space complexity is O(1)
 *
 */
