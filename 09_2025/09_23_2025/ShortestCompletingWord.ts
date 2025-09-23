function buildFreq(s: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const ch of s.toLowerCase()) {
    if (/[a-z]/.test(ch)) {
      freq.set(ch, (freq.get(ch) || 0) + 1);
    }
  }
  return freq;
}

function covers(
  wordFreq: Map<string, number>,
  plateFreq: Map<string, number>
): boolean {
  for (const [ch, count] of plateFreq) {
    if ((wordFreq.get(ch) || 0) < count) {
      return false;
    }
  }
  return true;
}

export default function shortestCompletingWord(
  licensePlate: string,
  words: string[]
): string {
  const plateFreq = buildFreq(licensePlate);
  let result = "";

  for (const word of words) {
    const wordFreq = buildFreq(word);
    if (covers(wordFreq, plateFreq)) {
      if (result === "" || word.length < result.length) {
        result = word;
      }
    }
  }

  return result;
}

function main() {
  console.log(
    shortestCompletingWord("1s3 PSt", ["step", "steps", "stripe", "stepple"])
  );
  console.log(
    shortestCompletingWord("1s3 456", ["looks", "pest", "stew", "show"])
  );
  console.log(
    shortestCompletingWord("aBc 12c", ["abccdef", "caaacab", "cbca"])
  );
}

main();
