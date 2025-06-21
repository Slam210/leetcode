/*

To make a string k-special, we want all character frequencies to be close to each other—specifically, 
the difference between any two frequencies should be at most k. The idea is to determine how many 
characters we need to delete to achieve this balance. First, we count how often each character appears. 
Then, we consider each frequency as a possible base and try to adjust all other frequencies to fall 
within a range of size k around it. Characters that occur too infrequently are entirely deleted, 
while those that occur too frequently are partially deleted to bring them down. By trying every 
frequency as a potential baseline and calculating the number of deletions needed in each case, we 
can find the minimum deletions required to make the string satisfy the k-special condition.

*/

var minimumDeletions = function (word, k) {
  let freqMap = new Map();

  for (let ch of word) {
    freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
  }

  let freqs = Array.from(freqMap.values()).sort((a, b) => a - b);
  let n = freqs.length;
  let res = Infinity;

  for (let i = 0; i < n; i++) {
    let maxAllowed = freqs[i] + k;
    let deletions = 0;

    for (let j = 0; j < n; j++) {
      if (freqs[j] < freqs[i]) {
        deletions += freqs[j];
      } else if (freqs[j] > maxAllowed) {
        deletions += freqs[j] - maxAllowed;
      }
    }

    res = Math.min(res, deletions);
  }

  return res;
};

/*

Run complexity is O(n + m²) which becomes O(n)
Space compleixty is O(m) which becomes O(1)

*/
