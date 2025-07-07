/**
 *
 * We are given a list of events with start and end dates. We can attend any event i at
 * any day d where startTimei <= d <= endTimei. You can only attend one event at any time.
 * We are to return the maximum number of events. The intuition is the use a min-heap or
 * priority queue to always attend the event with the earliest end day. For each day we
 * add all events starting on that day to the heap. Then we remove all events that ended
 * before today. If the heap isn't empty we pop the event with the earliest end, and
 * attend it.
 *
 */

#include <stdio.h>
#include <stdlib.h>

#define MAX_DAYS 100000

int compare(const void *a, const void *b)
{
    int *ea = *(int **)a;
    int *eb = *(int **)b;
    return ea[0] - eb[0];
}

void heapifyUp(int *heap, int index)
{
    while (index > 0)
    {
        int parent = (index - 1) / 2;
        if (heap[parent] <= heap[index])
            break;
        int temp = heap[parent];
        heap[parent] = heap[index];
        heap[index] = temp;
        index = parent;
    }
}

void heapifyDown(int *heap, int size, int index)
{
    while (2 * index + 1 < size)
    {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int smallest = left;

        if (right < size && heap[right] < heap[left])
            smallest = right;

        if (heap[index] <= heap[smallest])
            break;

        int temp = heap[index];
        heap[index] = heap[smallest];
        heap[smallest] = temp;

        index = smallest;
    }
}

void pushHeap(int *heap, int *heapSize, int val)
{
    heap[*heapSize] = val;
    (*heapSize)++;
    heapifyUp(heap, *heapSize - 1);
}

int popHeap(int *heap, int *heapSize)
{
    int val = heap[0];
    heap[0] = heap[--(*heapSize)];
    heapifyDown(heap, *heapSize, 0);
    return val;
}

int maxEvents(int **events, int eventsSize, int *eventsColSize)
{
    qsort(events, eventsSize, sizeof(int *), compare);

    int heap[MAX_DAYS];
    int heapSize = 0;

    int res = 0;
    int day = 1;
    int i = 0;

    while (i < eventsSize || heapSize > 0)
    {
        while (i < eventsSize && events[i][0] == day)
        {
            pushHeap(heap, &heapSize, events[i][1]);
            i++;
        }

        while (heapSize > 0 && heap[0] < day)
        {
            popHeap(heap, &heapSize);
        }

        if (heapSize > 0)
        {
            popHeap(heap, &heapSize);
            res++;
        }

        day++;
    }

    return res;
}

int main()
{
    int arr[][2] = {{1, 2}, {2, 3}, {3, 4}};
    int *events[3];
    int colSizes[3] = {2, 2, 2};

    for (int i = 0; i < 3; i++)
    {
        events[i] = arr[i];
    }

    int result = maxEvents(events, 3, colSizes);
    printf("Maximum number of events attended: %d\n", result);
    return 0;
}

/**
 *
 * Time complexity is O(n log(n)) due to having to sort
 * Space complexity is O(n) for the heap in the worst case, otherwise O(1)
 *
 */