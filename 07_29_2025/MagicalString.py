"""

We're given an integer n, and a magical string s that is made up of only '1's and '2's. The 
string has this self-generating property that group consecutive characters in s. We count how 
many times each character occurs in each group. These counts form the string s itself. The 
goal is to return the number of '1's in the first n characters of s. We don’t need to generate 
the entire infinite magical string, just up to n characters. We build the string by maintaining 
a list of digits, starting with 1, 2, 2. A pointer i tells us how many times to repeat the next 
digit. We flip between appending 1 or 2, and repeat the flipped digit s[i] times. Stop when the 
length of the generated string reaches n.

"""

class Solution:
    def magicalString(self, n: int) -> int:
        if n == 0:
            return 0
        if n <= 3:
            return 1

        s = [1, 2, 2]
        i = 2  
        next_num = 1

        while len(s) < n:
            count = s[i]
            s.extend([next_num] * count)
            next_num = 3 - next_num  
            i += 1

        return s[:n].count(1)


def main():
    sol = Solution()
    
    n = 6
    print("Input:", n)
    print("Output:", sol.magicalString(n))  

    n = 1
    print("Input:", n)
    print("Output:", sol.magicalString(n)) 

    n = 20
    print("Input:", n)
    print("Output:", sol.magicalString(n))  

if __name__ == "__main__":
    main()
