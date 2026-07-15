/**
 *
 * app=leetcode id=805 lang=typescript
 *
 * [805] Split Array With Same Average
 */
// @lc code=start
function splitArraySameAverage(nums: number[]): boolean {
    const n = nums.length;
    const totalSum = nums.reduce((a, b) => a + b, 0);

    // If no subset size can possibly have an integer target sum, return false.
    let possible = false;
    for (let k = 1; k < n; k++) {
        if ((totalSum * k) % n === 0) {
            possible = true;
            break;
        }
    }
    if (!possible) return false;

    const mid = Math.floor(n / 2);
    const left = nums.slice(0, mid);
    const right = nums.slice(mid);

    // Map: subset size -> set of possible subset sums from the left half.
    const leftMap = new Map<number, Set<number>>();

    const leftCount = left.length;
    for (let mask = 0; mask < (1 << leftCount); mask++) {
        let sum = 0;
        let size = 0;

        for (let i = 0; i < leftCount; i++) {
            if ((mask & (1 << i)) !== 0) {
                sum += left[i];
                size++;
            }
        }

        if (!leftMap.has(size)) {
            leftMap.set(size, new Set<number>());
        }
        leftMap.get(size)!.add(sum);
    }

    const rightCount = right.length;

    for (let mask = 0; mask < (1 << rightCount); mask++) {
        let rightSum = 0;
        let rightSize = 0;

        for (let i = 0; i < rightCount; i++) {
            if ((mask & (1 << i)) !== 0) {
                rightSum += right[i];
                rightSize++;
            }
        }

        // Try every total subset size.
        for (let totalSize = 1; totalSize < n; totalSize++) {
            if ((totalSum * totalSize) % n !== 0) continue;

            const leftSize = totalSize - rightSize;

            if (leftSize < 0 || leftSize > leftCount) continue;

            const targetSum = (totalSum * totalSize) / n;
            const neededLeftSum = targetSum - rightSum;

            const sums = leftMap.get(leftSize);
            if (sums && sums.has(neededLeftSum)) {
                // Prevent selecting the entire array.
                if (totalSize !== n) {
                    return true;
                }
            }
        }
    }

    return false;
}
// @lc code=end
