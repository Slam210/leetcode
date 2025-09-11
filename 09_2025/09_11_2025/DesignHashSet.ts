export default class MyHashSet {
  private buckets: number[][];
  private size: number;

  constructor() {
    this.size = 769;
    this.buckets = Array.from({ length: this.size }, () => []);
  }

  private hash(key: number): number {
    return key % this.size;
  }

  add(key: number): void {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    if (!bucket.includes(key)) {
      bucket.push(key);
    }
  }

  remove(key: number): void {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const pos = bucket.indexOf(key);
    if (pos !== -1) {
      bucket.splice(pos, 1);
    }
  }

  contains(key: number): boolean {
    const idx = this.hash(key);
    return this.buckets[idx].includes(key);
  }
}

function main(): void {
  const mySet = new MyHashSet();
  mySet.add(1);
  mySet.add(2);
  console.log(mySet.contains(1));
  console.log(mySet.contains(3));
  mySet.add(2);
  console.log(mySet.contains(2));
  mySet.remove(2);
  console.log(mySet.contains(2));
}

main();
