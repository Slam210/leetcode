/*

THe intuition behind this problem is that the majority element appears n/2 times
This means that if we use a counter to track the most popular element up to n index
the majority element will eventually become the main candidate

*/

#include <stdio.h>

int majorityElement(int *nums, int numsSize)
{
    int count = 0;
    int candidate = 0;

    for (int i = 0; i < numsSize; i++)
    {
        if (count == 0)
        {
            candidate = nums[i];
        }

        if (nums[i] == candidate)
        {
            count++;
        }
        else
        {
            count--;
        }
    }

    return candidate;
}

int main()
{
    int nums[] = {2, 2, 1, 1, 1, 2, 2};
    int size = sizeof(nums) / sizeof(nums[0]);
    int result = majorityElement(nums, size);
    printf("Majority element: %d\n", result);
    return 0;
}

/*

Run time is O(n) as we do one iteration over the loop
Space complexity is O(1) as we only create an extra variable

*/