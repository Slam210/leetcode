export default function numJewelsInStones(
  jewels: string,
  stones: string
): number {
  const jewelSet = new Set(jewels);

  let count = 0;

  for (const stone of stones) {
    if (jewelSet.has(stone)) {
      count++;
    }
  }

  return count;
}

function main() {
  const jewels = "aA";
  const stones = "aAAbbbb";
  console.log("Number of Jewels in Stones:", numJewelsInStones(jewels, stones)); // Output: 3
}

main();
