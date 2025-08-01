/**
 *
 * The intuition is to start by generating odd and even length palindroms.
 * When checking each palindrom, we can check to see if the base k is a palindrome
 * and if it returns true it will add to sum.
 *
 */

#include <stdio.h>
#include <stdlib.h>

typedef long long ll;

int isBaseKPalindrome(ll num, int k)
{
    ll mul = 1;
    while (mul * k <= num)
        mul *= k;

    while (num > 0)
    {
        int msd = num / mul;
        int lsd = num % k;

        if (msd != lsd)
            return 0;

        num = (num - msd * mul - lsd) / k;
        mul /= k * k;
    }
    return 1;
}

ll createPalindrome(ll prefix, int oddLength)
{
    ll result = prefix;
    if (oddLength)
        prefix /= 10;

    while (prefix > 0)
    {
        result = result * 10 + (prefix % 10);
        prefix /= 10;
    }
    return result;
}

long long kMirror(int k, int n)
{
    ll sum = 0;
    ll prefix = 1;

    while (n > 0)
    {
        ll nextPrefix = prefix * 10;

        for (ll i = prefix; i < nextPrefix && n > 0; ++i)
        {
            ll p = createPalindrome(i, 1);
            if (isBaseKPalindrome(p, k))
            {
                sum += p;
                --n;
            }
        }

        for (ll i = prefix; i < nextPrefix && n > 0; ++i)
        {
            ll p = createPalindrome(i, 0);
            if (isBaseKPalindrome(p, k))
            {
                sum += p;
                --n;
            }
        }
        prefix = nextPrefix;
    }

    return sum;
}

int main()
{
    int k = 2;
    int n = 5;

    ll result = kMirror(k, n);
    printf("Sum of %d smallest %d-mirror numbers: %lld\n", n, k, result);

    return 0;
}

/**
 *
 * Time complexity is O(n * logk(n))
 * Space complexity is O(1)
 *
 */