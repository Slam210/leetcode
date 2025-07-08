"""

We're given a string encoded using the format k[encoded_string], where k is a positive integer 
and the string in the brackets should be repeated k times. Our task is to decode the string and
return the original version. A stack is ideal because it lets us handle nested contexts cleanly
as we can use one stack to track repeat counts and another to track partial results.

"""

class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        curr_str = ""
        curr_num = 0
        
        for char in s:
            if char.isdigit():
                curr_num = curr_num * 10 + int(char)
            elif char == "[":
                stack.append((curr_str, curr_num))
                curr_str = ""
                curr_num = 0
            elif char == "]":
                prev_str, repeat = stack.pop()
                curr_str = prev_str + curr_str * repeat
            else:
                curr_str += char
        
        return curr_str

def main():
    sol = Solution()
    test_cases = [
        "3[a]2[bc]",         
        "3[a2[c]]",          
        "2[abc]3[cd]ef",    
        "10[a]",             
        "3[z]2[2[y]pq4[2[jk]e1[f]]]ef"
    ]

    for s in test_cases:
        print(f"Input: '{s}' → Output: '{sol.decodeString(s)}'")

if __name__ == "__main__":
    main()
    
"""

Time complexity is O(n)
Space complexity is O(n)

"""