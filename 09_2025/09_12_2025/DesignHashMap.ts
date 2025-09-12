export default class MyHashMap {
  private BASE: number;
  private buckets: [number, number][][];

  constructor() {
    this.BASE = 1000;
    this.buckets = Array.from({ length: this.BASE }, () => []);
  }

  private hash(key: number): number {
    return key % this.BASE;
  }

  put(key: number, value: number): void {
    const h = this.hash(key);
    for (let pair of this.buckets[h]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.buckets[h].push([key, value]);
  }

  get(key: number): number {
    const h = this.hash(key);
    for (let pair of this.buckets[h]) {
      if (pair[0] === key) return pair[1];
    }
    return -1;
  }

  remove(key: number): void {
    const h = this.hash(key);
    this.buckets[h] = this.buckets[h].filter((pair) => pair[0] !== key);
  }
}

function main(): void {
  const obj = new MyHashMap();
  obj.put(1, 10);
  obj.put(2, 20);
  console.log(obj.get(1));
  console.log(obj.get(3));
  obj.put(2, 30);
  console.log(obj.get(2));
  obj.remove(2);
  console.log(obj.get(2));
}

main();
