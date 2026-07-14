/*
 * @lc app=leetcode id=820 lang=typescript
 *
 * [820] Short Encoding of Words
 */
// @lc code=start
function minimumLengthEncoding(words: string[]): number {
  const remaining = new Set(words);

  for (const word of words) {
    for (let i = 1; i < word.length; i++) {
      remaining.delete(word.slice(i));
    }
  }

  let answer = 0;

  for (const word of remaining) {
    answer += word.length + 1;
  }

  return answer;
}
// @lc code=end