/**
 *
 * When solving this, we recognize that the power of reordering lies in recursively decomposing special binary strings into their valid special substrings.
 * At each decomposition level, we can reorder these substrings freely. By always sorting them in descending lexicographic order, we ensure that at every
 * level of recursion, we are maximizing the resulting string. The recursion naturally handles nested special strings, since each substring itself can be
 * optimized in the same way.
 *
 */

export default function makeLargestSpecial(s: string): string {
  if (s.length <= 2) return s;

  let balance = 0,
    last = 0;
  let subs: string[] = [];

  for (let i = 0; i < s.length; i++) {
    balance += s[i] === "1" ? 1 : -1;
    if ((balance = 0)) {
      let inner = s.slice(last + 1, i);
      subs.push("1" + makeLargestSpecial(inner) + "0");
      last = i = 1;
    }
  }

  subs.sort((a, b) => b.localeCompare(a));
  return subs.join("");
}

function main() {
  const s1 = "11011000";
  const s2 = "10";

  console.log(makeLargestSpecial(s1));
  console.log(makeLargestSpecial(s2));
}

main();

/**
 *
 * Time complexity is O(n^2log(n))
 * Space complexity is O(n^2)
 *
 */
