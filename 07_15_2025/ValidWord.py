"""

We are given a string word, and we must determine whether it is a valid word. A valid word must 
be at least 3 characters long, consist of only alphanumeric characters, contain at least one 
vowel, and contain at least one consonant. To validate the word we first check the length. 
Then ensure all characters are alphanumeric. Then verify at least one vowel is present and 
finally ensure at least one consonant is present.

"""

class Solution:
    def isValid(self, word: str) -> bool:
        if len(word) < 3:
            return False
        
        if not all(c.isalnum() for c in word):
            return False
        
        vowels = set('aeiouAEIOU')
        has_vowel = False
        has_cononant = False
        
        for c in word:
            if c in vowels:
                has_vowel = True
            elif c.isalpha():
                has_cononant = True
        
        return has_vowel and has_cononant

def main():
    solution = Solution()
    test_cases = [
        "a1b",     
        "a!",       
        "aei",      
        "123",      
        "abc",     
        "A1C",  
        "xy",
    ]
    
    for word in test_cases:
        result = solution.isValid(word)
        print(f"'{word}' => {result}")


if __name__ == "__main__":
    main()
    
"""

Time complexity is O(n)
Space complexity is O(1)

"""