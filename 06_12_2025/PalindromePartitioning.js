/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const res = [];

  const isPalindrome = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  const backtrack = (start, path) => {
    if (start === s.length) {
      res.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };

  backtrack(0, []);
  return res;
};

console.log(partition("aab"));
