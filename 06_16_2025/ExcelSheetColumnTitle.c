/*

The intuition behind this problem is that each addidional number is similar to base
26 so we can perform conversion like we would with other forms. We can mod the number by 26
to get the remainder which will get the leading values. Repeat till we have the whole title
and reverse to get the resulting string.

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *convertToTitle(int columnNumber)
{
    char *result = malloc(16 * sizeof(char));
    int index = 0;

    while (columnNumber > 0)
    {
        columnNumber--;
        int remainder = columnNumber % 26;
        result[index++] = 'A' + remainder;
        columnNumber /= 26;
    }

    for (int i = 0; i < index / 2; i++)
    {
        char temp = result[i];
        result[i] = result[index - i - 1];
        result[index - i - 1] = temp;
    }

    result[index] = '\0';
    return result;
}

int main()
{
    int columnNumber = 705;
    char *title = convertToTitle(columnNumber);
    printf("Excel Column Title: %s\n", title);
    free(title);
    return 0;
}

/*

Run time is O(log(n)) with base 26 since the loop continues with that format
Space complexity of O(log(n)) with base 26

*/