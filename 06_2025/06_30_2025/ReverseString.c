/**
 *
 * Given an array representing a string, reverse the string in place using O(1) memory.
 * We can solve this problem using left and right pointers alongside a temp varibale.
 */

#include <stdio.h>

void reverseString(char *s, int sSize)
{
    int left = 0;
    int right = sSize - 1;

    while (left < sSize / 2)
    {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

int main()
{
    char s[] = {'h', 'e', 'l', 'l', 'o'};
    int size = sizeof(s) / sizeof(s[0]);

    reverseString(s, size);

    for (int i = 0; i < size; i++)
    {
        printf("%c", s[i]);
    }
    printf("\n");

    return 0;
}

/**
 *
 * Run time is O(1)
 * Space time is O(1)
 *
 */