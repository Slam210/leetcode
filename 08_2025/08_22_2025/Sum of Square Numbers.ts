/**
 *
 * To check if a number can be written as the sum of two squares, we only need to search within [0, sqrt(c)].
 * Using a two-pointer approach, one pointer starts at 0 and the other at √c. By adjusting them based on whether
 * the current sum is smaller or larger than c, we can efficiently determine if such a pair exists.
 *
 */

function judgeSquareSum(c: number): boolean {
  let a = 0;
  let b = Math.floor(Math.sqrt(c));

  while (a <= b) {
    const sum = a * a + b * b;
    if (sum === c) return true;
    else if (sum < c) a++;
    else b--;
  }

  return false;
}

function main() {
  console.log(judgeSquareSum(5));
  console.log(judgeSquareSum(3));
  console.log(judgeSquareSum(4));
  console.log(judgeSquareSum(2));
  console.log(judgeSquareSum(1));
}

main();

/**
 *
 * Time complexity is O(sqrt(c))
 * Space complexity is O(1)
 *
 */
