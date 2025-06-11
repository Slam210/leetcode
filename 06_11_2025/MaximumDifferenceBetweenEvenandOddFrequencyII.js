/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxDifference = function (s, k) {
  const n = s.length;
  const freq = Array.from({ length: 5 }, () => Array(n + 1).fill(0));

  for (let i = 0; i < n; i++) {
    const digit = s.charCodeAt(i) - 48;
    for (let d = 0; d < 5; d++) {
      freq[d][i + 1] = freq[d][i];
    }
    freq[digit][i + 1]++;
  }

  const maxDiffForPair = (a, b) => {
    const INF = 1e8;
    const minSeen = [
      [INF, INF],
      [INF, INF],
    ];
    let maxDiff = -Infinity;
    let l = 0;

    for (let r = k - 1; r < n; r++) {
      const freqA = freq[a][r + 1];
      const freqB = freq[b][r + 1];

      while (r - l + 1 >= k && freqB - freq[b][l] >= 2) {
        const prevA = freq[a][l];
        const prevB = freq[b][l];
        const parityA = prevA % 2;
        const parityB = prevB % 2;
        minSeen[parityA][parityB] = Math.min(
          minSeen[parityA][parityB],
          prevA - prevB
        );
        l++;
      }

      const parityA = freqA % 2;
      const parityB = freqB % 2;
      const prevMin = minSeen[1 - parityA][parityB];
      if (prevMin !== INF) {
        maxDiff = Math.max(maxDiff, freqA - freqB - prevMin);
      }
    }

    return maxDiff;
  };

  let result = -Infinity;

  for (let a = 0; a < 5; a++) {
    if (freq[a][n] === 0) continue;
    for (let b = 0; b < 5; b++) {
      if (a === b || freq[b][n] === 0) continue;
      result = Math.max(result, maxDiffForPair(a, b));
    }
  }

  return result;
};

console.log(maxDifference("12233", 4));
