/*

Similar to the previous problem, we know this problem can be used as a base 26 problem.
For each index, we can multiply it with 26, adding to the total sum.
We can return the final value once we reach the null character.

*/

#include <stdio.h>

int titleToNumber(char *columnTitle)
{
    int result = 0;
    for (int i = 0; columnTitle[i] != '\0'; i++)
    {
        int value = columnTitle[i] - 'A' + 1;
        result = result * 26 + value;
    }
    return result;
}

int main()
{
    char *title = "ZY";
    int number = titleToNumber(title);
    printf("Column Number: %d\n", number);
    return 0;
}

/*

Run time is O(n) since we iterate through the string once
Space complexity is O(1) since we do not create other data structures

*/