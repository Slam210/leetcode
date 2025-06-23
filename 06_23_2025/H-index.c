/**
 *
 * The h-index is the highest number h such that the researcher has at least h papers with h or more citations each.
 * For example, if a researcher has citation counts [3, 0, 6, 1, 5], then sorting this gives [0, 1, 3, 5, 6].
 * The h-index is 3 because there are 3 papers with at least 3 citations.
 *
 */

#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b)
{
    return (*(int *)a - *(int *)b);
}

int hIndex(int *citations, int citationsSize)
{
    qsort(citations, citationsSize, sizeof(int), compare);

    for (int i = 0; i < citationsSize; ++i)
    {
        int h = citationsSize - i;
        if (citations[i] >= h)
        {
            return h;
        }
    }
    return 0;
}

int main()
{
    int citations[] = {3, 0, 6, 1, 5};
    int size = sizeof(citations) / sizeof(citations[0]);
    int result = hIndex(citations, size);
    printf("H-Index is: %d\n", result);
    return 0;
}

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(1)
 *
 */