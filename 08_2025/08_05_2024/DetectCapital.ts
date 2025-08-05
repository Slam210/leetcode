function detectCapitalUse(word: string): boolean {
  if (word === word.toUpperCase()) return true;

  if (word === word.toLowerCase()) return true;

  const first = word[0];
  const rest = word.slice(1);
  if (first === first.toUpperCase() && rest === rest.toLowerCase()) return true;

  return false;
}

function main() {
  const tests = [
    { word: "USA", expected: true },
    { word: "leetcode", expected: true },
    { word: "Google", expected: true },
    { word: "FlaG", expected: false },
    { word: "g", expected: true },
    { word: "G", expected: true },
  ];

  for (const { word, expected } of tests) {
    const result = detectCapitalUse(word);
    console.log(`Word: "${word}" → Output: ${result} (Expected: ${expected})`);
  }
}

main();
