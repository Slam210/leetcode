function validPalindrome(s: string): boolean {
  function isPalindrome(str: string, l: number, r: number): boolean {
    while (l < r) {
      if (str[l] !== str[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }

  return true;
}

function main() {
  console.log(validPalindrome("aba"));
  console.log(validPalindrome("abca"));
  console.log(validPalindrome("abc"));
  console.log(validPalindrome("deeee"));
}

main();
