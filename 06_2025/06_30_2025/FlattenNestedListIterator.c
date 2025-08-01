/**
 *
 * Tiven a list of integers, we are to implement a flattening iterator that does the following.
 * nestedIterCreate() should initializes the iterator with a nested list.
 * nestedIterHasNext() returns true if there are still itetegers left.
 * nesterdIterNext() returns the next availible integer in the flattened list
 * nestedIterFree() cleans up memory
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool NestedIntegerIsInteger(struct NestedInteger *ni);
int NestedIntegerGetInteger(struct NestedInteger *ni);
struct NestedInteger **NestedIntegerGetList(struct NestedInteger *ni);
int NestedIntegerGetListSize(struct NestedInteger *ni);

/**
 * *********************************************************************
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * *********************************************************************
 *
 * // Return true if this NestedInteger holds a single integer, rather than a nested list.
 * bool NestedIntegerIsInteger(struct NestedInteger *);
 *
 * // Return the single integer that this NestedInteger holds, if it holds a single integer
 * // The result is undefined if this NestedInteger holds a nested list
 * int NestedIntegerGetInteger(struct NestedInteger *);
 *
 * // Return the nested list that this NestedInteger holds, if it holds a nested list
 * // The result is undefined if this NestedInteger holds a single integer
 * struct NestedInteger **NestedIntegerGetList(struct NestedInteger *);
 *
 * // Return the nested list's size that this NestedInteger holds, if it holds a nested list
 * // The result is undefined if this NestedInteger holds a single integer
 * int NestedIntegerGetListSize(struct NestedInteger *);
 * };
 */

struct NestedIterator
{
    int *flatList;
    int size;
    int pos;
};

void flatten(struct NestedInteger **nestedList, int nestedListSize, int **buffer, int *size, int *capacity)
{
    for (int i = 0; i < nestedListSize; i++)
    {
        if (NestedIntegerIsInteger(nestedList[i]))
        {
            if (*size >= *capacity)
            {
                *capacity *= 2;
                *buffer = realloc(*buffer, *capacity * sizeof(int));
            }
            (*buffer)[(*size)++] = NestedIntegerGetInteger(nestedList[i]);
        }
        else
        {
            struct NestedInteger **subList = NestedIntegerGetList(nestedList[i]);
            int subSize = NestedIntegerGetListSize(nestedList[i]);
            flatten(subList, subSize, buffer, size, capacity);
        }
    }
}

struct NestedIterator *nestedIterCreate(struct NestedInteger **nestedList, int nestedListSize)
{
    struct NestedIterator *iter = malloc(sizeof(struct NestedIterator));
    iter->size = 0;
    iter->pos = 0;
    int capacity = 100;
    iter->flatList = malloc(capacity * sizeof(int));

    flatten(nestedList, nestedListSize, &(iter->flatList), &(iter->size), &capacity);
    return iter;
}

bool nestedIterHasNext(struct NestedIterator *iter)
{
    return iter->pos < iter->size;
}

int nestedIterNext(struct NestedIterator *iter)
{
    return iter->flatList[iter->pos++];
}

/** Deallocates memory previously allocated for the iterator */
void nestedIterFree(struct NestedIterator *iter)
{
    free(iter->flatList);
    free(iter);
}

/**
 * Your NestedIterator will be called like this:
 * struct NestedIterator *i = nestedIterCreate(nestedList, nestedListSize);
 * while (nestedIterHasNext(i)) printf("%d\n", nestedIterNext(i));
 * nestedIterFree(i);
 */

/**
 *
 * It takes O(n) time to flatten and requires O(n) space
 * Next / HasNext has a time/space compleity is O(1) per call
 *
 */