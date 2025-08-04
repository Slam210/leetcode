/**
 *
 * To spell out the keyword using the circular "Freedom Trail Ring," we simulate aligning
 * each target character (key[i]) to the 12:00 position of the ring. Since the ring is
 * circular, rotating from one character to another can be done in two directions: clockwise
 * or counter-clockwise. Our goal is to minimize the total steps, where each rotation counts as
 * one step and each button press also counts as one. To achieve this, we use memoized recursion
 * (top-down dynamic programming). At every stage, we keep track of our current position in the
 * ring and the current character we want from the key. For each character in the key, we try
 * aligning all matching positions in the ring (since a letter may appear multiple times), calculate
 * the minimal rotation cost to get there, and recurse to solve the rest of the key. We memoize
 * results to avoid recomputation of the same subproblem, making the algorithm efficient.
 *
 */

function findRotateSteps(ring: string, key: string): number {
  // Precompute positions of each character in the ring
  const charPos = new Map<string, number[]>();
  for (let i = 0; i < ring.length; i++) {
    const c = ring[i];
    if (!charPos.has(c)) charPos.set(c, []);
    charPos.get(c)!.push(i);
  }

  // maps (ringIndex, keyIndex) to minimum steps
  const memo = new Map<string, number>();

  // ingIdx = current ring alignment, keyIdx = current letter in key
  function dp(ringIdx: number, keyIdx: number): number {
    // finished spelling the key
    if (keyIdx === key.length) return 0;

    // Check if this state was already computed
    const memoKey = `${ringIdx},${keyIdx}`;
    if (memo.has(memoKey)) return memo.get(memoKey)!;

    let minSteps = Infinity;
    const targetChar = key[keyIdx];
    // All positions of key[keyIdx] in ring
    const positions = charPos.get(targetChar)!;

    // Try rotating to each position of the current target character
    for (const pos of positions) {
      // Calculate the minimal distance between current and target positions
      const delta = Math.abs(ringIdx - pos);
      // Rotate shortest path
      const step = Math.min(delta, ring.length - delta);

      // Total = rotation steps + 1 for pressing + remaining key steps
      const total = step + 1 + dp(pos, keyIdx + 1);
      // Track the minimal steps
      minSteps = Math.min(minSteps, total);
    }

    // Save to memo and return
    memo.set(memoKey, minSteps);
    return minSteps;
  }

  return dp(0, 0);
}

function main() {
  console.log(findRotateSteps("godding", "gd"));
  console.log(findRotateSteps("godding", "godding"));
  console.log(findRotateSteps("abcde", "ade"));
}

main();

/**
 *
 * Time complexity is O(n * m * m)
 * Space complexity is O(n * m)
 *
 */
