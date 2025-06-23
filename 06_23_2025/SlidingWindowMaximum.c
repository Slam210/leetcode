/**
 *
 * The intuition behind the sliding window maximum algorithm is to efficiently track the
 * largest element within a moving window of size k as it slides across the array.
 * Rather than scanning all k elements in each window, we maintain a deque that stores indices
 * of potential maximum elements in decreasing order of their values. As we move the window forward,
 * we discard indices that fall out of the window's left side, and also remove smaller elements from
 * the back of the deque since they can never be the maximum as long as the current element is larger.
 * The front of the deque always holds the index of the current window's maximum, which we record once
 * the window is fully formed.
 *
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *maxSlidingWindow(int *nums, int numsSize, int k, int *returnSize)
{
    int *res = (int *)malloc(sizeof(int) * (numsSize - k + 1));
    int *deque = (int *)malloc(sizeof(int) * numsSize);
    int front = 0, back = -1;
    int idx = 0;

    for (int i = 0; i < numsSize; i++)
    {
        if (front <= back && deque[front] <= i - k)
            front++;

        while (front <= back && nums[deque[back]] <= nums[i])
            back--;

        deque[++back] = i;

        if (i >= k - 1)
            res[idx++] = nums[deque[front]];
    }

    *returnSize = idx;
    free(deque);
    return res;
}

/**
 *
 * Run time is O(n)
 * Space time is O(n)
 *
 */