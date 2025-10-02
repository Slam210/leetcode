/**
 *
 * We are tasked with generating all possible case permutations of a string where digits remain fixed and each letter may become lowercase or uppercase.
 * To approach this, we think of the string as a sequence of decisions where for digits there is only one choice, but for letters there are two, lowercase and uppercase.
 * By exploring every possible path of these decisions through recursion, we systematically construct all valid permutations and collect them in the result.
 *
 */

export default function letterCasePermutation(s: string): string[] {
  const result: string[] = [];

  function dfs(index: number, path: string[]): void {
    if (index === s.length) {
      result.push(path.join(""));
      return;
    }

    const char = s[index];
    if (/\d/.test(char)) {
      path.push(char);
      dfs(index + 1, path);
      path.pop();
    } else {
      path.push(char.toLowerCase());
      dfs(index + 1, path);
      path.pop();

      path.push(char.toUpperCase());
      dfs(index + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return result;
}

function main(): void {
  const cases = ["a1b2", "3z4", "12345", "abc"];

  for (const s of cases) {
    console.log(`Input: "${s}"`);
    console.log("Output:", letterCasePermutation(s));
    console.log("---");
  }
}

main();

/**
 *
 * Time complexity is O(n * 2^L)
 * Space complexity is O(n * 2^L)
 *
 */
