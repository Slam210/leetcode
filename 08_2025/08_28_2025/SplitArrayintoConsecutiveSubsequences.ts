/**
 *
 * We must decide whether a sorted array can be partitioned into subsequences of consecutive numbers,
 * each of length at least 3. The greedy strategy ensures correctness, Whenever possible, extend an
 * existing subsequence otherwise, try to start a new subsequence of at least 3 numbers. If neither
 * action is possible, the array cannot be partitioned correctly. By maintaining two maps, one for
 * frequencies and one for subsequence needs, we can efficiently track available numbers and subsequences
 * that need continuation, ensuring that all subsequences meet the required conditions.
 *
 */

function isPossible(nums: number[]): boolean {
  const freq = new Map<number, number>();
  const need = new Map<number, number>();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  for (const num of nums) {
    if ((freq.get(num) || 0) === 0) continue;

    if ((need.get(num) || 0) > 0) {
      need.set(num, (need.get(num) || 0) - 1);
      need.set(num + 1, (need.get(num + 1) || 0) + 1);
    } else if ((freq.get(num + 1) || 0) > 0 && (freq.get(num + 2) || 0) > 0) {
      freq.set(num + 1, (freq.get(num + 1) || 0) - 1);
      freq.set(num + 2, (freq.get(num + 2) || 0) - 1);
      need.set(num + 3, (need.get(num + 3) || 0) + 1);
    } else {
      return false;
    }

    freq.set(num, (freq.get(num) || 0) - 1);
  }

  return true;
}

function main() {
  console.log(isPossible([1, 2, 3, 3, 4, 5]));
  console.log(isPossible([1, 2, 3, 3, 4, 4, 5, 5]));
  console.log(isPossible([1, 2, 3, 4, 4, 5]));
}

main();

/**
 *
 * Run time is O(n)
 * Space time is O(n)
 *
 */
