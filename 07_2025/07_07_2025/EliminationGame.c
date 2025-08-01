/**
 *
 * This problem involves repeatedly eliminating every other number in a list from either
 * left to right or right to left until only one number remains. Simulating the full list
 * would be inefficient, so instead we use a mathematical approach by tracking only the
 * first remaining number, the step size between remaining numbers, and the direction of
 * elimination. The key insight is that in a left-to-right pass, the first element is
 * always removed, so head must advance. In a right-to-left pass, head only advances if
 * the number of remaining elements is odd (meaning it gets removed); otherwise, it stays.
 * After each pass, the gap between surviving elements doubles, so we update the step
 * accordingly. This depth-aware, direction-sensitive update allows us to efficiently
 * find the last remaining number in O(log n) time without simulating the entire list.
 *
 */

#include <stdio.h>

int lastRemaining(int n)
{
    int head = 1;
    int step = 1;
    int remaining = n;
    int leftToRight = 1;

    while (remaining > 1)
    {
        if (leftToRight || remaining % 2 == 1)
        {
            head += step;
        }
        step *= 2;
        remaining /= 2;
        leftToRight = !leftToRight;
    }

    return head;
}

int main()
{
    int n = 9;
    printf("Last remaining number for n = %d is: %d\n", n, lastRemaining(n));
    return 0;
}

/**
 *
 * Run time is O(log(n))
 * Space complexity is O(1)
 *
 */