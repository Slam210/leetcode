/**
 *
 * The intuition behind this problem is to divide and conquer. During the merge step,
 * when we compare elements from the two halves, we can keep track of how many elements
 * from the right half are smaller and have already passed over a given left element,
 * these are the ones that end up to the right in the original array.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    void mergeSort(vector<pair<int, int>> &arr, int left, int right, vector<int> &counts)
    {
        if (right - left <= 1)
            return;
        int mid = left + (right - left) / 2;

        mergeSort(arr, left, mid, counts);
        mergeSort(arr, mid, right, counts);

        vector<pair<int, int>> temp;
        int j = mid;
        for (int i = left; i < mid; ++i)
        {
            while (j < right && arr[i].first > arr[j].first)
                ++j;
            counts[arr[i].second] += j - mid;
        }

        inplace_merge(arr.begin() + left, arr.begin() + mid, arr.begin() + right);
    }

    vector<int> countSmaller(vector<int> &nums)
    {
        int n = nums.size();
        vector<pair<int, int>> indexed;
        for (int i = 0; i < n; ++i)
            indexed.emplace_back(nums[i], i);

        vector<int> counts(n, 0);
        mergeSort(indexed, 0, n, counts);
        return counts;
    }
};

int main()
{
    Solution solution;
    vector<int> nums = {5, 2, 6, 1};
    vector<int> result = solution.countSmaller(nums);

    cout << "Counts of smaller elements to the right: ";
    for (int count : result)
    {
        cout << count << " ";
    }
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(log(n))
 * Space complexity is O(n)
 *
 */