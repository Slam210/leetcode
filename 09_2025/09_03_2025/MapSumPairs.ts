/**
 *
 * We can design a trie-backed map where each node keeps track of the total sum of values from all keys
 * going through that node. Whenever we insert a new key or update an existing one, we update the sums
 * along its path by applying the difference between new and old values. Then, answering prefix-sum queries
 * is just a matter of walking down the trie along the given prefix and returning the stored cumulative value.
 *
 */

class TrieNode {
  children: Map<string, TrieNode>;
  sum: number;

  constructor() {
    this.children = new Map();
    this.sum = 0;
  }
}

class MapSum {
  private root: TrieNode;
  private keyValue: Map<string, number>;

  constructor() {
    this.root = new TrieNode();
    this.keyValue = new Map();
  }

  insert(key: string, val: number): void {
    const oldVal = this.keyValue.get(key) ?? 0;
    const delta = val - oldVal;
    this.keyValue.set(key, val);

    let node = this.root;
    node.sum += delta;

    for (const ch of key) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
      node.sum += delta;
    }
  }

  sum(prefix: string): number {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return 0;
      node = node.children.get(ch)!;
    }
    return node.sum;
  }
}

function main() {
  const obj = new MapSum();
  obj.insert("apple", 3);
  console.log(obj.sum("ap"));
  obj.insert("app", 2);
  console.log(obj.sum("ap"));
}

main();

/**
 *
 * Time complexity is O(L) where L is the length of the key
 * SPace cmoplexity is O(N * L) where N is the number
 *
 */
