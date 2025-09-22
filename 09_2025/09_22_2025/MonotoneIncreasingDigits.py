"""

We want to construct the largest valid monotone increasing number less than or equal to n. 
To do this, we look at the digits of n from left to right and find where the monotone property fails. 
Once found, we decrease the violating digit by one and make all digits to the right into 9s. 
If the decrease causes new violations earlier, we backtrack and adjust those digits as well. 
This method ensures we end up with the biggest number possible that still respects monotone increasing digits.

"""

class Solution:
    def monotoneIncreasingDigits(self, n: int) -> int:
        digits = list(str(n))
        length = len(digits)
        
        i = 0
        while i < length - 1 and digits[i] <= digits[i+1]:
            i += 1
        
        if i < length - 1:
            while i > 0 and digits[i] > digits[i+1]:
                digits[i] = str(int(digits[i]) - 1)
                i -= 1
            digits[i] = str(int(digits[i]) - 1)
            for j in range(i+1, length):
                digits[j] = '9'
        return int("".join(digits))
    
def main():
    sol = Solution()
    tests = [
        (10, 9),
        (1234, 1234),
        (332, 299),
        (987654, 899999),
        (120, 119),
    ]

    for n, expected in tests:
        result = sol.monotoneIncreasingDigits(n)
        print(f"n = {n}\n -> result = {result}    expected = {expected}\n")


if __name__ == "__main__":
    main()

"""

Time complexity is O(d) where d is the number of digits in n
Space complexity is O(d) in order to store the digit list

"""