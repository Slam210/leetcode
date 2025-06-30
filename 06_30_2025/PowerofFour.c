/**
 *
 * Given an integer, determine if it's a power of 4. The intuition for this problem is
 * to bitmask it with a value that contains only powers of 4 such as 0x5555 which becomes
 * 0101 0101 0101 0101. Add in a couple other checks and we can confirm if the digit is a power
 * of 4 in one line.
 *
 */

#include <stdio.h>
#include <stdbool.h>

bool isPowerOfFour(int n)
{
    return n > 0 &&
           (n & (n - 1)) == 0 &&
           (n & 0x55555555) != 0;
}
int main()
{
    int nums[] = {1, 4, 8, 16, 32, 64, 256, 1024, 1073741824, 2147483647};
    int size = sizeof(nums) / sizeof(nums[0]);

    for (int i = 0; i < size; i++)
    {
        printf("%d is power of 4? %s\n", nums[i], isPowerOfFour(nums[i]) ? "true" : "false");
    }

    return 0;
}

/**
 *
 * Run time is O(1)
 * Space complexity is O(1)
 *
 */