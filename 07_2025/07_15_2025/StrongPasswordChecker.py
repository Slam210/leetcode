"""

To ensure a password is strong, it must be the correct length, include at least one lowercase 
letter, one uppercase letter, and one digit, and avoid having three or more repeating characters 
in a row. The key to fixing a weak password efficiently is recognizing that we can insert, delete, 
or replace characters, and the best strategy depends on the password's length. If it's too short, 
we focus on insertions and missing character types; if it's within range, we prioritize replacing
repeated sequences and adding missing types; and if it's too long, we first delete excess characters
especially from repeating sequences to minimize replacements—then fix any remaining issues. 
The goal is to use the fewest operations to satisfy all conditions.

"""

class Solution:
    def strongPasswordChecker(self, password: str) -> int:
        n = len(password)
        
        # Check for missing character types
        has_lower = any(c.islower() for c in password)
        has_upper = any(c.isupper() for c in password)
        has_digit = any(c.isdigit() for c in password)
        missing_types = 3 - (has_lower + has_upper + has_digit)

        # Count repeating sequences
        i = 2
        repeats = []
        while i < n:
            if password[i] == password[i - 1] == password[i - 2]:
                length = 2
                while i < n and password[i] == password[i - 1]:
                    length += 1
                    i += 1
                repeats.append(length)
            else:
                i += 1

        if n < 6:
            return max(missing_types, 6 - n)
        
        elif n <= 20:
            replace = sum(r // 3 for r in repeats)
            return max(missing_types, replace)
        
        else:
            # For long passwords, prioritize deletions on repeating sequences
            over_len = n - 20
            replace = 0
            heap = []

            for r in repeats:
                heap.append((r % 3, r))

            # Prioritize sequences based on mod 3
            heap.sort()  

            for mod, r in heap:
                if over_len <= 0:
                    break
                if mod == 0:
                    delete = min(over_len, 1)
                elif mod == 1:
                    delete = min(over_len, 2)
                else:
                    delete = min(over_len, 3)
                over_len -= delete
                r -= delete
                if r >= 3:
                    replace += r // 3

            # Any leftover over_len just reduces replacement opportunity
            replace += sum((r // 3 for _, r in heap if r >= 3 and over_len <= 0))

            return (n - 20) + max(missing_types, replace)

def main():
    solution = Solution()
    print(solution.strongPasswordChecker("a"))         
    print(solution.strongPasswordChecker("aA1"))       
    print(solution.strongPasswordChecker("1337C0d3"))  
    print(solution.strongPasswordChecker("aaaAAA111"))
    print(solution.strongPasswordChecker("aaaaaaaaaaaaaaaaaaaaa"))

if __name__ == "__main__":
    main()
    
"""

Time complexity is O(n)
Space complexity is O(n)

"""