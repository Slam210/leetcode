/**
 *
 * The idea behind this problem is to use a prefix and suffix array.
 * This array will hold the product of all elements before and after
 * index i, which ensures the product in the final array is multiplied
 * by everything except the corresponding index.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *productExceptSelf(int *nums, int numsSize, int *returnSize)
{
    int *answer = (int *)malloc(sizeof(int) * numsSize);
    if (!answer)
        return NULL;

    *returnSize = numsSize;

    answer[0] = 1;
    for (int i = 1; i < numsSize; i++)
    {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    int suffix = 1;
    for (int i = numsSize - 1; i >= 0; i--)
    {
        answer[i] *= suffix;
        suffix *= nums[i];
    }

    return answer;
}

int main()
{
    int nums[] = {1, 2, 3, 4};
    int size = sizeof(nums) / sizeof(nums[0]);
    int returnSize = 0;

    int *result = productExceptSelf(nums, size, &returnSize);

    printf("Output: [");
    for (int i = 0; i < returnSize; i++)
    {
        printf("%d", result[i]);
        if (i < returnSize - 1)
            printf(", ");
    }
    printf("]\n");

    free(result);
    return 0;
}

/**
 *
 * Run time is O(n)
 * Space time is O(n)
 *
 */