/*
 * @lc app=leetcode id=801 lang=typescript
 *
 * [801] Minimum Swaps To Make Sequences Increasing
 */
// @lc code=start
function minSwap(nums1: number[], nums2: number[]): number {
    let keep = 0;
    let swap = 1;

    for (let i = 1; i < nums1.length; i++){
        let newKeep = Infinity;
        let newSwap = Infinity;

        if (nums1[i] > nums1[i-1] && nums2[i] > nums2[i-1]){
            newKeep = Math.min(newKeep, keep);
            newSwap = Math.min(newSwap, swap + 1);
        }

        if (nums1[i] > nums2[i-1] && nums2[i] > nums1[i-1]){
            newKeep = Math.min(newKeep, swap);
            newSwap = Math.min(newSwap, keep + 1);
        }

        keep = newKeep;
        swap = newSwap;
    }
    return Math.min(keep, swap);
};
// @lc code=end