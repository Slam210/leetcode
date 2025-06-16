/*

The product that creates a 10 is and 2 5. Because there are so many
numbers that consist of 2 as a product, we can continue to divide by
5 in order to determine how many 10s can me made. Each 10 adds a trailing
0 so our result is the total.

*/

#include <stdio.h>

int trailingZeroes(int n)
{
    int count = 0;
    while (n > 0)
    {
        n /= 5;
        count += n;
    }
    return count;
}

int main()
{
    int n = 5;
    int result = trailingZeroes(n);
    printf("Number of trailing zeroes in %d! is: %d\n", n, result);
    return 0;
}

/*

Run time is log(n) with base 5 since we divide by 5 each time
Space complexity is O(1)

*/