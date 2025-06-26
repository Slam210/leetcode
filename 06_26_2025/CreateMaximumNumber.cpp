/**
 *
 * The intuition behind this solution is to build the largest possible number of length k
 * by intelligently combining digits from nums1 and nums2 while preserving the relative
 * order of digits from each array. Since we cannot rearrange elements within the original
 * arrays, we must extract the maximum subsequence of a given length from each array in a
 * greedy manner, ensuring that the chosen digits form the largest sequence possible.
 * We try all valid combinations of selecting i digits from nums1 and k - i digits from nums2,
 * and for each such pair of subsequences, we merge them to form the largest lexicographic number.
 * The merging process carefully picks digits to ensure that the overall number remains as large
 * as possible at each step, by always choosing the bigger remaining sequence when there's a tie.
 * By evaluating all valid splits and tracking the best result, we ensure that we construct the
 * maximum number possible under the given constraints.
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    vector<int> maxSubsequence(vector<int> &nums, int k)
    {
        vector<int> stack;
        int drop = nums.size() - k;

        for (int num : nums)
        {
            while (!stack.empty() && drop > 0 && stack.back() < num)
            {
                stack.pop_back();
                drop--;
            }
            stack.push_back(num);
        }

        stack.resize(k);
        return stack;
    }

    vector<int> merge(vector<int> &a, vector<int> &b)
    {
        vector<int> result;
        auto i = a.begin(), j = b.begin();

        while (i != a.end() || j != b.end())
        {
            if (lexicographical_compare(i, a.end(), j, b.end()))
                result.push_back(*j++);
            else
                result.push_back(*i++);
        }

        return result;
    }

    vector<int> maxNumber(vector<int> &nums1, vector<int> &nums2, int k)
    {
        int m = nums1.size(), n = nums2.size();
        vector<int> best;

        for (int i = max(0, k - n); i <= min(k, m); ++i)
        {
            vector<int> sub1 = maxSubsequence(nums1, i);
            vector<int> sub2 = maxSubsequence(nums2, k - i);
            vector<int> candidate = merge(sub1, sub2);
            if (candidate > best)
                best = candidate;
        }

        return best;
    }
};

int main()
{
    Solution solution;
    vector<int> nums1 = {3, 4, 6, 5};
    vector<int> nums2 = {9, 1, 2, 5, 8, 3};
    int k = 5;

    vector<int> result = solution.maxNumber(nums1, nums2, k);

    cout << "Max number: ";
    for (int num : result)
        cout << num << " ";
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(k * (m+n))
 * We use O(k) space
 *
 */