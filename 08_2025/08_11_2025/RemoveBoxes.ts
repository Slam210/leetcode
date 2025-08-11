/**
 *
 * We have a row of colored boxes, each represented by a number. In each move, we can remove a contiguous
 * sequence of boxes with the same color, scoring k * k points where k is the length of that sequence. Our
 * goal is to maximize total points by planning the removal order. At first, it seems like we should just
 * remove the largest group available, but that’s often not optimal because merging same colored boxes that
 * are initially separated can yield more points later. This means our state must remember not just the start
 * and end of a subarray, but also how many same-colored boxes are "attached" to the left from earlier moves.
 * This means that we can solve this using dp.
 *
 */

function removeBoxes(boxes: number[]): number {
  const n = boxes.length;
  const memo = new Map<string, number>();

  function dp(l: number, r: number, k: number): number {
    if (l > r) return 0;

    const key = `${l},${r},${k}`;
    if (memo.has(key)) return memo.get(key)!;

    // Merge same-colored boxes starting from l
    while (l < r && boxes[l] === boxes[l + 1]) {
      l++;
      k++;
    }

    // Remove the current group immediately
    let res = (k + 1) * (k + 1) + dp(l + 1, r, 0);

    // Try merging with a later box of same color
    for (let m = l + 1; m <= r; m++) {
      if (boxes[m] === boxes[l]) {
        res = Math.max(res, dp(l + 1, m - 1, 0) + dp(m, r, k + 1));
      }
    }

    memo.set(key, res);
    return res;
  }

  return dp(0, n - 1, 0);
}

function main() {
  console.log(removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1]));
  console.log(removeBoxes([1, 1, 1]));
  console.log(removeBoxes([1]));
}

main();

/**
 *
 * Time complexity is O(n^3)
 * Space complexity is O(n^3)
 *
 */
