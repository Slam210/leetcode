/*

The intuition behind this problem is to use a two pointer search in order
find the target value. We start on the ends and adjust left or right depending
on whether or not we need the value to get smaller or larger.

*/

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */

int *twoSum(int *numbers, int numbersSize, int target, int *returnSize)
{
    int left = 0, right = numbersSize - 1;

    while (left < right)
    {
        int sum = numbers[left] + numbers[right];
        if (sum == target)
        {
            int *result = (int *)malloc(2 * sizeof(int));
            result[0] = left + 1;
            result[1] = right + 1;
            *returnSize = 2;
            return result;
        }
        else if (sum < target)
        {
            left++;
        }
        else
        {
            right--;
        }
    }

    *returnSize = 0;
    return NULL;
}

int main()
{
    int numbers[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    int *result = twoSum(numbers, sizeof(numbers) / sizeof(numbers[0]), target, &returnSize);

    if (result)
    {
        printf("Indices: [%d, %d]\n", result[0], result[1]);
        free(result);
    }

    return 0;
}

/*

Run time is O(n) as the two pointers will iterate through at most the array
Space complexity is O(1) as we do not create any extra data structures and use pointers

*/