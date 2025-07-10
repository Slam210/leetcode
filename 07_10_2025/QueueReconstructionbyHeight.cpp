/**
 *
 * Each person is represented as [height, k] where height = person’s height and k = number of
 * people in front who have height ≥ that person. The goal. is to reconstruct the original queue.
 * Taller people don't care about shorter people before them. So, we should place taller people 
 * first, then insert shorter people at their correct k index.
 *
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>> &people)
    {
        // descending by height, ascending by k
        sort(people.begin(), people.end(), [](const vector<int> &a, const vector<int> &b)
             { return (a[0] > b[0]) || (a[0] == b[0] && a[1] < b[1]); });

        vector<vector<int>> result;
        for (const auto &person : people)
        {
            result.insert(result.begin() + person[1], person);
        }

        return result;
    }
};

/**
 * 
 * Run time is O(n log(n)) due to sorting
 * Space complexity is O(n)
 * 
 */