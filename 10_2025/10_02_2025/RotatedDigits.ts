/**
 *
 * We want to find how many integers between 1 and n remain valid after a 180-degree digit rotation and also change into a different number.
 * To solve this, we observe that digits like 0,1,8 stay the same, while 2,5,6,9 transform into each other, and 3,4,7 make the number invalid.
 * So, for each number in the range, we check its digits and if all digits are valid and at least one of them changes, the number qualifies as good.
 *
 */

export default function rotatedDigits(n: number): number {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    let num = i;
    let isValid = true;
    let hasDifferent = false;

    while (num > 0) {
      const d = num % 10;
      if (d === 3 || d === 4 || d === 7) {
        isValid = false;
        break;
      }
      if (d === 2 || d === 5 || d === 6 || d === 9) {
        hasDifferent = true;
      }
      num = Math.floor(num / 10);
    }

    if (isValid && hasDifferent) {
      count++;
    }
  }
  return count;
}

function main(): void {
  const n = 20;
  console.log("Number of good integers:", rotatedDigits(n));
}

main();

/**
 *
 * Time complexity is O(nlog(n))
 * Space complexity is O(1)
 *
 */
