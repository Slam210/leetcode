/**
 *
 * The main goal is to reorder the array so that it follows a wiggle pattern, meaning the elements alternate between smaller and larger values.
 * By sorting the array first, we know exactly where the small and large elements are. We then split the array into two halves:
 * The first half contains the smaller values. The second half contains the larger values.
 * To prevent similar values from ending up next to each other (which would break the pattern), we fill the array from the end of each half.
 * Elements from the smaller half at even indices. Elements from the larger half at odd indices.
 * This guarantees that every even index holds a smaller value than the one after it, and every odd index holds a value greater than its neighbors,
 * satisfying the wiggle condition, even with many duplicates or clustered values.
 *
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    void wiggleSort(vector<int> &nums)
    {
        vector<int> sorted(nums);
        sort(sorted.begin(), sorted.end());

        int n = nums.size();
        int mid = (n + 1) / 2;

        int left = mid - 1;
        int right = n - 1;

        for (int i = 0; i < n; ++i)
        {
            if (i % 2 == 0)
            {
                nums[i] = sorted[left--];
            }
            else
            {
                nums[i] = sorted[right--];
            }
        }
    }
};

int main()
{
    Solution solution;
    vector<int> nums = {3, 5, 2, 1, 6, 4};

    solution.wiggleSort(nums);

    cout << "Wiggle sorted array: ";
    for (int num : nums)
    {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */