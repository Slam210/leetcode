/**
 *
 * We need to find the nearest palindrome to a given number without including the number itself. Instead of scanning
 * up and down one by one, we take advantage of palindrome symmetry: numbers closest to n are often formed by mirroring
 * its first half of digits. By generating candidates from the unchanged first half and its ±1 variations, plus special
 * cases for digit changes across boundaries, we drastically reduce the search space. We then pick the candidate with
 * the smallest absolute difference, choosing the smaller one if there’s a tie.
 *
 */

function nearestPalindromic(n: string): string {
  function makePalindrome(firstHalf: string, isOdd: boolean): string {
    let rev = firstHalf.split("").reverse().join("");
    return isOdd ? firstHalf + rev.slice(1) : firstHalf + rev;
  }

  let num = BigInt(n);
  let len = n.length;
  let firstHalf = n.slice(0, Math.ceil(len / 2));
  let isOdd = len % 2 !== 0;

  let candidates = new Set<string>();

  // From firstHalf itself
  candidates.add(makePalindrome(firstHalf, isOdd));

  // From firstHalf ± 1
  let firstNum = BigInt(firstHalf);
  candidates.add(makePalindrome((firstNum - 1n).toString(), isOdd));
  candidates.add(makePalindrome((firstNum + 1n).toString(), isOdd));

  // Edge cases
  candidates.add("9".repeat(len - 1));
  candidates.add("1" + "0".repeat(len - 1) + "1");

  let best: string | null = null;

  for (let cand of candidates) {
    if (cand === n || cand.length === 0) continue;
    let diff = BigInt(cand) > num ? BigInt(cand) - num : num - BigInt(cand);
    if (best === null) {
      best = cand;
    } else {
      let bestDiff =
        BigInt(best) > num ? BigInt(best) - num : num - BigInt(best);
      if (
        diff < bestDiff ||
        (diff === bestDiff && BigInt(cand) < BigInt(best))
      ) {
        best = cand;
      }
    }
  }

  return best!;
}

function main() {
  console.log(nearestPalindromic("123"));
  console.log(nearestPalindromic("1"));
  console.log(nearestPalindromic("999"));
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */
