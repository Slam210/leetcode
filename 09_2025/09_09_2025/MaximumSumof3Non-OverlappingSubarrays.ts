/**
 *
 * We compute all length-k window sums so we can reason about choices compactly. Then we precompute, for every window position, the best left candidate and best right candidate
 * so that for each middle window we can immediately look up the optimal non-overlapping left and right windows. By scanning all valid middle windows and combining the three
 * window sums, we find the maximum total and, because of our tie-breaking when building left and right, the lexicographically smallest triplet when there are ties.
 *
 */

function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
  const n = nums.length;
  // number of possible window starts
  const m = n - k + 1;

  // Precompute every k-length sum so we can combine them quickly later.
  const W: number[] = new Array(m).fill(0);
  let windowSum = 0;
  for (let i = 0; i < n; i++) {
    // remove element that leaves window
    windowSum += nums[i];
    if (i >= k) windowSum -= nums[i - k];
    if (i >= k - 1) {
      // store sum for window starting at i-k+1
      W[i - k + 1] = windowSum;
    }
  }

  // left[i] = index of best window in [0..i]
  const left: number[] = new Array(m).fill(0);
  let bestLeft = 0;
  for (let i = 0; i < m; i++) {
    // prefer earlier index when equal
    if (W[i] > W[bestLeft]) bestLeft = i;
    left[i] = bestLeft;
  }

  // right[i] = index of best window in [i..m-1]
  const right: number[] = new Array(m).fill(0);
  let bestRight = m - 1;
  for (let i = m - 1; i >= 0; i--) {
    // prefer earlier index when equal
    if (W[i] >= W[bestRight]) bestRight = i;
    right[i] = bestRight;
  }

  // middle must allow one full k-window to its left and right.
  // default (valid because k <= n/3)
  let answer: number[] = [0, k, 2 * k];
  let maxTotal = -1;
  // mid runs from k to m - k - 1 inclusive
  for (let mid = k; mid <= m - k - 1; mid++) {
    // best left window completely before mid
    const l = left[mid - k];
    // best right window completely after mid
    const r = right[mid + k];
    const total = W[l] + W[mid] + W[r];
    if (total > maxTotal) {
      maxTotal = total;
      answer = [l, mid, r];
    }
  }

  return answer;
}

function main() {
  const examples: { nums: number[]; k: number }[] = [
    { nums: [1, 2, 1, 2, 6, 7, 5, 1], k: 2 },
    { nums: [1, 2, 1, 2, 1, 2, 1, 2, 1], k: 2 },
  ];

  for (const ex of examples) {
    const res = maxSumOfThreeSubarrays(ex.nums, ex.k);
    console.log(
      `nums = [${ex.nums.join(", ")}], k = ${ex.k}  =>  result = [${res.join(
        ", "
      )}]`
    );
  }

  const nums = [4, 5, 10, 6, 11, 17, 4, 3, 2, 20, 6];
  const k = 2;
  console.log(
    `extra test: result = [${maxSumOfThreeSubarrays(nums, k).join(", ")}]`
  );
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
