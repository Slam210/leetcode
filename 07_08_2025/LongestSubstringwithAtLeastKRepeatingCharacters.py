"""

Given a string s and an integer k, return the length of the longest substring where every 
character appears at least k times. If no such substring exists, return 0. If a character 
occurs fewer than k times, then it can’t be part of any valid substring. We use this character 
as a split point where we break the string into chunks around it and recurse on each chunk.
If all characters in the string occur at least k times, then the entire string is valid.

"""

from collections import Counter

class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        if (len(s) < k):
            return 0
        
        count = Counter(s)
        
        if (all(count[c] >= k for c in s)):
            return len(s)
        
        for i, char in enumerate(s):
            if (count[char] < k):
                left = self.longestSubstring(s[:i],k)
                right = self.longestSubstring(s[i+1:],k)
                return max(left, right)
        
        return 0

def main():
    sol = Solution()
    test_cases = [
        ("aaabb", 3),      
        ("ababbc", 2),
        ("abcdef", 2),    
        ("aaabbb", 3),  
    ]

    for s, k in test_cases:
        print(f"Input: s = '{s}', k = {k} → Output:", sol.longestSubstring(s, k))

if __name__ == "__main__":
    main()
    
"""

Time complexity is O(n^2) in the worst case if the string splits remove only one character
Space complexity is O(n) for recursive stack and charcter counts per call

"""