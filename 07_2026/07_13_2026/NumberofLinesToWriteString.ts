/*
 * @lc app=leetcode id=806 lang=typescript
 *
 * [806] Number of Lines To Write String
 */
// @lc code=start
function numberOfLines(widths: number[], s: string): number[] {
    let lines = 1;
    let currentWidth = 0;

    for (const char of s){
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        const charWidth = widths[index];

        if (currentWidth + charWidth > 100){
            lines++;
            currentWidth = charWidth;
        } else {
            currentWidth += charWidth;
        }
    }
    return [lines, currentWidth];
};
// @lc code=end

let widths = [4,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
let s = "bbbcccdddaaa"

console.log(numberOfLines(widths, s));

widths = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
s = "abcdefghijklmnopqrstuvwxyz"

console.log(numberOfLines(widths, s));