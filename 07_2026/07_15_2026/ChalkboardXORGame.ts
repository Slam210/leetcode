/*
 *
 * app=leetcode id=810 lang=typescript
 *
 * [810] Chalkboard XOR Game
 */

// @lc code=start
function xorGame(nums: number[]): boolean {
    if (nums.length % 2 === 0) return true;

    let xor = 0;
    for (const num of nums) {
        xor ^= num;
    }

    return xor === 0;
};
// @lc code=end
