/**
 *
 * We want the smallest number of repetitions of a so that b is inside it. Since b can’t appear until the repeated string is
 * at least as long as b, the minimum required repeats is ceil(len(b)/len(a)). Because of boundary overlaps, we may also need
 * one more repetition. Thus, we try repeating a count and count+1 times, checking whether b is a substring. If neither works, return -1.
 *
 */

function repeatedStringMatch(a: string, b: string): number {
  const count = Math.ceil(b.length / a.length);

  const repeated1 = a.repeat(count);
  if (repeated1.includes(b)) return count;

  const repeated2 = a.repeat(count + 1);
  if (repeated2.includes(b)) return count + 1;

  return -1;
}

function main(): void {
  const tests: Array<[string, string]> = [
    ["abcd", "cdabcdab"],
    ["a", "aa"],
    ["abc", "wxyz"],
    ["abc", "cabcabca"],
  ];

  for (const [a, b] of tests) {
    console.log(`a="${a}", b="${b}" ->`, repeatedStringMatch(a, b));
  }
}

main();

export { repeatedStringMatch };
