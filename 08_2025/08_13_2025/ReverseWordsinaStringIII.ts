function reverseWords(s: string): string {
  return s.replace(/\S+/g, (word) => Array.from(word).reverse().join(""));
}

function main(): void {
  const tests: string[] = [
    "Let's take LeetCode contest",
    "  hello   world ",
    "Tab\tand\nnewline",
    "a b  c   d",
    "",
    "single",
  ];

  for (const t of tests) {
    const out = reverseWords(t);
    console.log(`IN : ${JSON.stringify(t)}`);
    console.log(`OUT: ${JSON.stringify(out)}`);
    console.log("---");
  }
}

main();
