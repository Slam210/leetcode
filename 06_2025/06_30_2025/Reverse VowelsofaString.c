/**
 *
 * Given a string, reverse the vowels. We can solve this using a two pointer approach.
 * We move each pointer to the next avaiblible vowel and then swap them, making sure that
 * we stay within bounds.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int isVowel(char c)
{
    c = tolower(c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

char *reverseVowels(char *s)
{
    int left = 0;
    int right = strlen(s) - 1;

    while (left < right)
    {
        while (left < right && !isVowel(s[left]))
            left++;
        while (left < right && !isVowel(s[right]))
            right--;

        if (left < right)
        {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }

    return s;
}

int main()
{
    char input[] = "hello";
    printf("Original: %s\n", input);
    char *result = reverseVowels(input);
    printf("After vowel reversal: %s\n", result);
    return 0;
}
