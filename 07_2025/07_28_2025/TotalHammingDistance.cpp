/**
 *
 * We're given an array of integers nums. For every unique pair (i, j) where i < j, compute the Hamming distance
 * between nums[i] and nums[j]. Then return the sum of all these distances. The Hamming distance between two numbers
 * is the number of positions at which the corresponding bits are different. At each bit position , count how many
 * numbers have a 1 at this position and how many have a 0 at this position. Every such (0,1) pair at the same bit
 * contributes 1 to the total Hamming distance.
 *
 */

#include <cstdio>

int totalHammingDistance(int *nums, int numsSize)
{
    int total = 0;

    for (int i = 0; i < 32; i++)
    {
        int countOnes = 0;

        for (int j = 0; j < numsSize; j++)
        {
            if ((nums[j] >> i) & 1)
            {
                countOnes++;
            }
        }

        int countZeros = numsSize - countOnes;
        total += countOnes * countZeros;
    }

    return total;
}

int main()
{
    int nums[] = {4, 14, 2};
    int size = sizeof(nums) / sizeof(nums[0]);

    int result = totalHammingDistance(nums, size);
    printf("Total Hamming Distance: %d\n", result);

    return 0;
}

/**
 *
 * Time complexity is O(n) since the outer loops a set 32 times
 * Spce complexity is O(1)
 *
 */