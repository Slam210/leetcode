/**
 *
 * The intuition behind converting an integer to English words is to break the number down
 * into manageable parts—specifically, groups of three digits starting from the right,
 * as English naming conventions follow this pattern. Each group is translated
 * individually into words based on well-defined rules. Numbers below 20 have unique
 * names, tens follow a pattern, and hundreds are expressed by prefixing the corresponding digit with "Hundred".
 * After converting each group, the appropriate scale label is appended depending on its position.
 * By processing and combining these groups in order, we construct a full English representation of the number.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *below_20[] = {
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"};

char *tens[] = {
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};

char *thousands[] = {
    "", "Thousand", "Million", "Billion"};

void helper(int num, char *buffer)
{
    if (num == 0)
        return;
    if (num < 20)
    {
        strcat(buffer, below_20[num]);
        strcat(buffer, " ");
    }
    else if (num < 100)
    {
        strcat(buffer, tens[num / 10]);
        strcat(buffer, " ");
        helper(num % 10, buffer);
    }
    else
    {
        strcat(buffer, below_20[num / 100]);
        strcat(buffer, " Hundred ");
        helper(num % 100, buffer);
    }
}

char *numberToWords(int num)
{
    if (num == 0)
    {
        char *zero = malloc(5);
        strcpy(zero, "Zero");
        return zero;
    }

    char *result = malloc(512);
    result[0] = '\0';

    int i = 0;

    while (num > 0)
    {
        if (num % 1000 != 0)
        {
            char temp[128] = "";
            helper(num % 1000, temp);
            if (strlen(thousands[i]) > 0)
            {
                strcat(temp, thousands[i]);
                strcat(temp, " ");
            }
            strcat(temp, result);
            strcpy(result, temp);
        }
        num /= 1000;
        i++;
    }

    int len = strlen(result);
    if (len > 0 && result[len - 1] == ' ')
        result[len - 1] = '\0';

    return result;
}

int main()
{
    int num = 1234567;
    char *words = numberToWords(num);
    printf("%s\n", words);
    free(words);
    return 0;
}

/**
 *
 * Run time is O(log(n))
 * Space complexity is O(1)
 *
 */