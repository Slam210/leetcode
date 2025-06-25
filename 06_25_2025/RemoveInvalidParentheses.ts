/**
 *
 * We are given a string s. Our task is to return a list of unique strings
 * that are valid with the minimum number of removals. We may return the answer in any order.
 * We can solve this problem with a BFS. Since we want the minimum number of removals,
 * we explore all possible strings by removing one parenthesis at a time.
 * BFS guarantees that the first valid strings we encounter have the smallest number of removals.
 *
 */

function removeInvalidParentheses(s: string): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  const queue: string[] = [s];
  let found = false;

  function isValid(str: string): boolean {
    let count = 0;
    for (const char of str) {
      if (char === "(") {
        count++;
      } else if (char === ")") {
        count--;
        if (count < 0) return false;
      }
    }
    return count === 0;
  }

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (isValid(current)) {
      result.push(current);
      found = true;
    }

    if (found) continue;

    for (let i = 0; i < current.length; i++) {
      if (current[i] !== "(" && current[i] !== ")") continue;

      const next = current.slice(0, i) + current.slice(i + 1);
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return result.length > 0 ? result : [""];
}

/**
 *
 * Time complexity is O(n × 2ⁿ) in the worst case
 * Space complexity is O(2ⁿ) in the worst case
 *
 */
