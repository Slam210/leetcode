/**
 *
 * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n),
 * ans[i] is the number of 1's in the binary representation of i. The idea is to realize that
 * if n is even, then there are the same number of 1's as n/2. If it is odd, then it is the amount +1.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *countBits(int n, int *returnSize)
{
    int *ans = (int *)malloc((n + 1) * sizeof(int));
    ans[0] = 0;

    for (int i = 1; i <= n; i++)
    {
        ans[i] = ans[i >> 1] + (i & 1);
    }

    *returnSize = n + 1;
    return ans;
}

int main()
{
    int returnSize;
    int n = 5;

    int *result = countBits(n, &returnSize);

    printf("Bit counts from 0 to %d:\n", n);
    for (int i = 0; i < returnSize; i++)
    {
        printf("%d ", result[i]);
    }
    printf("\n");

    free(result);
    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */