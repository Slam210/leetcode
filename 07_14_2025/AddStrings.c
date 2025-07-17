/**
 *
 * We're given two non-negative integers represented as strings. Return their sum as a string.
 * Since we can't convert strings to numbers, the idea is to perform manual addition digit by 
 * digit, like doing it on paper.  Start from the last digit of both strings. Add digits together 
 * along with any carry from previous step. Store the result's last digit, and propagate the 
 * carry to the next addition. Continue until both strings are fully processed. If a carry 
 * remains, add it to the front. Reverse the final result string.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void reverse(char *str, int length)
{
    int left = 0, right = length - 1;
    while (left < right)
    {
        char tmp = str[left];
        str[left++] = str[right];
        str[right--] = tmp;
    }
}

char *addStrings(char *num1, char *num2)
{
    int len1 = strlen(num1);
    int len2 = strlen(num2);

    int maxLen = (len1 > len2 ? len1 : len2) + 2;
    char *result = (char *)malloc(sizeof(char) * maxLen);
    int i = len1 - 1, j = len2 - 1, k = 0, carry = 0;

    while (i >= 0 || j >= 0 || carry > 0)
    {
        int digit1 = (i >= 0) ? num1[i--] - '0' : 0;
        int digit2 = (j >= 0) ? num2[j--] - '0' : 0;
        int sum = digit1 + digit2 + carry;
        result[k++] = (sum % 10) + '0';
        carry = sum / 10;
    }

    result[k] = '\0';
    reverse(result, k);
    return result;
}

int main()
{
    char num1[] = "123";
    char num2[] = "9876";

    char *result = addStrings(num1, num2);
    printf("Sum: %s\n", result);

    free(result); 
    return 0;
}

/**
 * 
 * Time complexity is O(n)
 * Space complexity is O(n)
 * 
 */