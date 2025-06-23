/**
 *
 * The idea is if you keep dividing n by 2, 3, and 5 as long
 * as it's divisible by them, and what remains is 1, then n is
 * an ugly number.
 *
 */

#include <stdio.h>
#include <stdbool.h>

bool isUgly(int n)
{
    if (n <= 0)
        return false;

    while (n % 2 == 0)
        n /= 2;
    while (n % 3 == 0)
        n /= 3;
    while (n % 5 == 0)
        n /= 5;

    return n == 1;
}

int main()
{
    int testValues[] = {6, 8, 14, 1, 0, -5, 30, 7};
    int size = sizeof(testValues) / sizeof(testValues[0]);

    for (int i = 0; i < size; i++)
    {
        int n = testValues[i];
        printf("Is %d an ugly number? %s\n", n, isUgly(n) ? "Yes" : "No");
    }

    return 0;
}

/**
 *
 * Run time is O(log(n))
 * Space time is O(1)
 *
 */