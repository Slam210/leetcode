/**
 *
 * We store two maps, one mapping food to cuisine, and one mapping food to current rating.
 * We keep a max-heap for each cuisine holding (rating, name) entries. When a rating changes
 * we update the map and push the new (rating, name) into the corresponding cuisine heap.
 * When we ask for the highest-rated food in a cuisine, we repeatedly discard outdated heap
 * entries until the heap top matches the rating in our map, that top is the correct highest-rated.
 *
 */

type Entry = { food: string; rating: number };

class FoodHeap {
  private data: Entry[] = [];

  private compare(a: Entry, b: Entry): boolean {
    if (a.rating !== b.rating) return a.rating > b.rating;
    return a.food < b.food; // lexicographically smaller comes first
  }

  peek(): Entry | undefined {
    return this.data[0];
  }

  push(val: Entry): void {
    this.data.push(val);
    this.siftUp(this.data.length - 1);
  }

  pop(): Entry | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[p])) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let left = i * 2 + 1;
      if (left >= n) break;
      let right = left + 1;
      let best = left;
      if (right < n && this.compare(this.data[right], this.data[left]))
        best = right;
      if (this.compare(this.data[best], this.data[i])) {
        [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
        i = best;
      } else break;
    }
  }
}

class FoodRatings {
  private foodToCuisine: Map<string, string> = new Map();
  private foodToRating: Map<string, number> = new Map();
  private cuisineHeaps: Map<string, FoodHeap> = new Map();

  constructor(foods: string[], cuisines: string[], ratings: number[]) {
    for (let i = 0; i < foods.length; i++) {
      this.foodToCuisine.set(foods[i], cuisines[i]);
      this.foodToRating.set(foods[i], ratings[i]);
      if (!this.cuisineHeaps.has(cuisines[i])) {
        this.cuisineHeaps.set(cuisines[i], new FoodHeap());
      }
      this.cuisineHeaps
        .get(cuisines[i])!
        .push({ food: foods[i], rating: ratings[i] });
    }
  }

  changeRating(food: string, newRating: number): void {
    this.foodToRating.set(food, newRating);
    const cuisine = this.foodToCuisine.get(food)!;
    this.cuisineHeaps.get(cuisine)!.push({ food, rating: newRating });
  }

  highestRated(cuisine: string): string {
    const heap = this.cuisineHeaps.get(cuisine)!;
    while (
      heap.peek() &&
      this.foodToRating.get(heap.peek()!.food)! !== heap.peek()!.rating
    ) {
      heap.pop();
    }
    return heap.peek()!.food;
  }
}

function main(): void {
  const foods = ["kimchi", "miso", "sushi", "ramen", "takoyaki", "udon"];
  const cuisines = [
    "korean",
    "japanese",
    "japanese",
    "japanese",
    "japanese",
    "japanese",
  ];
  const ratings = [9, 12, 8, 8, 7, 6];

  const fr = new FoodRatings(foods, cuisines, ratings);

  console.log("highest korean:", fr.highestRated("korean"));
  console.log("highest japanese:", fr.highestRated("japanese"));

  fr.changeRating("sushi", 13);
  console.log(
    "after sushi -> 13, highest japanese:",
    fr.highestRated("japanese")
  );

  fr.changeRating("kimchi", 6);
  console.log("after kimchi -> 6, highest korean:", fr.highestRated("korean"));

  fr.changeRating("udon", 13);
  console.log(
    "after udon -> 13, highest japanese (tie):",
    fr.highestRated("japanese")
  );
}

main();

/**
 *
 * Time complexity is average O(1)
 * Space complexity is average O(n + q)
 *
 */
