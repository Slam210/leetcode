/**
 *
 * We don’t need to simulate every possibility for '*'. Instead, we maintain a dynamic window of possible
 * unmatched open parentheses counts as we traverse the string. The lower bound tracks the minimum number
 * of opens we must have, while the upper bound tracks the maximum possible opens we could have. If this
 * window collapses (high < 0), the string is invalid. If, at the end, the minimum required opens is 0,
 * the string is valid.
 *
 */

function checkValidString(s: string): boolean {
  let low = 0;
  let high = 0;

  for (const ch of s) {
    if (ch === "(") {
      low++;
      high++;
    } else if (ch === ")") {
      low = Math.max(0, low - 1);
      high--;
    } else if (ch === "*") {
      low = Math.max(0, low - 1);
      high++;
    }

    if (high < 0) return false;
  }

  return low === 0;
}

function main() {
  console.log(checkValidString("()"));
  console.log(checkValidString("(*)"));
  console.log(checkValidString("(*))"));
  console.log(checkValidString("((*)"));
  console.log(checkValidString("(((*)"));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
