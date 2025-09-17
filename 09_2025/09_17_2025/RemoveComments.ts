/**
 *
 * We want to remove comments from C++ source code, where comments can either be single-line (//) or multi-line.
 * Since block comments may extend across multiple lines, we must carefully track whether we’re inside a block comment.
 * The idea is to process the source code line by line, keeping a flag that indicates whether we are inside a block comment.
 * When not in a comment, we look for the beginning of // or /*, and when inside a block comment, we keep skipping characters
 * until * /. Characters outside comments get appended to a temporary buffer, and once a line finishes, we add the buffer to
 * the output if it’s not empty.
 *
 */

export default function removeComments(source: string[]): string[] {
  let result: string[] = [];
  let inBlock = false;
  let newLine = "";

  for (let line of source) {
    let i = 0;
    if (!inBlock) newLine = "";
    while (i < line.length) {
      if (
        !inBlock &&
        i + 1 < line.length &&
        line[i] === "/" &&
        line[i + 1] === "*"
      ) {
        inBlock = true;
        i += 2;
      } else if (
        inBlock &&
        i + 1 < line.length &&
        line[i] === "*" &&
        line[i + 1] === "/"
      ) {
        inBlock = false;
        i += 2;
      } else if (
        !inBlock &&
        i + 1 < line.length &&
        line[i] === "/" &&
        line[i + 1] === "/"
      ) {
        break;
      } else if (!inBlock) {
        newLine += line[i];
        i++;
      } else {
        i++;
      }
    }
    if (!inBlock && newLine.length > 0) {
      result.push(newLine);
    }
  }

  return result;
}

function main() {
  const source = [
    "/*Test program */",
    "int main()",
    "{ ",
    "  // variable declaration ",
    "int a, b, c;",
    "/* This is a test",
    "   multiline  ",
    "   comment for ",
    "   testing */",
    "a = b + c;",
    "}",
  ];
  console.log(removeComments(source));
}

main();

/**
 *
 * Time complexity is O(totalCharacters)
 * Soace complexity is O(totalCharacters)
 *
 */
