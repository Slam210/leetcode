/**
 *
 * We are given a string s and two operations. We can  remove "ab" and earn x points or remove "ba"
 * and earn y points. We can perform these operations any number of times in any order. Our task is
 * to maximize the total points by performing these operations optimally. Since both operations
 * remove overlapping character pairs, the order of removals can affect the final result. To maximize
 * the score we always prioritize removing the higher-value pair first. After removing as many of
 * the higher-value substrings as possible, remove the lower-value ones.
 *
 */

function maximumGain(s: string, x: number, y: number): number {
  function removePair(
    s: string,
    first: string,
    second: string,
    points: number
  ): [string, number] {
    const stack: string[] = [];
    let score = 0;

    for (const char of s) {
      if (
        stack.length > 0 &&
        stack[stack.length - 1] === first &&
        char === second
      ) {
        stack.pop();
        score += points;
      } else {
        stack.push(char);
      }
    }

    return [stack.join(""), score];
  }

  let total = 0;
  if (x >= y) {
    const [afterFirst, score1] = removePair(s, "a", "b", x);
    const [_, score2] = removePair(afterFirst, "b", "a", y);
    total = score1 + score2;
  } else {
    const [afterFirst, score1] = removePair(s, "b", "a", y);
    const [_, score2] = removePair(afterFirst, "a", "b", x);
    total = score1 + score2;
  }
  return total;
}

function main() {
  const testCases = [
    { s: "cbaab", x: 4, y: 5, expected: 9 },
    { s: "ab", x: 5, y: 6, expected: 5 },
    { s: "ba", x: 1, y: 2, expected: 2 },
    { s: "aabbaaxybbaabb", x: 5, y: 4, expected: 20 },
    { s: "", x: 5, y: 6, expected: 0 },
  ];

  for (const { s, x, y, expected } of testCases) {
    const result = maximumGain(s, x, y);
    console.log(
      `s = "${s}", x = ${x}, y = ${y} → Output: ${result} | Expected: ${expected}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
