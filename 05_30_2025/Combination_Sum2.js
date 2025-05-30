var combinationSum2 = function (candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b); // Sort to handle duplicates

  function backtrack(start, path, sum) {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      // Skip duplicates at the same recursion level
      if (i > start && candidates[i] === candidates[i - 1]) continue;

      path.push(candidates[i]);
      backtrack(i + 1, path, sum + candidates[i]); // Move to next index
      path.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
};

console.log(combinationSum([2, 3, 6, 7], 7));
