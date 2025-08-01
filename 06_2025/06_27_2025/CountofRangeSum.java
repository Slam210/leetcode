/**
 * 
 * Given an integer array nums, along with lower and upper bound, we are tasked
 * with returning the number of range sums that lie in [lower,upper] inclusive
 * We can solve this using a prefix sums with merge sort. The key insight is to
 * represent each subarray sum as the difference between two prefix sums: for
 * any subarray nums[i..j], its sum is prefix[j+1] - prefix[i]. Thus, to count
 * how many subarrays have a sum within [lower, upper], we can reframe the
 * problem as for each prefix sum sum_j, we want to count how many earlier
 * prefix sums sum_i fall within [sum_j - upper, sum_j - lower]. This becomes a
 * range count problem. During the merge sort process, as we sort the prefix
 * sums, we simultaneously count how many elements in the left half fall within
 * this range for each element in the right half.
 * 
 */

public class CountofRangeSum {
    static class Solution {
        public int countRangeSum(int[] nums, int lower, int upper) {
            long[] prefix = new long[nums.length + 1];
            for (int i = 0; i < nums.length; i++) {
                prefix[i + 1] = prefix[i] + nums[i];
            }
            return countWhileMergeSort(prefix, 0, prefix.length, lower, upper);
        }

        private int countWhileMergeSort(long[] sums, int start, int end, int lower, int upper) {
            if (end - start <= 1)
                return 0;
            int mid = (start + end) / 2;
            int count = countWhileMergeSort(sums, start, mid, lower, upper)
                    + countWhileMergeSort(sums, mid, end, lower, upper);

            int j = mid, k = mid, t = mid;
            long[] cache = new long[end - start];
            int r = 0;

            for (int i = start; i < mid; i++) {
                while (k < end && sums[k] - sums[i] < lower)
                    k++;
                while (j < end && sums[j] - sums[i] <= upper)
                    j++;
                while (t < end && sums[t] < sums[i])
                    cache[r++] = sums[t++];
                cache[r++] = sums[i];
                count += j - k;
            }

            System.arraycopy(cache, 0, sums, start, t - start);
            return count;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = { -2, 5, -1 };
        int lower = -2;
        int upper = 2;

        int result = sol.countRangeSum(nums, lower, upper);
        System.out.println("Count of Range Sums: " + result);
    }
}

/**
 * 
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 * 
 */