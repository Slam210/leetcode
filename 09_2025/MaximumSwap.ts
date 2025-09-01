/**
 *
 * We want to maximize a number by swapping two digits at most once. To do this, we scan the digits from left
 * to right, and as soon as we find a digit that can be improved by swapping with a larger digit later in the
 * array, we perform the swap. To ensure the biggest increase, we swap with the furthest right occurrence of
 * the largest digit that appears later. If no swap is beneficial, the number remains unchanged.
 *
 */

function maximumSwap(num: number): number {
  const digits = num.toString().split("").map(Number);

  const last = new Array(10).fill(-1);
  for (let i = 0; i < digits.length; i++) {
    last[digits[i]] = i;
  }

  for (let i = 0; i < digits.length; i++) {
    for (let d = 9; d > digits[i]; d--) {
      if (last[d] > i) {
        [digits[i], digits[last[d]]] = [digits[last[d]], digits[i]];
        return parseInt(digits.join(""), 10);
      }
    }
  }

  return num;
}

function main() {
  console.log(maximumSwap(2736));
  console.log(maximumSwap(9973));
  console.log(maximumSwap(98368));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
