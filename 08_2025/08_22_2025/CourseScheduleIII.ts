/**
 *
 * When trying to take the maximum number of courses, the key observation is that deadlines restrict our flexibility, so we should
 * always prioritize courses that end sooner. By sorting courses by their last possible completion day, we can add them one by one
 * while keeping track of the total time spent. If at any point the accumulated time exceeds the current course’s deadline, we know
 * we cannot keep all chosen courses. The optimal fix is to remove the course that took the longest duration, since that frees the
 * most time and allows us to continue. Using a max-heap to efficiently manage the longest course ensures we always keep as many
 * courses as possible while meeting all deadlines.
 *
 */

class MaxHeap {
  private data: number[];

  constructor() {
    this.data = [];
  }

  size(): number {
    return this.data.length;
  }

  peek(): number | undefined {
    return this.data[0];
  }

  push(val: number): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const max = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return max;
  }

  private bubbleUp(index: number): void {
    let i = index;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent] >= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  private bubbleDown(index: number): void {
    let i = index;
    const length = this.data.length;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      if (left < length && this.data[left] > this.data[largest]) {
        largest = left;
      }
      if (right < length && this.data[right] > this.data[largest]) {
        largest = right;
      }
      if (largest === i) break;

      [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
      i = largest;
    }
  }
}

function scheduleCourse(courses: number[][]): number {
  // Sort courses by their lastDay
  courses.sort((a, b) => a[1] - b[1]);

  let time = 0;
  const maxHeap = new MaxHeap();

  for (const [duration, lastDay] of courses) {
    time += duration;
    maxHeap.push(duration);

    if (time > lastDay) {
      // remove the longest course
      time -= maxHeap.pop()!;
    }
  }

  return maxHeap.size();
}

function main() {
  const courses1 = [
    [100, 200],
    [200, 1300],
    [1000, 1250],
    [2000, 3200],
  ];
  console.log("Max courses:", scheduleCourse(courses1));

  const courses2 = [[1, 2]];
  console.log("Max courses:", scheduleCourse(courses2));

  const courses3 = [
    [3, 2],
    [4, 3],
  ];
  console.log("Max courses:", scheduleCourse(courses3));

  const courses4 = [
    [5, 5],
    [4, 6],
    [2, 6],
  ];
  console.log("Max courses:", scheduleCourse(courses4));
}

main();

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(n)
 *
 */
