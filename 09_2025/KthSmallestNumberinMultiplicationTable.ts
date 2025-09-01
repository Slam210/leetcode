/**
 *
 * We want the kth smallest number in an m x n multiplication table. Directly generating the table is impossible for
 * large inputs, but we can instead binary search over the possible values. For each candidate, we compute how many
 * numbers in the table are less than or equal to it by summing row contributions. This allows us to zoom in on the
 * smallest number where at least k elements are ≤ it. That number is exactly the kth smallest.
 *
 */

// Count how many numbers in the multiplication table are <= x
function countLessEqual(x: number, m: number, n: number): number {
  let count = 0;

  // For each row i (1 to m), the row contains multiples of i: i, 2i, 3i, ... n*i
  // The number of elements <= x in this row is floor(x / i),
  // but it cannot exceed n (since row length = n).
  for (let i = 1; i <= m; i++) {
    count += Math.min(Math.floor(x / i), n);
  }
  return count;
}

function findKthNumber(m: number, n: number, k: number): number {
  let low = 1,
    high = m * n;

  // Binary search over the value space
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    // Count how many numbers are <= mid in the table
    if (countLessEqual(mid, m, n) >= k) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

function main() {
  console.log(findKthNumber(3, 3, 5));
  console.log(findKthNumber(2, 3, 6));
  console.log(findKthNumber(5, 5, 12));
}

main();

/**
 *
 * Time complexity is O(m * log(m * n))
 * Space complexity is O(1)
 *
 */
