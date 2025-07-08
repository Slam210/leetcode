"""

We are given a list of integers where each integer represents a byte. The goal is to check 
whether the sequence of bytes is a valid UTF-8 encoded string. A character in UTF-8 encoding 
can be from 1 to 4 bytes, and must follow strict bit-pattern rules for its structure. A 1-byte 
character starts with a 0 followed by 7 data bits → 0xxxxxxx.A multi-byte character a leading 
byte starting with n ones followed by a 0 sucg 110xxxxx for 2 bytes. The following (n - 1) bytes
must start with 10 continuation bytes → 10xxxxxx. So the logic becomes to Rrad the first byte 
and determine how many bytes the character should be. Check that the next (n-1) bytes follow 
the 10xxxxxx pattern. Repeat for the rest of the array.

"""

from typing import List

class Solution:
    def validUtf8(self, data: List[int]) -> bool:
        def count_leading_ones(byte: int) -> int:
            count = 0
            for i in range(7, -1, -1):
                if (byte >> i) & 1:
                    count += 1
                else:
                    break
            return count
        
        i = 0
        n = len(data)
        while i < n:
            first_byte = data[i]
            num_bytes = count_leading_ones(first_byte)
            
            if num_bytes == 0:
                i += 1
                continue
            
            if num_bytes == 1 or num_bytes > 4:
                return False  

            if i + num_bytes > n:
                return False

            for j in range(1, num_bytes):
                if (data[i + j] & 0b11000000) != 0b10000000:
                    return False
            
            i += num_bytes 

        return True

def main():
    sol = Solution()
    test_cases = [
        ([197, 130, 1], True),       
        ([235, 140, 4], False),       
        ([0], True),                  
        ([255], False),              
        ([240, 162, 138, 147], True),
        ([240, 162, 138], False),     
    ]

    for data, expected in test_cases:
        result = sol.validUtf8(data)
        print(f"Input: {data} → Output: {result} (Expected: {expected})")

if __name__ == "__main__":
    main()

"""

Time complexity is O(n) as each byte is visited once
Space complexity is O(1)

"""