/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const result = [];
  let i = 0;

  while (i < words.length) {
    let lineLen = words[i].length;
    let j = i + 1;

    while (
      j < words.length &&
      lineLen + words[j].length + (j - i) <= maxWidth
    ) {
      lineLen += words[j].length;
      j++;
    }

    const numWords = j - i;
    const totalSpaces = maxWidth - lineLen;
    let line = "";

    if (j === words.length || numWords === 1) {
      line = words.slice(i, j).join(" ");
      line += " ".repeat(maxWidth - line.length);
    } else {
      const spaceBetween = Math.floor(totalSpaces / (numWords - 1));
      const extra = totalSpaces % (numWords - 1);

      for (let k = i; k < j - 1; k++) {
        line += words[k];
        line += " ".repeat(spaceBetween + (k - i < extra ? 1 : 0));
      }

      line += words[j - 1];
    }
    result.push(line);
    i = j;
  }

  return result;
};

console.log(
  fullJustify(
    ["This", "is", "an", "example", "of", "text", "justification."],
    16
  )
);
