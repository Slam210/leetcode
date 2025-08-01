/**
 *
 * Given an integer array arr, return the number of distinct results from the bitwise OR of all
 * non-empty subarrays of arr. Subarrays are contiguous slices of the array. A single element is
 * a valid subarray. The OR of a subarray is computed across all its elements. We don’t need to
 * store all subarrays; we only care about the OR result of each. Due to properties of bitwise
 * OR Once a bit is set, it stays set for subsequent ORs. Additionally, OR values in a subarray
 * can only increase or remain the same. So, there's a limit on the number of distinct OR values
 * we can get per step. We can use dynamic sets we we let cur be the set of all OR values ending
 * at the current index and let prev be the set from the previous index.
 * For each x in arr cur = {x | p for p in prev} ∪ {x}. We track all values across all subarrays
 * in a result set.
 *
 */

#include <iostream>
#include <vector>
#include <unordered_set>
#include <set>
using namespace std;

class Solution
{
public:
    int subarrayBitwiseORs(vector<int> &arr)
    {
        unordered_set<int> res;
        set<int> prev;

        for (int x : arr)
        {
            set<int> cur;
            cur.insert(x);
            for (int v : prev)
            {
                cur.insert(x | v);
            }
            prev = cur;
            res.insert(cur.begin(), cur.end());
        }

        return res.size();
    }
};

int main()
{
    Solution sol;
    vector<int> arr = {1, 2, 4};
    cout << "Number of distinct ORs: " << sol.subarrayBitwiseORs(arr) << endl;
    return 0;
}

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */