function findRestaurant(list1: string[], list2: string[]): string[] {
  const indexMap = new Map<string, number>();
  for (let i = 0; i < list1.length; i++) {
    indexMap.set(list1[i], i);
  }

  let minSum = Infinity;
  const result: string[] = [];

  for (let j = 0; j < list2.length; j++) {
    const word = list2[j];
    if (indexMap.has(word)) {
      const i = indexMap.get(word)!;
      const sum = i + j;

      if (sum < minSum) {
        result.length = 0;
        result.push(word);
        minSum = sum;
      } else if (sum === minSum) {
        result.push(word);
      }
    }
  }

  return result;
}

function main() {
  console.log(
    findRestaurant(
      ["Shogun", "Tapioca Express", "Burger King", "KFC"],
      [
        "Piatti",
        "The Grill at Torrey Pines",
        "Hungry Hunter Steakhouse",
        "Shogun",
      ]
    )
  );

  console.log(
    findRestaurant(
      ["Shogun", "Tapioca Express", "Burger King", "KFC"],
      ["KFC", "Shogun", "Burger King"]
    )
  );
}

main();
