/**
 *
 * We're given an integer array nums. Return true if it can be partitioned into two subsets with
 * equal sum, otherwise return false. This is a classic Subset Sum Problem as we want to check 
 * whether a subset of the array sums to half of the total sum. If the total sum is odd, we can 
 * immediately return false and if the total sum is even, we check whether there's a subset with 
 * sum target = total / 2.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool canPartition(int *nums, int numsSize)
{
    int sum = 0;
    for (int i = 0; i < numsSize; i++)
    {
        sum += nums[i];
    }

    if (sum % 2 != 0)
        return false;

    int target = sum / 2;
    bool *dp = (bool *)calloc(target + 1, sizeof(bool));
    if (!dp)
        return false;

    dp[0] = true; 

    for (int i = 0; i < numsSize; i++)
    {
        int num = nums[i];
        for (int j = target; j >= num; j--)
        {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    bool result = dp[target];
    free(dp);
    return result;
}

int main()
{
    int nums[] = {1, 5, 11, 5};
    int size = sizeof(nums) / sizeof(nums[0]);

    if (canPartition(nums, size))
    {
        printf("Can partition into two equal subsets.\n");
    }
    else
    {
        printf("Cannot partition into two equal subsets.\n");
    }

    return 0;
}

/**
 * 
 * Time complexity is O(n * sum/2)
 * Space complexity is O(sum/2)
 * 
 */