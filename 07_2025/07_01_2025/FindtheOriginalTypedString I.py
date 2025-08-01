"""

We are given a string word which represents the final output. We are to calculate the
possible strings assuming every duplicate letter may have been a mistype. The idea behind
this problem is to realize that every duplicate character may be error. So we can iterate through
the string, checking for duplicates and adding one at the end for the idea that the whole string 
was intentional.


"""

class Solution:
    def possibleStringCount(self, word: str) -> int:
        if not word:
            return 1

        count = 0
        i = 1
        while i < len(word):
            if word[i] == word[i - 1]:
                count += 1
                i += 1
            else:
                i += 1

        return count + 1    

if __name__ == "__main__":
    solution = Solution()
    test_cases = ["aabb", "abc", "aabbccc", "aaaa", "a"]
    for word in test_cases:
        print(f"Word: {word} -> Possible Original Strings: {solution.possibleStringCount(word)}")

"""

Time complexity is O(n)
Space complexity is O(1)

"""