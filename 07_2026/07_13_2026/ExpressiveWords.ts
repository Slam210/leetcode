/*
 * @lc app=leetcode id=809 lang=typescript
 *
 * [809] Expressive Words
 */
// @lc code=start
function expressiveWords(s: string, words: string[]): number {
    function isStretchy(word: string): boolean {
        let i = 0, j = 0;
        while (i < s.length && j < word.length) {
            if (s[i] !== word[j]) return false;

            let countS = 0, countW = 0;
            const char = s[i];

            while (i < s.length && s[i] === char) {
                countS++;
                i++;
            }

            while (j < word.length && word[j] === char) {
                countW++;
                j++;
            }

            if (countS < countW || (countS > countW && countS < 3)) {
                return false;
            }
        }
        return i === s.length && j === word.length;
    }

    let stretchyCount = 0;
    for (const word of words) {
        if (isStretchy(word)) {
            stretchyCount++;
        }
    }
    return stretchyCount;
};
// @lc code=end