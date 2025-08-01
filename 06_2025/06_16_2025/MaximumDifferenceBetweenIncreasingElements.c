/*

The intuition behind this problem is to not have to keep track of every pair,
We can maintain a local minimum and whenever we find a high or lower value perform two things.
The first is to check if it's the new min at that point.
The second is to check if it's the new max diffence between it and the local min.

*/

#include <stdio.h>;

int maximumDifference(int *nums, int numsSize)
{
    int minSoFar = nums[0];
    int maxDiff = -1;

    for (int i = 1; i < numsSize; i++)
    {
        if (nums[i] > minSoFar)
        {
            int diff = nums[i] - minSoFar;
            if (diff > maxDiff)
            {
                maxDiff = diff;
            }
        }
        else
        {
            minSoFar = nums[i];
        }
    }

    return maxDiff;
}

int main()
{
    int nums[] = {7, 1, 5, 4};
    int size = sizeof(nums) / sizeof(nums[0]);

    int result = maximumDifference(nums, size);
    printf("Maximum Difference: %d\n", result);
    return 0;
}

/*

Run time is O(n) as we iterate through the array once.
Space complexity is O(1) as we do not create any data structures.

*/