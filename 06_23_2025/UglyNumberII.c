/**
 *
 * Ugly numbers are build from multiplying earlier ugly numbers b2 2,3, or 5.
 * We generate them in order starting with 1, then keep track of which minimum value because the next;
 * We go until n is reached
 *
 */

#include <stdio.h>
#include <stdlib.h>

int nthUglyNumber(int n)
{
    int *ugly = (int *)malloc(sizeof(int) * n);
    ugly[0] = 1;

    int i2 = 0, i3 = 0, i5 = 0;
    int next2 = 2, next3 = 3, next5 = 5;

    for (int i = 1; i < n; i++)
    {
        int nextUgly = (next2 < next3) ? (next2 < next5 ? next2 : next5) : (next3 < next5 ? next3 : next5);

        ugly[i] = nextUgly;

        if (nextUgly == next2)
        {
            i2++;
            next2 = ugly[i2] * 2;
        }
        if (nextUgly == next3)
        {
            i3++;
            next3 = ugly[i3] * 3;
        }
        if (nextUgly == next5)
        {
            i5++;
            next5 = ugly[i5] * 5;
        }
    }

    int result = ugly[n - 1];
    free(ugly);
    return result;
}

int main()
{
    int n = 10;
    printf("The %d-th ugly number is: %d\n", n, nthUglyNumber(n));
    return 0;
}

/**
 *
 * Run time is O(n)
 * Space complexity is O(n)
 *
 */
