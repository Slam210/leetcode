/**
 *
 * We are given an array of integers nums. We need to compute the maximum bitwise OR we can get from any non-empty
 * subset of nums. We need to count how many different non-empty subsets produce this maximum OR value. We can
 * solve this using backtracking (a form of DFS) to explore all subsets of the array. For each subset we calculate
 * its bitwise OR. If it's equal to the max we've seen so far, increment a counter. If it's greater than the max,
 * update the max and reset the counter.
 *
 */

#include <stdio.h>

void backtrack(int *nums, int numsSize, int index, int currOR, int *maxOR, int *count)
{
    if (index == numsSize)
    {
        return;
    }

    int withCurr = currOR | nums[index];
    if (withCurr > *maxOR)
    {
        *maxOR = withCurr;
        *count = 1;
    }
    else if (withCurr == *maxOR)
    {
        (*count)++;
    }
    backtrack(nums, numsSize, index + 1, withCurr, maxOR, count);
    backtrack(nums, numsSize, index + 1, currOR, maxOR, count);
}

int countMaxOrSubsets(int *nums, int numsSize)
{
    int maxOr = 0;
    for (int i = 0; i < numsSize; i++)
    {
        maxOr |= nums[i];
    }

    int count = 0;
    backtrack(nums, numsSize, 0, 0, &maxOr, &count);
    return count;
}

int main()
{
    int nums[] = {3, 1};
    int size = sizeof(nums) / sizeof(nums[0]);

    int result = countMaxOrSubsets(nums, size);
    printf("Number of subsets with maximum OR: %d\n", result);

    return 0;
}

/**
 *
 * Run time is O(2^n) for generating all sibsets
 * Space complexity is O(n)
 *
 */