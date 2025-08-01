/**
 *
 * We are given a number 1 to n. We are to guess what the number is.
 * We can use the guess function which returns -1 if it's higher,
 * 1 if it's lower, or 0. This is an exmaple of a binary search where
 * we can maintain the mid point, using the guess function as reference
 * on whether we increase or decrease.
 *
 */

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

function guessNumber(n: number): number {
  let low: number = 0;
  let high: number = n;
  let currentGuess: number = (high + low) / 2;

  while (true) {
    if (guess(currentGuess) === 0) return currentGuess;
    if (guess(currentGuess) === 1) low = currentGuess;
    if (guess(currentGuess) === -1) high = currentGuess;
    currentGuess = (high + low) / 2;
  }
}

/**
 *
 * Run time is O(log(n))
 * Space complexity is O(1)
 *
 */
