/**
 *
 * We need to track counts of strings, support getting the max and min string by count in O(1)
 * time, and handle inc and dec in O(1).
 *
 */

class BucketNode {
  val: number;
  keys: Set<string>;
  prev: BucketNode | null;
  next: BucketNode | null;

  constructor(val: number) {
    this.val = val;
    this.keys = new Set();
    this.prev = null;
    this.next = null;
  }
}

class AllOne {
  private keyCount: Map<string, number>;
  private countBucket: Map<number, BucketNode>;
  private head: BucketNode;
  private tail: BucketNode;

  constructor() {
    this.keyCount = new Map();
    this.countBucket = new Map();

    this.head = new BucketNode(0);
    this.tail = new BucketNode(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  inc(key: string): void {
    const oldCount = this.keyCount.get(key) ?? 0;
    const newCount = oldCount + 1;
    this.keyCount.set(key, newCount);

    let oldBucket = this.countBucket.get(oldCount) ?? null;
    let newBucket = this.countBucket.get(newCount);

    if (!newBucket) {
      newBucket = new BucketNode(newCount);
      this.countBucket.set(newCount, newBucket);
      this.insertBucketAfter(newBucket, oldBucket ?? this.head);
    }

    newBucket.keys.add(key);

    if (oldBucket) {
      oldBucket.keys.delete(key);
      if (oldBucket.keys.size === 0) {
        this.removeBucket(oldBucket);
        this.countBucket.delete(oldCount);
      }
    }
  }

  dec(key: string): void {
    const oldCount = this.keyCount.get(key)!;
    const newCount = oldCount - 1;

    const oldBucket = this.countBucket.get(oldCount)!;

    if (newCount === 0) {
      this.keyCount.delete(key);
    } else {
      this.keyCount.set(key, newCount);
      let newBucket = this.countBucket.get(newCount);
      if (!newBucket) {
        newBucket = new BucketNode(newCount);
        this.countBucket.set(newCount, newBucket);
        this.insertBucketBefore(newBucket, oldBucket);
      }
      newBucket.keys.add(key);
    }

    oldBucket.keys.delete(key);
    if (oldBucket.keys.size === 0) {
      this.removeBucket(oldBucket);
      this.countBucket.delete(oldCount);
    }
  }

  getMaxKey(): string {
    const maxBucket = this.tail.prev!;
    if (maxBucket === this.head) return "";
    return maxBucket.keys.values().next().value;
  }

  getMinKey(): string {
    const minBucket = this.head.next!;
    if (minBucket === this.tail) return "";
    return minBucket.keys.values().next().value;
  }

  private insertBucketAfter(
    newBucket: BucketNode,
    prevBucket: BucketNode
  ): void {
    const nextBucket = prevBucket.next!;
    newBucket.prev = prevBucket;
    newBucket.next = nextBucket;
    prevBucket.next = newBucket;
    nextBucket.prev = newBucket;
  }

  private insertBucketBefore(
    newBucket: BucketNode,
    nextBucket: BucketNode
  ): void {
    const prevBucket = nextBucket.prev!;
    newBucket.prev = prevBucket;
    newBucket.next = nextBucket;
    prevBucket.next = newBucket;
    nextBucket.prev = newBucket;
  }

  private removeBucket(bucket: BucketNode): void {
    const prev = bucket.prev!;
    const next = bucket.next!;
    prev.next = next;
    next.prev = prev;
  }
}

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */

const obj = new AllOne();
obj.inc("apple");
obj.inc("apple");
obj.inc("banana");
obj.inc("banana");
obj.inc("banana");
obj.inc("cat");
obj.dec("apple");
console.log(obj.getMaxKey());
console.log(obj.getMinKey());
