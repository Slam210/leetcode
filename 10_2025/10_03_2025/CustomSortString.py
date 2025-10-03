"""

We want to reorder string s according to the custom sequence defined in order. 
To do this, we count how many times each character appears in s, then systematically build a new string. 
First we place the characters that appear in order, in that exact order and with their full frequency, and 
finally we add the remaining characters that are not in order. This guarantees that the result follows the 
custom order while keeping all characters from s.

"""

from collections import Counter

class Solution:
    def customSortString(self, order: str, s: str) -> str:
        count = Counter(s)
        result = []

        for ch in order:
            if ch in count:
                result.append(ch * count[ch])
                del count[ch]

        for ch, freq in count.items():
            result.append(ch * freq)

        return "".join(result)


if __name__ == "__main__":
    sol = Solution()
    tests = [
        ("cba", "abcd", "cbad"), 
        ("bcafg", "abcd", "bcad"), 
        ("", "abc", "abc"),      
        ("abc", "abc", "abc"),    
    ]
    for order, s, expected in tests:
        result = sol.customSortString(order, s)
        print(f"order={order}, s={s} -> {result}")

"""

Time complexity is O(|s| + |order|)
Space complexity is O(|s|)

"""