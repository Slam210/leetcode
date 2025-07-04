/**
 *
 * We are given two arrays sorted in non-decreasing order alongside an integer k.
 * We are return the kth lowest pairs with the smallest sums. To find the k pairs
 * with the smallest sums from two sorted arrays, we visualize all possible pairs as
 * a grid where rows correspond to elements from nums1 and columns to elements from
 * nums2. Because both arrays are sorted, the smallest sums start at the top-left
 * corner of this grid. The algorithm uses a min heap to always pick the next smallest
 * pair, initially pushing the first element from each row (pairs with nums2[0]).
 * After extracting the smallest pair, it pushes the next pair in the same row,
 * ensuring that pairs are explored in ascending order of their sums without
 * enumerating all possibilities.
 *
 */

class MinHeap {
  private heap: { sum: number; i: number; j: number }[];

  constructor() {
    this.heap = [];
  }

  push(val: { sum: number; i: number; j: number }) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop(): { sum: number; i: number; j: number } | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].sum <= this.heap[index].sum) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  private bubbleDown() {
    let index = 0;
    let length = this.heap.length;

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].sum < this.heap[smallest].sum
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].sum < this.heap[smallest].sum
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

function kSmallestPairs(
  nums1: number[],
  nums2: number[],
  k: number
): number[][] {
  let ans: number[][] = [];
  if (nums1.length === 0 || nums2.length === 0 || k === 0) return ans;

  let minHeap = new MinHeap();

  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    minHeap.push({ sum: nums1[i] + nums2[0], i, j: 0 });
  }

  while (k-- > 0 && !minHeap.isEmpty()) {
    let { i, j } = minHeap.pop()!;
    ans.push([nums1[i], nums2[j]]);

    if (j + 1 < nums2.length) {
      minHeap.push({ sum: nums1[i] + nums2[j + 1], i, j: j + 1 });
    }
  }

  return ans;
}

/**
 *
 * Run complexity is O(k log(k))
 * Space complexity is O(k)
 *
 */
