"""

The intuition behind this problem is to use a sliding window.
We can then have 2 sets, one for seen and repeated.
If it is in seen, then we add it to the repeated list.
Otherwise we add it to seen.
The end repeated list contains all repeated sequences.

"""

from typing import List

class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        if len(s) < 10:
            return []
        
        seen = set()
        repeated = set()
        
        for i in range(len(s) - 9):
            seq = s[i:i+10]
            if seq in seen:
                repeated.add(seq)
            else:
                seen.add(seq)
        
        return list(repeated)

if __name__ == "__main__":
    solution = Solution()
    test_cases = [
        "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",
        "AAAAAAAAAAAAA",
        "ACGTACGTACGT"
    ]
    
    for dna in test_cases:
        print(f"Repeated sequences in \"{dna}\": {solution.findRepeatedDnaSequences(dna)}")

"""

The time complexity is O(n) as we use the sliding window to go over n characters
Space complexity is O(n) as in the wost case all substrings are unique

"""