class Solution:
    def licenseKeyFormatting(self, s: str, k: int) -> str:
        clean = s.replace('-', '').upper()

        groups = []
        for i in range(len(clean), 0, -k):
            start = max(0, i - k)
            groups.append(clean[start:i])

        return '-'.join(reversed(groups))


def main():
    solution = Solution()

    s = "5F3Z-2e-9-w"
    k = 4
    print("Formatted:", solution.licenseKeyFormatting(s, k)) 

    s = "2-5g-3-J"
    k = 2
    print("Formatted:", solution.licenseKeyFormatting(s, k)) 

    s = "---"
    k = 3
    print("Formatted:", solution.licenseKeyFormatting(s, k)) 

if __name__ == "__main__":
    main()
