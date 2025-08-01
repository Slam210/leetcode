/**
 *
 * A harmonious array is an array where the difference between the maximum value and it's
 * minimum value is exactly 1. Given an integer array nums, return the length of the
 * longest harmonious subsequence.
 *
 * The intuition for this problem is to sort the array, then scan it linearly to find consectuve
 * numbers and count their occurences.
 *
 */

#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b)
{
    return (*(int *)a - *(int *)b);
}

int findLHS(int *nums, int numsSize)
{
    qsort(nums, numsSize, sizeof(int), compare);

    int max = 0;
    int i = 0;

    while (i < numsSize)
    {
        int count1 = 0, count2 = 0;
        int val = nums[i];

        while (i < numsSize && nums[i] == val)
        {
            count1++;
            i++;
        }

        int j = i;
        while (j < numsSize && nums[j] == val + 1)
        {
            count2++;
            j++;
        }

        if (count2 > 0)
        {
            int total = count1 + count2;
            if (total > max)
            {
                max = total;
            }
        }
    }

    return max;
}

int main()
{
    int nums[] = {1, 3, 2, 2, 5, 2, 3, 7};
    int size = sizeof(nums) / sizeof(nums[0]);
    int result = findLHS(nums, size);
    printf("Longest Harmonious Subsequence Length: %d\n", result);
    return 0;
}

/**
 *
 * Run time is O(nlog(n)) since we have to do sorting
 * Space time is O(1)
 *
 */