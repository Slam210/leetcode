/**
 *
 * Given an integer array nums, return the third distinct maximum number. If it doesn't exist,
 * return the maximum number instead. We need to find the three largest distinct numbers in the 
 * array. This is not just the third largest number, but the third distinct largest. We can track 
 * the top 3 unique numbers. We can do this by keeping three variables first, second, third 
 * initialized appropriately and updating them as we go through the array.
 *
 */

#include <stdio.h>
#include <limits.h>

int thirdMax(int *nums, int numsSize)
{
    long first = LONG_MIN, second = LONG_MIN, third = LONG_MIN;

    for (int i = 0; i < numsSize; i++)
    {
        int num = nums[i];

        if (num == first || num == second || num == third)
            continue;

        if (num > first)
        {
            third = second;
            second = first;
            first = num;
        }
        else if (num > second)
        {
            third = second;
            second = num;
        }
        else if (num > third)
        {
            third = num;
        }
    }

    return (third == LONG_MIN) ? first : (int)third;
}

int main()
{
    int nums[] = {2, 2, 3, 1};
    int size = sizeof(nums) / sizeof(nums[0]);

    int result = thirdMax(nums, size);
    printf("Third maximum (or max if <3 distinct): %d\n", result);

    return 0;
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(1)
 * 
 */