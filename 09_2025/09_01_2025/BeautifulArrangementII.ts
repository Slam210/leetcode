/**
 *
 * We need to generate a permutation of 1..n such that the consecutive differences produce exactly k
 * unique values. Since alternating between the smallest and largest remaining numbers yields the widest
 * range of differences, we use this pattern to produce exactly k distinct differences. After achieving this,
 * we stop and simply append the leftover numbers in increasing order, which preserves the distinct difference count.
 * This approach guarantees exactly k distinct values while satisfying the problem’s requirements.
 *
 */

function constructArray(n: number, k: number): number[] {
  const answer: number[] = [];
  let low = 1,
    high = n;

  while (low <= high && k > 1) {
    if (k % 2 === 1) {
      answer.push(low++);
    } else {
      answer.push(high--);
    }
    k--;
  }

  for (let i = low; i <= high; i++) {
    answer.push(i);
  }

  return answer;
}

function main() {
  console.log(constructArray(3, 1));
  console.log(constructArray(3, 2));
  console.log(constructArray(5, 4));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
