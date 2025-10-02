/**
 *
 * We need to find the k-th smallest fraction formed from the array.
 * Instead of generating all possible fractions, we notice that for each denominator,
 * fractions with that denominator form a sorted list as the numerator increases, the
 * fraction increases. We can merge these sorted lists using a min-heap. We start by
 * putting the smallest fraction for each denominator into the heap. Then, we repeatedly
 * pop from the heap, and whenever we pop arr[i]/arr[j], we push the next candidate arr[i+1]/arr[j]
 * into the heap. After k-1 pops, the next fraction we pop is the k-th smallest.
 *
 */

class MinHeap<T> {
  private data: T[];
  private compare: (a: T, b: T) => number;
  constructor(compare: (a: T, b: T) => number) {
    this.data = [];
    this.compare = compare;
  }
  public push(item: T) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }
  public pop(): T | undefined {
    if (this.size() === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }
  public size(): number {
    return this.data.length;
  }
  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parent]) < 0) {
        [this.data[index], this.data[parent]] = [
          this.data[parent],
          this.data[index],
        ];
        index = parent;
      } else break;
    }
  }
  private bubbleDown(index: number): void {
    const n = this.data.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0)
        smallest = left;
      if (right < n && this.compare(this.data[right], this.data[smallest]) < 0)
        smallest = right;
      if (smallest !== index) {
        [this.data[index], this.data[smallest]] = [
          this.data[smallest],
          this.data[index],
        ];
        index = smallest;
      } else break;
    }
  }
}

export default function kthSmallestPrimeFraction(
  arr: number[],
  k: number
): number[] {
  const n = arr.length;
  const heap = new MinHeap<[number, number, number]>((a, b) => a[0] - b[0]);

  for (let j = 1; j < n; j++) {
    heap.push([arr[0] / arr[j], 0, j]);
  }

  for (let t = 0; t < k - 1; t++) {
    const [val, i, j] = heap.pop()!;
    if (i + 1 < j) {
      heap.push([arr[i + 1] / arr[j], i + 1, j]);
    }
  }

  const [, i, j] = heap.pop()!;
  return [arr[i], arr[j]];
}

function main(): void {
  const arr = [1, 2, 3, 5];
  const k = 3;
  console.log(`arr=${arr}, k=${k}`);
  console.log("Result:", kthSmallestPrimeFraction(arr, k));
}

main();

/**
 *
 * Time complexity is O((n + k) log(n))
 * Space complexity is O(n)
 *
 */
