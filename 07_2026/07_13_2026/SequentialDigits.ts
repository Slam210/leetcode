/*
 * @lc app=leetcode id=1291 lang=typescript
 *
 * [1291] Sequential Digits
 */
// @lc code=start
function sequentialDigits(low: number, high: number): number[] {
    const result: number[] = [];

    for (let length = 2; length <= 9; length++) {
        for (let start = 1; start <= 10 - length; start++) {
            let num = 0;

            for (let digit = start; digit < start + length; digit++) {
                num = num * 10 + digit;
            }

            if (num >= low && num <= high) {
                result.push(num);
            }
        }
    }
    return result;
};
// @lc code=end

let low = 100;
let high = 300;

console.log(sequentialDigits(low, high));

low = 1000;
high = 13000;

console.log(sequentialDigits(low, high));