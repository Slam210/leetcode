"""

We're given a jumbled string s containing the characters from the English names of digits, and 
we need to decode and return the digits in ascending order. Each digit may appear multiple times, 
and all digits' letters are guaranteed to be present in a valid way. Each digit word has unique 
identifying characters. These characters do not appear in any other digit words, so we can count 
them first. After removing those, the other digits become uniquely identifiable too.

"""

from collections import Counter

class Solution:
    def originalDigits(self, s: str) -> str:
        count = Counter(s)
        digit_count = [0] * 10

        # Unique letters for certain digits
        digit_count[0] = count['z']  
        digit_count[2] = count['w']  
        digit_count[4] = count['u']  
        digit_count[6] = count['x']  
        digit_count[8] = count['g']

        # These depend on the removal of above
        digit_count[3] = count['h'] - digit_count[8]  
        digit_count[5] = count['f'] - digit_count[4]  
        digit_count[7] = count['s'] - digit_count[6] 
        digit_count[1] = count['o'] - digit_count[0] - digit_count[2] - digit_count[4]
        digit_count[9] = count['i'] - digit_count[5] - digit_count[6] - digit_count[8]

        result = ''.join(str(i) * digit_count[i] for i in range(10))
        return result


def main():
    solution = Solution()
    print(solution.originalDigits("owoztneoer"))
    print(solution.originalDigits("fviefuro"))    

if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(1)

"""