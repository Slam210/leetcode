/*

A Trie is a tree-like data structure where each node represents a single character. 
Words are formed by linking characters from the root to leaves. 
Each path down the tree represents a word or prefix.  
We implement insert(word) which ddd characters into the Trie, creating nodes as needed. 
search(word) which return true if the entire word exists in the Trie. 
startsWith(prefix) which return true if any word starts with the given prefix. 
We also mark the end of a word using a special flag at the final character node.

*/

class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));
console.log(trie.search("app"));
console.log(trie.startsWith("app"));
trie.insert("app");
console.log(trie.search("app"));

/*

Time complexity for each function is O(n) as each character is processed only once
Space complexity os O(n * k) where n is the number of words and k is the average word length

*/
