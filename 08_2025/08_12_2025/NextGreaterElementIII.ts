/**
 *
 * We want the smallest number greater than n that has exactly the same digits. This is equivalent to
 * finding the next lexicographical permutation of its digits. We identify the pivot by scanning from
 * right to left until we find the first digit that is smaller than the digit immediately to its right.
 * If no such digit exists, digits are in descending order → return -1. Then we find the swap candidate
 * where we, from the right, find the smallest digit greater than the pivot digit. Then we swap them.
 * Reverse the suffix to get the smallest possible number greater than n. Convert back to number and
 * check if it fits in a 32-bit signed integer.
 *
 */

function nextGreaterElement(n: number): number {
  const digits = n.toString().split("").map(Number);
  const len = digits.length;

  let i = len - 2;
  while (i >= 0 && digits[i] >= digits[i + 1]) {
    i--;
  }

  if (i < 0) return -1;

  let j = len - 1;
  while (digits[j] <= digits[i]) {
    j--;
  }

  [digits[i], digits[j]] = [digits[j], digits[i]];

  let left = i + 1,
    right = len - 1;
  while (left < right) {
    [digits[left], digits[right]] = [digits[right], digits[left]];
    left++;
    right--;
  }

  const result = parseInt(digits.join(""), 10);
  return result <= 0x7fffffff ? result : -1;
}

/**
 *
 * Time complexity is O(k) where k is the number of digits
 * Space complexity is O(k)
 *
 */
