/**
 *
 * We want to implement a circular queue, which is a fixed-size data structure that follows FIFO but connects the
 * last position back to the first, allowing efficient reuse of space. We use an array to hold the values and maintain
 * two pointers, front and rear, along with a counter to track the number of elements. Enqueue inserts at the rear and
 * wraps around if needed, dequeue removes from the front and also wraps around, and the other operations simply check or
 * return values based on the current state. This setup gives us an efficient and space-saving queue implementation.
 *
 */

class MyCircularQueue {
  private arr: number[];
  private front: number;
  private rear: number;
  private count: number;
  private size: number;

  constructor(k: number) {
    this.arr = new Array(k);
    this.front = 0;
    this.rear = 0;
    this.count = 0;
    this.size = k;
  }
  enQueue(value: number): boolean {
    if (this.isFull()) return false;
    this.arr[this.rear] = value;
    this.rear = (this.rear + 1) % this.size;
    this.count++;
    return true;
  }

  deQueue(): boolean {
    if (this.isEmpty()) return false;
    this.front = (this.front + 1) % this.size;
    this.count--;
    return true;
  }
  Front(): number {
    return this.isEmpty() ? -1 : this.arr[this.front];
  }

  Rear(): number {
    return this.isEmpty()
      ? -1
      : this.arr[(this.rear - 1 + this.size) % this.size];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    return this.count === this.size;
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

/**
 *
 * Time complexity for all is O(1)
 * Space complexity is O(k)
 *
 */
