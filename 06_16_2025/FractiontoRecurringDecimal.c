/*

The intuition behind this problem is to perform long division step-by-step,
calculating the integer (whole number) portion first.
To handle the decimal portion, we simulate the division by repeatedly multiplying the remainder by 10
and dividing by the denominator. To detect repeating decimals,
we use a hash table (or hash map) to store the positions of previously seen remainders.
If a remainder repeats, it means the digits from the first occurrence of that remainder to the current position
form a repeating cycle, so we insert parentheses around this repeating part.
Otherwise, we continue until the remainder becomes zero, indicating the decimal terminates.
This approach avoids floating-point precision issues and efficiently detects repeating decimal sequences.

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

#define HASH_SIZE 100003

typedef struct HashNode
{
    long key;
    int value;
} HashNode;

int getHashIndex(long key)
{
    return key % HASH_SIZE;
}

void insert(HashNode *map, long key, int value)
{
    int idx = getHashIndex(key);
    while (map[idx].key != -1 && map[idx].key != key)
    {
        idx = (idx + 1) % HASH_SIZE;
    }
    map[idx].key = key;
    map[idx].value = value;
}

int search(HashNode *map, long key)
{
    int idx = getHashIndex(key);
    while (map[idx].key != -1)
    {
        if (map[idx].key == key)
            return map[idx].value;
        idx = (idx + 1) % HASH_SIZE;
    }
    return -1;
}

char *fractionToDecimal(int numerator, int denominator)
{
    if (numerator == 0)
        return strdup("0");

    char *result = malloc(10000);
    int pos = 0;

    if ((numerator < 0) ^ (denominator < 0))
        result[pos++] = '-';

    long num = llabs((long)numerator);
    long den = llabs((long)denominator);

    pos += sprintf(result + pos, "%ld", num / den);

    long rem = num % den;
    if (rem == 0)
    {
        result[pos] = '\0';
        return result;
    }

    result[pos++] = '.';

    HashNode *map = malloc(sizeof(HashNode) * HASH_SIZE);
    for (int i = 0; i < HASH_SIZE; i++)
    {
        map[i].key = -1;
        map[i].value = -1;
    }

    while (rem != 0)
    {
        int found = search(map, rem);
        if (found != -1)
        {
            int insertPos = found;
            memmove(result + insertPos + 1, result + insertPos, pos - insertPos + 1);
            result[insertPos] = '(';
            pos++;
            result[pos++] = ')';
            result[pos] = '\0';
            free(map);
            return result;
        }

        insert(map, rem, pos);
        rem *= 10;
        result[pos++] = (rem / den) + '0';
        rem %= den;
    }

    result[pos] = '\0';
    free(map);
    return result;
}
int main()
{
    int numerator = 1, denominator = 214748364;
    char *res = fractionToDecimal(numerator, denominator);
    printf("Result: %s\n", res);
    free(res);

    return 0;
}

/*

Time complexity is O(n) as we only iterate through the n digtis once, even in repeating cases
Space complexity is O(n) as we only store the resulting string + hash table size

*/