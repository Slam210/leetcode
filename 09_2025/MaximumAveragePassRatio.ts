/**
 *
 * We are tasked with distributing extra brilliant students among classes to maximize the overall average pass ratio.
 * Each class has a pass ratio defined as passes / total, and assigning a student increases both numbers by one.
 * Since the improvement varies by class, we must always place the next student where the increase is the greatest.
 * From a general perspective, we solve this by calculating the marginal gain of adding one student to each class, and
 * then repeatedly assigning extra students to the class with the highest gain using a max heap. This ensures that every a
 * ssignment step maximizes the average ratio.
 *
 */

class MaxHeap<T> {
  private data: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.data = [];
    this.comparator = comparator;
  }

  size(): number {
    return this.data.length;
  }

  push(item: T): void {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.size() === 0) return undefined;
    const top = this.data[0];
    const end = this.data.pop()!;
    if (this.size() > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparator(this.data[index], this.data[parent]) <= 0) break;
      [this.data[index], this.data[parent]] = [
        this.data[parent],
        this.data[index],
      ];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.size();
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (
        left < length &&
        this.comparator(this.data[left], this.data[largest]) > 0
      ) {
        largest = left;
      }
      if (
        right < length &&
        this.comparator(this.data[right], this.data[largest]) > 0
      ) {
        largest = right;
      }
      if (largest === index) break;
      [this.data[index], this.data[largest]] = [
        this.data[largest],
        this.data[index],
      ];
      index = largest;
    }
  }
}

function maxAverageRatio(classes: number[][], extraStudents: number): number {
  function gain(pass: number, total: number): number {
    return (pass + 1) / (total + 1) - pass / total;
  }

  const heap = new MaxHeap<[number, number]>((a, b) => {
    return gain(a[0], a[1]) - gain(b[0], b[1]);
  });

  for (let c of classes) {
    heap.push([c[0], c[1]]);
  }

  while (extraStudents-- > 0) {
    let [p, t] = heap.pop()!;
    heap.push([p + 1, t + 1]);
  }

  let totalRatio = 0;
  while (heap.size() > 0) {
    let [p, t] = heap.pop()!;
    totalRatio += p / t;
  }

  return totalRatio / classes.length;
}

function main() {
  const classes = [
    [1, 2],
    [3, 5],
    [2, 2],
  ];
  const extraStudents = 2;
  console.log(maxAverageRatio(classes, extraStudents).toFixed(5));
}

main();

/**
 *
 * Time complexity is O(n + extraStudents * log(n))
 * Space complexity is O(n)
 *
 */
