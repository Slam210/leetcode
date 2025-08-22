/**
 *
 * To find the smallest range covering numbers from each of the k lists, we can treat it like merging sorted lists.
 * By always tracking one element from each list, we can compute a candidate range between the current minimum and maximum.
 * Using a min-heap ensures we efficiently update the minimum, while we separately maintain the maximum. Each time we pop
 * the smallest element, we advance in that list, creating a new candidate set. This greedy method guarantees we explore
 * all possible valid ranges while always keeping one element per list, ultimately yielding the smallest range.
 *
 */

class MinHeap<T> {
  private data: T[];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.data = [];
    this.compare = compare;
  }

  size(): number {
    return this.data.length;
  }

  push(item: T): void {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  private bubbleUp(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parent]) >= 0) break;
      [this.data[index], this.data[parent]] = [
        this.data[parent],
        this.data[index],
      ];
      index = parent;
    }
  }

  private bubbleDown(index: number) {
    const n = this.data.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (
        right < n &&
        this.compare(this.data[right], this.data[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;
      [this.data[index], this.data[smallest]] = [
        this.data[smallest],
        this.data[index],
      ];
      index = smallest;
    }
  }
}

function smallestRange(nums: number[][]): number[] {
  const k = nums.length;
  const heap = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);

  let currentMax = -Infinity;

  // Initialize heap with first element of each list
  for (let i = 0; i < k; i++) {
    heap.push([nums[i][0], i, 0]);
    currentMax = Math.max(currentMax, nums[i][0]);
  }
  // big placeholder
  let bestRange: [number, number] = [-100000, 100000];

  while (heap.size() === k) {
    const [val, row, col] = heap.pop()!;

    // check current range
    if (
      currentMax - val < bestRange[1] - bestRange[0] ||
      (currentMax - val === bestRange[1] - bestRange[0] && val < bestRange[0])
    ) {
      bestRange = [val, currentMax];
    }

    // advance in this list
    if (col + 1 < nums[row].length) {
      const nextVal = nums[row][col + 1];
      heap.push([nextVal, row, col + 1]);
      currentMax = Math.max(currentMax, nextVal);
    } else {
      // cannot cover all lists anymore
      break;
    }
  }

  return bestRange;
}

function main() {
  const nums1 = [
    [4, 10, 15, 24, 26],
    [0, 9, 12, 20],
    [5, 18, 22, 30],
  ];
  console.log("Smallest range:", smallestRange(nums1));

  const nums2 = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
  ];
  console.log("Smallest range:", smallestRange(nums2));
}

main();
