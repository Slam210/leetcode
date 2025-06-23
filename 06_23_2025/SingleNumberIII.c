/**
 *
 * The idea behind this problem is to use the XOR property to find the inital bits that differ.
 * Since they differ in at least one bit, we can find the right most difference, and use the XOR
 * property to split the array into 2 groups which will cancel out everything except the single digits.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *singleNumber(int *nums, int numsSize, int *returnSize)
{
    int xor = 0;

    for (int i = 0; i < numsSize; i++)
    {
        xor ^= nums[i];
    }

    unsigned int diff = (unsigned int)xor & (-(unsigned int)xor);

    int num1 = 0, num2 = 0;

    for (int i = 0; i < numsSize; i++)
    {
        if ((nums[i] & diff) == 0)
            num1 ^= nums[i];
        else
            num2 ^= nums[i];
    }

    int *result = (int *)malloc(sizeof(int) * 2);
    result[0] = num1;
    result[1] = num2;
    *returnSize = 2;
    return result;
}

int main()
{
    int nums[] = {1, 2, 1, 3, 2, 5};
    int size = sizeof(nums) / sizeof(nums[0]);
    int returnSize;

    int *res = singleNumber(nums, size, &returnSize);

    printf("Single numbers: [%d, %d]\n", res[0], res[1]);

    free(res);
    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space compleixty is O(1)
 *
 */