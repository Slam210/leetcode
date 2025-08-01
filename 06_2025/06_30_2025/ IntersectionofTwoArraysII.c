/**
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection.
 * We are to return each occurance of intersection, rather than the unique.
 * We can solve this by sorting both arrays and then looping through both checking for
 * equal values. We only need to move the pointer of the value less than the other. If
 * they are equal we add the value and increment both.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int compare(const void *a, const void *b)
{
    return (*(int *)a - *(int *)b);
}

int *intersect(int *nums1, int nums1Size, int *nums2, int nums2Size,
               int *returnSize)
{

    qsort(nums1, nums1Size, sizeof(int), compare);
    qsort(nums2, nums2Size, sizeof(int), compare);

    int *result = malloc(sizeof(int) * (nums1Size < nums2Size ? nums1Size : nums2Size));
    int index = 0;

    int i = 0, j = 0;

    while (i < nums1Size && j < nums2Size)
    {
        if (nums1[i] < nums2[j])
        {
            i++;
        }
        else if (nums1[i] > nums2[j])
        {
            j++;
        }
        else
        {
            result[index++] = nums1[i];
            i++;
            j++;
        }
    }

    *returnSize = index;
    return result;
}

int main()
{
    int nums1[] = {4, 9, 5};
    int nums2[] = {9, 4, 9, 8, 4};
    int returnSize = 0;

    int *result = intersect(nums1, 3, nums2, 5, &returnSize);

    printf("Intersection: ");
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
 * O(n log(n)) goes twice for both arrays since we sort them
 * Space complexity is O(min(n,m)) since at most both arrays are equal to each other
 *
 */