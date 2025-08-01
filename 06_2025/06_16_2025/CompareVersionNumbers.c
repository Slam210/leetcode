/*

The intuition behind this problem is that each number is seperated by a .
Therfore, we can use a helper function to find each value and compare them one at a time
Should one be greater than the other, than we have our result

*/

#include <stdio.h>

int getNextRevision(char **version)
{
    char *v = *version;
    int val = 0;

    while (*v && *v != '.')
    {
        val = val * 10 + ((*v - '0'));
        v++;
    }

    *version = (*v == '.' ? v + 1 : v);
    return val;
}

int compareVersion(char *version1, char *version2)
{
    while (*version1 || *version2)
    {
        int num1 = (*version1) ? getNextRevision(&version1) : 0;
        int num2 = (*version2) ? getNextRevision(&version2) : 0;

        if (num1 < num2)
            return -1;
        if (num1 > num2)
            return 1;
    }
    return 0;
}

int main()
{
    char v1[] = "1.0.1";
    char v2[] = "1";

    int result = compareVersion(v1, v2);
    printf("Comparison result: %d\n", result);

    return 0;
}

/*

Run time is O( n + m ) where n and m are the lengths
Space complexity is O(1) since we use constant extra space

*/