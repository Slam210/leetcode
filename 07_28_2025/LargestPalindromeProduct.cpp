/**
 *
 * The goal is to find the largest palindrome that can be written as the product of two n-digit numbers.
 * Instead of checking every pair of n-digit numbers, we generate palindrome numbers in decreasing order
 * and check if any can be factored into two n-digit numbers. We construct palindromes by reflecting a
 * half number, then test divisibility from the highest n-digit number down. This method is significantly
 * faster since the number of palindromes is much smaller than all possible products. Finally, we return
 * the result modulo 1337, as required.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

long createPalindrome(int half)
{
    long pal = half;
    int x = half;

    // Append reverse of `half` to itself to form a full palindrome
    while (x > 0)
    {
        // add last digit of x
        pal = pal * 10 + x % 10;
        // remove last digit
        x /= 10;
    }
    return pal;
}

int largestPalindrome(int n)
{
    // Tthe largest palindrome from 1-digit numbers is 9
    if (n == 1)
        return 9;

    // Define the upper and lower bounds of n-digit numbers
    int upper = pow(10, n) - 1;
    int lower = pow(10, n - 1);

    // Try generating palindromes by reflecting halves from upper down to lower
    for (int i = upper; i >= lower; i--)
    {
        long pal = createPalindrome(i);
        // Check if the palindrome can be factored into two n-digit numbers
        for (long j = upper; j * j >= pal; j--)
        {
            if (pal % j == 0)
            {
                return pal % 1337;
            }
        }
    }
    return -1;
}

int main()
{
    for (int n = 1; n <= 8; n++)
    {
        int result = largestPalindrome(n);
        printf("n = %d -> Largest Palindrome mod 1337 = %d\n", n, result);
    }
    return 0;
}

/**
 *
 * Time complexity is O(10^n)
 * Space complexity is O(1)
 *
 */