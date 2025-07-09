/**
 * 
 * You are given an integer n, and you need to return the nth digit (1-based) 
 * in the infinite sequence. The sequence is formed by concatenating natural numbers. 
 * So we can think in digit blocks as 1-digit numbers (1–9) having 9 numbers × 1 digit = 
 * 9 digits, 2-digit numbers having 90 numbers × 2 digits = 180 digits, 3-digit numbers having
 *  900 × 3 = 2700 digits. We move through digit blocks, subtracting the number of digits in 
 * each, until we find the block that contains the nth digit.
 * 
 */

function findNthDigit(n: number): number {
  let digitLength = 1;
  let count = 9;
  let start = 1;

  // Find the block where the digit belongs
  while (n > digitLength * count) {
    n -= digitLength * count;
    digitLength++;
    count *= 10;
    start *= 10;
  }

  // Find the actual number and digit
  const number = start + Math.floor((n - 1) / digitLength);
  const digit = number.toString()[(n - 1) % digitLength];

  return parseInt(digit);
}

/**
 * 
 * Time complexity is O(log(n))
 * Space complexity is O(1)
 * 
 */