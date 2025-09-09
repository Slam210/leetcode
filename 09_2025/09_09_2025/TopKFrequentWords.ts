/**
 *
 * We count each word’s frequency, then sort all unique words by two criteria. The first is the frequency descending and
 * the second is lexicographical ascending. This ensures the correct order. After sorting, we return the first k words
 * as the result.
 *
 */

function topKFrequent(words: string[], k: number): string[] {
  const freq = new Map<string, number>();
  for (const w of words) {
    freq.set(w, (freq.get(w) || 0) + 1);
  }

  const unique = Array.from(freq.keys());

  unique.sort((a, b) => {
    const countA = freq.get(a)!;
    const countB = freq.get(b)!;
    if (countA !== countB) {
      return countB - countA;
    }
    return a.localeCompare(b);
  });

  return unique.slice(0, k);
}

function main() {
  console.log(
    topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2)
  );

  console.log(
    topKFrequent(
      ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],
      4
    )
  );
}

main();

/**
 *
 * Time complexity is O(n + mlog(m)) where m is number of unique words
 * Space complexity is O(m) where m is number of unique words
 *
 */
