function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

function reverseStr(s: string, k: number): string {
  let result = "";

  for (let i = 0; i < s.length; i += 2 * k) {
    const part1 = s.slice(i, i + k);
    const part2 = s.slice(i + k, i + 2 * k);

    result += reverseString(part1) + part2;
  }

  return result;
}

function main(): void {
  const tests: { s: string; k: number }[] = [
    { s: "abcdefg", k: 2 },
    { s: "abcd", k: 2 },
    { s: "a", k: 2 },
    { s: "abcdefgh", k: 3 },
  ];

  for (const t of tests) {
    console.log(`s="${t.s}", k=${t.k} → "${reverseStr(t.s, t.k)}"`);
  }
}

main();
