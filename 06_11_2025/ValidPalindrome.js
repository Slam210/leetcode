/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  function isAlphaNum(c) {
    return /[a-z0-9]/i.test(c);
  }

  let left = 0,
    right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  return true;
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));
