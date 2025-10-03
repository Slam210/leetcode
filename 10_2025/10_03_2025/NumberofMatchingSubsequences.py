"""

We need to count how many words in words are subsequences of s. To solve this efficiently, we preprocess s into a 
dictionary where each character maps to the sorted indices of its occurrences. Then, for each word, we attempt to 
match its characters in order by using binary search to find the next occurrence in s after the previous one. If every 
character in the word can be matched in order, then the word is a subsequence. By combining preprocessing and binary search, 
we avoid repeatedly scanning s for each word.

"""

from typing import List
from collections import defaultdict
import bisect

class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        pos = defaultdict(list)
        for i, ch in enumerate(s):
            pos[ch].append(i)

        def is_subsequence(word: str) -> bool:
            prev = -1
            for ch in word:
                if ch not in pos:
                    return False
                idx_list = pos[ch]
                j = bisect.bisect_right(idx_list, prev)
                if j == len(idx_list): 
                    return False
                prev = idx_list[j]
            return True

        count = 0
        for w in words:
            if is_subsequence(w):
                count += 1
        return count


if __name__ == "__main__":
    sol = Solution()
    tests = [
        ("abcde", ["a","bb","acd","ace"], 3), 
        ("dsahjpjauf", ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"], 2),
        ("abc", ["abc","ac","bc","d"], 3),
    ]
    for s, words, expected in tests:
        result = sol.numMatchingSubseq(s, words)
        print(f"s={s}, words={words} -> {result} (expected {expected})")

"""

Time complexity is O(log(|s|))
Space complexity is O(|s|)

"""