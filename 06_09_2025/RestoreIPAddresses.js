/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const results = [];

  function isValid(segment) {
    if (segment.length > 1 && segment[0] === "0") return false;
    const num = Number(segment);
    return num >= 0 && num <= 255;
  }

  function backtrack(start, parts) {
    if (parts.length === 4) {
      if (start === s.length) {
        results.push(parts.join("."));
      }
      return;
    }

    for (let len = 1; len <= 3; len++) {
      if (start + len > s.length) break;
      const segment = s.slice(start, start + len);
      if (isValid(segment)) {
        backtrack(start + len, [...parts, segment]);
      }
    }
  }

  backtrack(0, []);
  return results;
};

console.log(restoreIpAddresses("101023"));
