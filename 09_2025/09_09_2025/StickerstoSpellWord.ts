/**
 *
 * We need the minimum number of stickers to spell out the target word using infinite copies of given stickers.
 * To solve this, we turn each sticker into a frequency map of letters, then recursively try applying stickers
 * to cover the current remaining target. At each step, we reduce the target by cutting out letters that the
 * sticker provides, and we continue until the target is empty. Memoization ensures we don’t recompute states,
 * and pruning avoids useless sticker choices. This way, we search efficiently for the minimum sticker count or
 * determine it’s impossible.
 *
 */

function minStickers(stickers: string[], target: string): number {
  const m = stickers.length;
  const counts: number[][] = new Array(m);

  // convert each sticker into a frequency array of letters.
  for (let i = 0; i < m; i++) {
    counts[i] = new Array(26).fill(0);
    for (const ch of stickers[i]) {
      counts[i][ch.charCodeAt(0) - 97]++;
    }
  }

  // stores the minimum number of stickers required
  const memo = new Map<string, number>();

  function dfs(remaining: string): number {
    // if nothing remains, no stickers needed
    if (remaining.length === 0) return 0;

    // If we've already computed this state, return it directly
    if (memo.has(remaining)) return memo.get(remaining)!;

    // Build a frequency count of the current remaining target
    const targetCount = new Array(26).fill(0);
    for (const ch of remaining) {
      targetCount[ch.charCodeAt(0) - 97]++;
    }

    // Track the best (minimum) number of stickers found
    let res = Infinity;

    // focus on the first character of the remaining string
    const firstChar = remaining.charCodeAt(0) - 97;

    // Try applying each sticker
    for (let i = 0; i < m; i++) {
      // Skip stickers that don't contribute to the firstChar
      if (counts[i][firstChar] === 0) continue;

      // Construct a new remaining string after applying sticker i.
      const newTarget: string[] = [];
      // For each character c, reduce the count by what this sticker provides.
      for (let c = 0; c < 26; c++) {
        if (targetCount[c] > 0) {
          const remain =
            targetCount[c] - Math.min(targetCount[c], counts[i][c]);
          for (let k = 0; k < remain; k++) {
            newTarget.push(String.fromCharCode(97 + c));
          }
        }
      }

      // Recurse on the new reduced target
      const sub = dfs(newTarget.join(""));
      if (sub !== -1) {
        // +1 because we used one sticker (i) in this step
        res = Math.min(res, 1 + sub);
      }
    }

    // If no valid sticker sequence was found, mark as -1
    memo.set(remaining, res === Infinity ? -1 : res);
    return memo.get(remaining)!;
  }

  return dfs(target);
}

function main() {
  console.log(minStickers(["with", "example", "science"], "thehat"));
  console.log(minStickers(["notice", "possible"], "basicbasic"));
}

main();

/**
 *
 * Time complexity is O(n * 2^T) where T is target length
 * Space complexity is O(2^T) where T is target length
 *
 */
