"""

We approach this problem by interpreting expressions as symbolic polynomials. 
Each polynomial is stored as a mapping from variable tuples to integer coefficients. 
We recursively parse the input expression, and at each step, addition and subtraction 
correspond to merging coefficients, while multiplication corresponds to distributing 
terms and concatenating variable lists. Known variables are substituted as integers, while 
unknown variables remain symbolic. At the end, we format and sort the polynomial terms by degree 
and lexicographic order to match the required output.

"""

from typing import List
from collections import Counter

class Poly:
    def __init__(self):
        self.counts = Counter()

    @staticmethod
    def from_token(token: str, subst: dict):
        # Turn a number, variable, or substitution into a polynomial
        p = Poly()
        if token.isdigit():
            p.counts[()] = int(token)
        elif token in subst:
            p.counts[()] = subst[token]
        else:
            p.counts[(token,)] = 1
        return p

    def add(self, other):
        # Add another polynomial
        for k, v in other.counts.items():
            self.counts[k] += v
            if self.counts[k] == 0:
                del self.counts[k]
        return self

    def sub(self, other):
        # Subtract another polynomial
        for k, v in other.counts.items():
            self.counts[k] -= v
            if self.counts[k] == 0:
                del self.counts[k]
        return self

    def mul(self, other):
        # Multiply two polynomials
        res = Poly()
        for k1, v1 in self.counts.items():
            for k2, v2 in other.counts.items():
                new_key = tuple(sorted(k1 + k2))
                res.counts[new_key] += v1 * v2
        return res

    def to_list(self):
        # Convert polynomial into sorted list form
        terms = []
        for k, v in self.counts.items():
            if v == 0: 
                continue
            degree = len(k)
            terms.append((degree, k, v))
        terms.sort(key=lambda x: (-x[0], x[1]))
        res = []
        for degree, vars_, coeff in terms:
            if vars_:
                res.append(str(coeff) + "*" + "*".join(vars_))
            else:
                res.append(str(coeff))
        return res


# Parses and evaluates the expression into a simplified polynomial
class Solution:
    def basicCalculatorIV(self, expression: str, evalvars: List[str], evalints: List[int]) -> List[str]:
        self.subst = dict(zip(evalvars, evalints))  # substitutions
        self.tokens = expression.replace("(", "( ").replace(")", " )").split()
        self.i = 0
        return self.parse_expr().to_list()

    def parse_expr(self):
        # expr := term (+|-) term*
        poly = self.parse_term()
        while self.i < len(self.tokens) and self.tokens[self.i] in ('+', '-'):
            op = self.tokens[self.i]
            self.i += 1
            nxt = self.parse_term()
            if op == '+':
                poly.add(nxt)
            else:
                poly.sub(nxt)
        return poly

    def parse_term(self):
        # term := factor * factor*
        poly = self.parse_factor()
        while self.i < len(self.tokens) and self.tokens[self.i] == '*':
            self.i += 1
            nxt = self.parse_factor()
            poly = poly.mul(nxt)
        return poly

    def parse_factor(self):
        # factor := number | variable | (expr)
        token = self.tokens[self.i]
        if token == '(':
            self.i += 1
            poly = self.parse_expr()
            self.i += 1
            return poly
        else:
            self.i += 1
            return Poly.from_token(token, self.subst)



def main():
    s = Solution()
    tests = [
        ("e + 8 - a + 5", ["e"], [1]),                  
        ("e - 8 + temperature - pressure", ["e","temperature"], [1,12]),
        ("(e + 8) * (e - 8)", [], []),                  
        ("1 + 2 * 3", [], [])                           
    ]
    for expr, vars_, vals in tests:
        print(f"expr={expr}, eval={dict(zip(vars_, vals))} -> {s.basicCalculatorIV(expr, vars_, vals)}")


if __name__ == "__main__":
    main()

"""

Time complexity is O(L) where L is number of tokens
Space complexity is O(T) where T is number of unique variable tuples

"""