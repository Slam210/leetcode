/**
 *
 * This is a divide and conquer problem. Every operator in the expression can be a splitting point.
 * For each split recursively solve the left and right substrings. Combine the results using the
 * current operator. Base case is ff the expression is a single number, return that number.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int *compute(char *expression, int *returnSize)
{
    int capacity = 8;
    int *results = (int *)malloc(sizeof(int) * 1000);
    int resultCount = 0;
    int len = strlen(expression);

    int isNumber = 1;
    for (int i = 0; i < len; i++)
    {
        if (expression[i] == '+' || expression[i] == '-' || expression[i] == '*')
        {
            isNumber = 0;
            break;
        }
    }

    if (isNumber)
    {
        results[0] = atoi(expression);
        *returnSize = 1;
        return results;
    }

    for (int i = 0; i < len; i++)
    {
        char ch = expression[i];
        if (ch == '+' || ch == '-' || ch == '*')
        {
            char left[100], right[100];
            strncpy(left, expression, i);
            left[i] = '\0';
            strcpy(right, expression + i + 1);

            int leftSize, rightSize;
            int *leftResults = compute(left, &leftSize);
            int *rightResults = compute(right, &rightSize);

            for (int l = 0; l < leftSize; l++)
            {
                for (int r = 0; r < rightSize; r++)
                {
                    int val;
                    if (ch == '+')
                        val = leftResults[l] + rightResults[r];
                    else if (ch == '-')
                        val = leftResults[l] - rightResults[r];
                    else
                        val = leftResults[l] * rightResults[r];

                    if (resultCount >= capacity)
                    {
                        capacity *= 2;
                        results = realloc(results, sizeof(int) * capacity);
                        if (!results)
                        {
                            fprintf(stderr, "Memory allocation failed\n");
                            exit(EXIT_FAILURE);
                        }
                    }
                    results[resultCount++] = val;
                }
            }

            free(leftResults);
            free(rightResults);
        }
    }

    *returnSize = resultCount;
    return results;
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int *diffWaysToCompute(char *expression, int *returnSize)
{
    return compute(expression, returnSize);
}

int main()
{
    char expr[] = "2*3-4*5";
    int returnSize;
    int *result = diffWaysToCompute(expr, &returnSize);

    printf("Results: ");
    for (int i = 0; i < returnSize; i++)
    {
        printf("%d ", result[i]);
    }
    printf("\n");

    free(result);
    return 0;
}

/**
 *
 * Time complexity is O(2^n)
 * Space complexity is O(2^n)
 *
 */