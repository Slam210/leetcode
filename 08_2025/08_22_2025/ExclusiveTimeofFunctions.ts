/**
 *
 * We have logs of function calls on a single-threaded CPU. Each log indicates when a function starts or ends at a timestamp.
 * We need to compute the exclusive time of each function: the total time it spends running excluding the time its child
 * functions are running. This is a stack simulation problem: When a function starts, push it on the stack. When a function
 * ends, pop it off the stack. The function on top of the stack is the one currently running. We track the time slices between
 * events and assign them to the function on top of the stack.
 *
 */

function exclusiveTime(n: number, logs: string[]): number[] {
  const res = new Array(n).fill(0);
  const stack: number[] = [];
  let prevTime = 0;

  for (let log of logs) {
    const [idStr, type, timeStr] = log.split(":");
    const id = parseInt(idStr);
    const time = parseInt(timeStr);

    if (type === "start") {
      if (stack.length > 0) {
        res[stack[stack.length - 1]] += time - prevTime;
      }
      stack.push(id);
      prevTime = time;
    } else {
      const last = stack.pop()!;
      res[last] += time - prevTime + 1;
      prevTime = time + 1;
    }
  }

  return res;
}

function main() {
  console.log(
    exclusiveTime(2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"])
  );
}

main();

/**
 *
 * Time complexity is O(L)
 * Space complexity is O(n)
 *
 */
