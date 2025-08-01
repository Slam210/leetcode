function repeatedSubstringPattern(s: string): boolean {
  const doubled = s + s;
  const trimmed = doubled.slice(1, -1);
  return trimmed.includes(s);
}

function main() {
  const testCases = [
    { input: "abab", expected: true },
    { input: "aba", expected: false },
    { input: "abcabcabc", expected: true },
    { input: "a", expected: false },
    { input: "aaaa", expected: true },
  ];

  for (const { input, expected } of testCases) {
    const result = repeatedSubstringPattern(input);
    console.log(
      `Input: "${input}" → Output: ${result} | Expected: ${expected}`
    );
  }
}

main();
