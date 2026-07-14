/*
 * @lc app=leetcode id=819 lang=typescript
 *
 * [819] Most Common Word
 */
// @lc code=start
function mostCommonWord(paragraph: string, banned: string[]): string {
    const wordMap = new Map<string, number>();
    const paragraphWords: string[] = paragraph.split(/[^a-z]/i).filter(word => word !== '').map(word => word.toLowerCase());
    console.log(paragraphWords);
    for (const word of paragraphWords) {
        if (!banned.includes(word) && word !== '') {
            wordMap.set(word, (wordMap.get(word) || 0) + 1);
        }
    }
    let maxCount = 0;
    let mostCommonWord = '';
    for (const [word, count] of wordMap) {
        if (count > maxCount) {
            maxCount = count;
            mostCommonWord = word;
        }
    }
    return mostCommonWord;
};
// @lc code=end