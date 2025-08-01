#include <stdio.h>

int findComplement(int num)
{
    if (num == 0)
    {
        return 1;
    }
    int mask = 0, temp = num;
    while (temp > 0)
    {
        mask = (mask << 1) | 1;
        temp >>= 1;
    }

    int result = mask ^ num;
    return result;
}

int main()
{
    int num;
    printf("Enter an integer: ");
    scanf("%d", &num);

    int complement = findComplement(num);
    printf("The complement of %d is: %d\n", num, complement);

    return 0;
}