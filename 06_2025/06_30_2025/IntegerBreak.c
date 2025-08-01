/**
 *
 * We must split n into at least two parts. Breaking into 3s
 * tends to give the highest product.
 *
 */

#include <stdio.h>
#include <math.h>

int integerBreak(int n)
{
    if (n == 2)
        return 1;
    if (n == 3)
        return 2;

    int result = 1;
    while (n > 4)
    {
        result *= 3;
        n -= 3;
    }

    return result * n;
}

int main()
{
    int n = 10;
    printf("Max product for %d: %d\n", n, integerBreak(n));
    return 0;
}

/**
 *
 * Time complexity is O(n/3)
 * Space complexity is O(1)
 *
 */