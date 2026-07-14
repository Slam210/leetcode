/*
 * @lc app=leetcode id=813 lang=typescript
 *
 * [813] Largest Sum of Averages
 */
// @lc code=start
function largestSumOfAverages(nums: number[], k: number): number {
    const n = nums.length;
    const prefix: number[] = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    function average(left: number, right: number): number {
        const sum = prefix[right + 1] - prefix[left];
        return sum / (right - left + 1);
    }

    const memo: number[][] = Array.from(
        {length: n},
        () => new Array(k + 1).fill(-1)
    )

    function dfs(index: number, groupsRemaining: number): number {
        if (groupsRemaining === 1) {
            return average(index, n - 1);
        }

        if (memo[index][groupsRemaining] !== -1) {
            return memo[index][groupsRemaining];
        }

        let best = 0;

        for (let end = index; end <= n - groupsRemaining; end++) {
            const score = average(index, end) + dfs(end + 1, groupsRemaining - 1);
            best = Math.max(best, score);
        }

        memo[index][groupsRemaining] = best;
        return best;
    }

    return dfs(0, k);
}
// @lc code=end