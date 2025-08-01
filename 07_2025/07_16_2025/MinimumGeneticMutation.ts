/**
 *
 * We have a start gene and an end gene each one being an 8‑character string over the alphabet
 * {A, C, G, T}. A mutation changes exactly one character. We’re given a bank of valid
 * intermediate gene strings. Return the minimum number of mutations needed to go from startGene
 * to endGene or –1 if it’s impossible. This is a classic shortest‑path problem in a graph whose
 * nodes are 8‑char gene strings. Two nodes are adjacent if they differ by exactly one character
 * and the target node is in the bank. The fastest way to find the minimum number of steps is
 * Breadth‑First Search. We treat each gene string as a BFS node. From a given gene, generate
 * all one‑character mutations. Enqueue each valid mutation with steps + 1. Stop as soon as you
 * reach endGene.
 *
 */

function getMutations(gene: string): string[] {
  const letters = ["A", "C", "G", "T"];
  const res: string[] = [];
  const arr = gene.split("");

  for (let i = 0; i < arr.length; i++) {
    const old = arr[i];
    for (const c of letters) {
      if (c === old) continue;
      arr[i] = c;
      res.push(arr.join(""));
    }
    arr[i] = old;
  }
  return res;
}

function minMutation(
  startGene: string,
  endGene: string,
  bank: string[]
): number {
  const bankSet = new Set(bank);
  if (!bankSet.has(endGene)) return -1;

  const visited = new Set<string>();
  const queue: [string, number][] = [[startGene, 0]];
  visited.add(startGene);

  while (queue.length) {
    const [curr, steps] = queue.shift()!;

    if (curr === endGene) return steps;

    for (const next of getMutations(curr)) {
      if (bankSet.has(next) && !visited.has(next)) {
        visited.add(next);
        queue.push([next, steps + 1]);
      }
    }
  }

  return -1;
}

function main(): void {
  console.log(minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"])); // 1

  console.log(
    minMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"])
  );

  console.log(
    minMutation("AAAAACCC", "AACCCCCC", ["AAAACCCC", "AAACCCCC", "AACCCCCC"])
  );

  console.log(minMutation("AAAAACCC", "AACCCCCC", ["AAAACCCC", "AAACCCCC"]));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
