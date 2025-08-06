function findLUSlength(a: string, b: string): number {
  if (a === b) return -1;
  return Math.max(a.length, b.length);
}

function main() {
  console.log(findLUSlength("aba", "cdc"));
  console.log(findLUSlength("aaa", "aaa"));
  console.log(findLUSlength("abcd", "def"));
}

main();
