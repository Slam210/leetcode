/**
 *
 * Given a string s, find the first non-repeating character in it and return its index.
 * If it does not exist, return -1. The intuition is to realize that we can use a two pass
 * approach to solving this problem. We can initially make a pass to build a frequency
 * array with the second pass returning the first unique index.
 *
 */

#include <stdio.h>
#include <string.h>

int firstUniqChar(char *s)
{
    int count[26] = {0};

    for (int i = 0; s[i] != '\0'; i++)
    {
        count[s[i] - 'a']++;
    }

    for (int i = 0; s[i] != '\0'; i++)
    {
        if (count[s[i] - 'a'] == 1)
        {
            return i;
        }
    }

    return -1;
}

int main()
{
    char s[] = "leetcode";
    int index = firstUniqChar(s);

    if (index != -1)
    {
        printf("First unique character is '%c' at index %d\n", s[index], index);
    }
    else
    {
        printf("No unique character found.\n");
    }

    return 0;
}

/**
 *
 * Run time is O(n)
 * Space complexity is O(1)
 *
 */