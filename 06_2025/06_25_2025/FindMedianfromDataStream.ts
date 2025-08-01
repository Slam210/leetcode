/**
 *
 * We are asked to implement a median finder class. We can implement this using two priority
 * queues.
 *
 */

class MedianFinder {
  minHeap: {
    isEmpty: () => any;
    front: () => number;
    enqueue: (arg0: number) => void;
    size: () => number;
    dequeue: () => any;
  };
  maxHeap: {
    enqueue: (arg0: number) => void;
    size: () => number;
    dequeue: () => number;
    front: () => number;
  };
  constructor() {
    this.minHeap = new MinPriorityQueue<number>();
    this.maxHeap = new MaxPriorityQueue<number>();
  }

  addNum(num: number): void {
    if (this.minHeap.isEmpty() || num > this.minHeap.front()) {
      this.minHeap.enqueue(num);
    } else {
      this.maxHeap.enqueue(num);
    }

    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.enqueue(this.maxHeap.dequeue());
    } else if (this.minHeap.size() > this.maxHeap.size() + 1) {
      this.maxHeap.enqueue(this.minHeap.dequeue());
    }
  }

  findMedian(): number {
    if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.front();
    } else if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.front();
    } else {
      return (this.maxHeap.front() + this.minHeap.front()) / 2.0;
    }
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian());
mf.addNum(3);
console.log(mf.findMedian());

/**
 *
 * addNUm is Olog(n) or time complexity
 * findMedian() is O(1) for time complexity
 * Space complexity is O(n)
 *
 */
