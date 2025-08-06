/**
 *
 * We are given two strings a and b. We need to return the length of the longest uncommon subsequence
 * between them. There are only two cases to consider. If a and b are equal every subsequence of a is
 * also a subsequence of b, and vice versa. So there is no uncommon subsequence. Return -1. If a and b
 * are not equal the entire string a is not a subsequence of b, or vice versa. So the longer of the two
 * strings is a valid uncommon subsequence. Return max(a.length, b.length).
 *
 */

function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  for (let c of t) {
    if (i < s.length && s[i] === c) {
      i++;
    }
  }
  return i === s.length;
}

function findLUSlength(strs: string[]): number {
  strs.sort((a, b) => b.length - a.length);

  for (let i = 0; i < strs.length; i++) {
    let isUncommon = true;

    for (let j = 0; j < strs.length; j++) {
      if (i === j) continue;
      if (isSubsequence(strs[i], strs[j])) {
        isUncommon = false;
        break;
      }
    }

    if (isUncommon) return strs[i].length;
  }

  return -1;
}

function main() {
  console.log(findLUSlength(["aba", "cdc", "eae"]));
  console.log(findLUSlength(["aaa", "aaa", "aa"]));
  console.log(findLUSlength(["abc", "def", "abcd"]));
  console.log(findLUSlength(["aabbcc", "aabbcc", "cb"]));
  console.log(findLUSlength(["aabbcc", "aabbcc", "aabbc"]));
}

main();

/**
 *
 * Time complexity is O((n^2) * m)
 * Space complexity is O(1)
 *
 */
