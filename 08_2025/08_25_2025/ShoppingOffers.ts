/**
 *
 * We are tasked with minimizing the cost of purchasing items where we can either buy them individually or through
 * special bundle offers. To solve this, we recursively explore all possible purchase paths, applying offers whenever
 * they fit our current needs, and falling back on base prices when necessary. Because the same “remaining needs” can
 * arise from multiple paths, we apply memoization to cache results, ensuring we compute each state only once.
 * This combination of recursive exploration and memoization ensures we find the true minimum cost efficiently.
 *
 */

function shoppingOffers(
  price: number[],
  special: number[][],
  needs: number[]
): number {
  const memo: Map<string, number> = new Map();

  function dfs(needs: number[]): number {
    const key = needs.join(",");
    if (memo.has(key)) return memo.get(key)!;

    let minCost = needs.reduce((sum, qty, i) => sum + qty * price[i], 0);

    for (const offer of special) {
      const newNeeds: number[] = [];
      let valid = true;

      for (let i = 0; i < needs.length; i++) {
        if (offer[i] > needs[i]) {
          valid = false;
          break;
        }
        newNeeds.push(needs[i] - offer[i]);
      }

      if (valid) {
        minCost = Math.min(minCost, offer[needs.length] + dfs(newNeeds));
      }
    }

    memo.set(key, minCost);
    return minCost;
  }

  return dfs(needs);
}

function main() {
  const price1 = [2, 5];
  const special1 = [
    [3, 0, 5],
    [1, 2, 10],
  ];
  const needs1 = [3, 2];
  console.log(shoppingOffers(price1, special1, needs1));

  const price2 = [2, 3, 4];
  const special2 = [
    [1, 1, 0, 4],
    [2, 2, 1, 9],
  ];
  const needs2 = [1, 2, 1];
  console.log(shoppingOffers(price2, special2, needs2));
}

main();

/**
 *
 * Time complexity is O(special.length * 11^n)
 * Space complexity is O(11^n)
 *
 */
