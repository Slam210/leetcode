/**
 *
 * The problem involves parsing a string that represents a hierarchical file system using
 * newline (\n) and tab (\t) characters to indicate structure. Each line is either a
 * directory or a file, and the depth of nesting is determined by the number of leading tabs.
 * The task is to find the length of the longest absolute path to any file in the system, where
 * an absolute path includes directory names and slashes (/) separating them. The intuition is to
 * simulate walking through a tree using a depth-aware approach where track the total path length
 * at each directory depth, and whenever a file is found, compute the full path length from the root
 * to that file and update the maximum if it's the longest seen so far. This avoids building an
 * explicit tree structure and ensures efficient traversal.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

int lengthLongestPath(char *input)
{
    int maxLen = 0;
    int pathLen[100] = {0};

    char *line = strtok(input, "\n");

    while (line)
    {
        int depth = 0;
        while (*line == '\t')
        {
            depth++;
            line++;
        }

        bool isFile = strchr(line, '.') != NULL;
        int nameLen = strlen(line);

        if (isFile)
        {
            int totalLen = pathLen[depth] + nameLen;
            if (totalLen > maxLen)
            {
                maxLen = totalLen;
            }
        }
        else
        {
            pathLen[depth + 1] = pathLen[depth] + nameLen + 1;
        }

        line = strtok(NULL, "\n");
    }

    return maxLen;
}

int main()
{
    char input[] = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext";
    int result = lengthLongestPath(input);
    printf("Length of longest path: %d\n", result);
    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(d)
 *
 */