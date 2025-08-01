/**
 *
 * We’re given a number n, and asked to return numbers from 1 to n in lexicographical order.
 * To traverse in lexicographical order we start at 1. Go as deep as possible  If you can’t
 * go deeper, try the next sibling. If you overflow, go up until you can go right,
 * This traversal mimics DFS, which is lexicographically sorted by construction.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *lexicalOrder(int n, int *returnSize)
{
    int *result = (int *)malloc(sizeof(int) * n);
    int curr = 1;

    for (int i = 0; i < n; i++)
    {
        result[i] = curr;
        if (curr * 10 <= n)
        {
            curr *= 10;
        }
        else
        {
            while (curr % 10 == 9 || curr + 1 > n)
            {
                curr /= 10;
            }
            curr++;
        }
    }

    *returnSize = n;
    return result;
}

int main()
{
    int n = 30;
    int returnSize;
    int *result = lexicalOrder(n, &returnSize);

    printf("Lexicographical order from 1 to %d:\n", n);
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
 * Run complexity is O(n)
 * Space complexity is O(1)
 *
 */