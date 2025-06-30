/**
 *
 * The intuition behind the code is to manually simulate a frequency map without using
 * data structures like hash tables. The idea is to iterate through the input
 * array and keep track of how many times each unique number appears using an array of
 * Freq structs. For each number, we search the frequency array to check if it has already
 * been seen—if so, we increment its count; otherwise, we add it as a new entry. Once
 * we have built the full list of frequencies, we sort it in descending order based on count
 * so that the most frequent elements come first. Finally, we extract the top k elements
 * from this sorted list and return their values as the result.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct
{
    int num;
    int count;
} Freq;

int cmp(const void *a, const void *b)
{
    return ((Freq *)b)->count - ((Freq *)a)->count;
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *topKFrequent(int *nums, int numsSize, int k, int *returnSize)
{
    Freq *freqArr = malloc(numsSize * sizeof(Freq));
    int freqSize = 0;

    for (int i = 0; i < numsSize; i++)
    {
        int found = 0;
        for (int j = 0; j < freqSize; j++)
        {
            if (freqArr[j].num == nums[i])
            {
                freqArr[j].count++;
                found = 1;
                break;
            }
        }
        if (!found)
        {
            freqArr[freqSize].num = nums[i];
            freqArr[freqSize].count = 1;
            freqSize++;
        }
    }

    qsort(freqArr, freqSize, sizeof(Freq), cmp);

    int *result = malloc(sizeof(int) * k);
    for (int i = 0; i < k; i++)
    {
        result[i] = freqArr[i].num;
    }

    free(freqArr);
    *returnSize = k;
    return result;
}

int main()
{
    int nums[] = {1, 1, 1, 2, 2, 3};
    int k = 2;
    int returnSize;

    int *result = topKFrequent(nums, 6, k, &returnSize);
    printf("Top %d frequent elements:\n", k);
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
 * Space time is O(n * m * log(m)) where m is the number m unique elemnts
 * Space complexity is O(m)
 *
 */