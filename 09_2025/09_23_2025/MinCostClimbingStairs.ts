export default function minCostClimbingStairs(cost: number[]): number {
  if (cost.length === 2) {
    return Math.min(cost[0], cost[1]);
  }

  let prev2 = cost[0];
  let prev1 = cost[1];

  for (let i = 2; i < cost.length; i++) {
    let curr = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = curr;
  }

  return Math.min(prev1, prev2);
}

function main() {
  console.log(minCostClimbingStairs([10, 15, 20]));
  console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));
  console.log(minCostClimbingStairs([0, 2, 2, 1]));
  console.log(minCostClimbingStairs([0, 1, 2, 2]));
}

main();
