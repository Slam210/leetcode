/*

The intuition behind this problem is that we have to solve the problem
in log(n) time which imples binary search. We can split the array and use the idea of slopes.
If the slope is negative, then the peak is to the left.
If the slope is positive, then the peak is to the right.
Since we can return any peak, this solution works for any assortment of peaks.

*/

#include <stdio.h>

int findPeakElement(int *nums, int numsSize)
{
    int left = 0;
    int right = numsSize - 1;

    while (left < right)
    {
        int mid = (left + right) / 2;
        if (nums[mid] > nums[mid + 1])
        {
            right = mid;
        }
        else
        {
            left = mid + 1;
        }
    }

    return left;
}

int main()
{
    int nums[] = {1, 6, 1, 3, 5, 2, 4};
    int size = sizeof(nums) / sizeof(nums[0]);
    int peakIndex = findPeakElement(nums, size);
    printf("Peak element index: %d\n", peakIndex);
    printf("Peak element value: %d\n", nums[peakIndex]);
    return 0;
}

/*

Run time is O(log(n)) since we perform a binary search
Space complexity is O(1) since we use constant space

*/