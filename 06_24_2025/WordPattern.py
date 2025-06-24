"""

We are asked to detemine if we can map every word in s to a specific letter in
pattern such that we can fully replace s with the pattern and have the same meaning
through the use of a map. We can solve this be splitting s into s, and using
2 sets to mainting the relationship between words. For each letter and word, we check
if we've already used it and check if the word is the same. Else we can add it to both sets
to reference in the future.

"""

class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(pattern) != len(words):
            return False
        char_to_word = {}
        word_to_char = {}
        for c,w in zip(pattern, words):
            if c in char_to_word:
                if char_to_word[c] != w:
                    return False
            else:
                if w in word_to_char:
                    return False
                char_to_word[c] = w
                word_to_char[w] = c
        return True

if __name__ == "__main__":
    sol = Solution()
    print(sol.wordPattern("abba", "dog cat cat dog"))
    print(sol.wordPattern("abba", "dog cat cat fish"))

"""

Run complexity is O(n)
Space complexity is O(n)

"""