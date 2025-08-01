"""

We're given a string s of uppercase English letters and an integer k which represents the maximum 
number of changes you can make to any characters. You can change at most k characters in a 
substring so that all the characters in that substring become the same. Our task is to return the 
length of the longest such substring. We want to find the longest substring where at most k 
characters can be changed to match the most frequent character in the window. The key idea is 
that in a window of size window_size, if the most frequent character count is max_count, then 
the number of changes needed is window_size - max_count. We can maintain a sliding window with 
two pointers left and right. We then track the frequency of characters in the current window. If 
(right - left + 1) - max_count > k, it means we need more than k changes  so we shrink the window. 
Otherwise, expand the window and update the answer.

"""

from collections import defaultdict

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = defaultdict(int)
        max_count = 0
        left = 0
        result = 0

        for right in range(len(s)):
            count[s[right]] += 1
            max_count = max(max_count, count[s[right]])

            if (right - left + 1) - max_count > k:
                count[s[left]] -= 1
                left += 1

            result = max(result, right - left + 1)

        return result


def main():
    solution = Solution()
    print(solution.characterReplacement("ABAB", 2))      
    print(solution.characterReplacement("AABABBA", 1))   
    print(solution.characterReplacement("AAAA", 2))      
    print(solution.characterReplacement("ABCDE", 1))    

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(1)

"""