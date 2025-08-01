/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (s.length < t.length) return "";

  const need = {};

  for (const char of t) {
    need[char] = (need[char] || 0) + 1;
  }

  const window = {};
  let have = 0;
  const needSize = Object.keys(need).length;

  let left = 0;
  let res = [-1, -1];
  let resLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;

    if (need[c] !== undefined && window[c] === need[c]) {
      have++;
    }

    while (have === needSize) {
      if (right - left + 1 < resLen) {
        res = [left, right];
        resLen = right - left + 1;
      }

      const charLeft = s[left];
      window[charLeft]--;
      if (need[charLeft] !== undefined && window[charLeft] < need[charLeft]) {
        have--;
      }
      left++;
    }
  }

  const [start, end] = res;
  return resLen === Infinity ? "" : s.slice(start, end + 1);
};

console.log(minWindow("ADOBECODEBANC", "ABC"));
