function replaceWords(dictionary: string[], sentence: string): string {
  dictionary.sort((a, b) => a.length - b.length);

  const words = sentence.split(" ");
  const replaced = words.map((word) => {
    for (const root of dictionary) {
      if (word.startsWith(root)) {
        return root;
      }
    }
    return word;
  });

  return replaced.join(" ");
}

function main() {
  const dict1 = ["cat", "bat", "rat"];
  const sentence1 = "the cattle was rattled by the battery";
  console.log(replaceWords(dict1, sentence1));

  const dict2 = ["help", "hel", "h"];
  const sentence2 = "helpful helicopter helps";
  console.log(replaceWords(dict2, sentence2));
}

main();

/**
 *
 * Time complexity is O(m log(m) + n * m * k) for sorting and the amount of checks we have to do
 * Space complexity is O(n)
 *
 */
