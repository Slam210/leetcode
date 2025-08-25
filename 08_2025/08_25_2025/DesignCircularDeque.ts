/**
 *
 * We need to design a double-ended queue with fixed capacity k. It should support inserting and deleting
 * from both ends, retrieving front and rear elements, and checking if it’s empty or full.
 *
 */

class MyCircularDeque {
  private arr: number[];
  private front: number;
  private rear: number;
  private count: number;
  private capacity: number;

  constructor(k: number) {
    this.arr = new Array(k);
    this.front = 0;
    this.rear = 0;
    this.count = 0;
    this.capacity = k;
  }

  insertFront(value: number): boolean {
    if (this.isFull()) return false;
    this.front = (this.front - 1 + this.capacity) % this.capacity;
    this.arr[this.front] = value;
    this.count++;
    return true;
  }

  insertLast(value: number): boolean {
    if (this.isFull()) return false;
    this.arr[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    this.count++;
    return true;
  }
  deleteFront(): boolean {
    if (this.isEmpty()) return false;
    this.front = (this.front + 1) % this.capacity;
    this.count--;
    return true;
  }

  deleteLast(): boolean {
    if (this.isEmpty()) return false;
    this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    this.count--;
    return true;
  }

  getFront(): number {
    if (this.isEmpty()) return -1;
    return this.arr[this.front];
  }

  getRear(): number {
    if (this.isEmpty()) return -1;
    return this.arr[(this.rear - 1 + this.capacity) % this.capacity];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */

/**
 *
 * Time complexity is O(1) for all operations
 * Space complexity is O(k) for the circular array
 *
 */
