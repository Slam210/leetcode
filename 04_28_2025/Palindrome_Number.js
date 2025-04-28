/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }

  const digits = [];
  while (x > 0) {
    digits.unshift(x % 10);
    x = Math.floor(x / 10);
  }

  const isEqualToReverse = (arr) =>
    arr.every((v, i) => v === arr[arr.length - 1 - i]);

  return isEqualToReverse(digits);
};

let x = 121;
const bool = isPalindrome(x);
console.log(bool);

/*

The optimal solution to it just make a reversed number rather than comparing the reversed array

function isPalindrome(num) {
    if (num < 0) return false; // negative numbers are not palindromes
    
    let original = num;
    let reversed = 0;
    
    while (num !== 0) {
        const digit = num % 10;            // Get last digit
        reversed = reversed * 10 + digit;   // Append digit
        num = Math.floor(num / 10);          // Remove last digit
    }
    
    return reversed === original;
}

*/
