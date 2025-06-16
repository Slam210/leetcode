/*

The intuition behind this problem is that we cannot sort the array as that is n log(n) time.
Therefore, we can perform a bucket sort to determine the max gap between the min and max of each bucket
This is because we can evenly divide the array into buckets, assign each value in the array to it's respective bucket
and find the maximum gap by taking the max of one bucket and comparing it to the min of the next bucket.

*/

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int maximumGap(int *nums, int numsSize)
{
    if (numsSize < 2)
        return 0;

    int minVal = nums[0];
    int maxVal = nums[0];
    for (int i = 1; i < numsSize; i++)
    {
        if (nums[i] < minVal)
            minVal = nums[i];
        if (nums[i] > maxVal)
            maxVal = nums[i];
    }
    if (minVal == maxVal)
        return 0;

    int bucketSize = (maxVal - minVal) / (numsSize - 1);
    if ((maxVal - minVal) % (numsSize - 1) != 0)
        bucketSize++;
    int bucketCount = (maxVal - minVal) / bucketSize + 1;

    int *bucketMin = malloc(sizeof(int) * bucketCount);
    int *bucketMax = malloc(sizeof(int) * bucketCount);
    char *bucketUsed = calloc(bucketCount, sizeof(char));

    for (int i = 0; i < bucketCount; i++)
    {
        bucketMin[i] = INT_MAX;
        bucketMax[i] = INT_MIN;
    }

    for (int i = 0; i < numsSize; i++)
    {
        int idx = (nums[i] - minVal) / bucketSize;
        if (!bucketUsed[idx])
        {
            bucketUsed[idx] = 1;
            bucketMin[idx] = nums[i];
            bucketMax[idx] = nums[i];
        }
        else
        {
            if (nums[i] < bucketMin[idx])
                bucketMin[idx] = nums[i];
            if (nums[i] > bucketMax[idx])
                bucketMax[idx] = nums[i];
        }
    }

    int prevMax = minVal;
    int maxGap = 0;

    for (int i = 0; i < bucketCount; i++)
    {
        if (!bucketUsed[i])
            continue;
        int gap = bucketMin[i] - prevMax;
        if (gap > maxGap)
            maxGap = gap;
        prevMax = bucketMax[i];
    }

    free(bucketMin);
    free(bucketMax);
    free(bucketUsed);
    return maxGap;
}

int main()
{
    int nums[] = {3, 6, 9, 1};
    int size = sizeof(nums) / sizeof(nums[0]);
    int result = maximumGap(nums, size);
    printf("Maximum Gap: %d\n", result);
    return 0;
}

/*

Run time is O(n) as we do multiple single iterations of the array
Space complexity is O(n) as we only use array for storage

*/