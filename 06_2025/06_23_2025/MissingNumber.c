/**
 *
 * The array contains n distinct numbers in the range [0, n], so we have n + 1 possible numbers,
 * but only n elements in the array. One number in that range is missing.  We can use the formula
 * for the sum of the first n natural numbers: Expected Sum=  n(n+1)/2
 * Subtract the actual sum of elements in the array from this expected sum to find the missing number.
 *
 */

#include <stdio.h>

int missingNumber(int *nums, int numsSize)
{
    int expectedSum = numsSize * (numsSize + 1) / 2;
    int actualSum = 0;
    for (int i = 0; i < numsSize; i++)
    {
        actualSum += nums[i];
    }
    return expectedSum - actualSum;
}

int main()
{
    int nums[] = {3, 0, 1};
    int size = sizeof(nums) / sizeof(nums[0]);

    int result = missingNumber(nums, size);
    printf("Missing number is: %d\n", result);

    return 0;
}

/**
 * Run time is O(n)
 * Space complexity is O(1)
 */