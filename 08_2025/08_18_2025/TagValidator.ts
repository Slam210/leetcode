/**
 *
 * We are given a string representing code with tags and CDATA. We must return true if it follows all rules.
 * The entire code must be wrapped inside one valid closed tag. Valid tag name is [A-Z]{1,9} (1–9 uppercase
 * letters). Content inside tags can include other valid closed tags, CDATA (<![CDATA[...]]>), or raw characters.
 * Tags must be balanced. CDATA content is treated as plain text, not parsed as tags. We’ll simulate parsing with
 * a stack of open tags. We iterate through the string. When encountering <![CDATA[...]]>, skip its contents
 * entirely. When encountering <TAG>, push onto stack if valid. When encountering </TAG>, pop from stack and
 * check names match. If any invalid form is detected → return false. At the end the stack must be empty, and we
 * must have parsed at least one valid closed tag that wrapped the whole code.
 *
 */

function isValidTag(tag: string): boolean {
  if (tag.length < 1 || tag.length > 9) return false;
  for (const ch of tag) {
    if (ch < "A" || ch > "Z") return false;
  }
  return true;
}

function isValid(code: string): boolean {
  const n = code.length;
  const stack: string[] = [];
  let i = 0;

  if (code[i] !== "<" || code[n - 1] !== ">") return false;

  while (i < n) {
    if (i > 0 && stack.length === 0) {
      return false;
    }

    if (code.startsWith("<![CDATA[", i)) {
      // handle CDATA
      const j = code.indexOf("]]>", i);
      if (j < 0) return false; // no closing
      i = j + 3; // skip past CDATA
    } else if (code.startsWith("</", i)) {
      // handle closing tag
      const j = code.indexOf(">", i);
      if (j < 0) return false;
      const tag = code.substring(i + 2, j);
      if (!isValidTag(tag)) return false;
      if (stack.length === 0 || stack[stack.length - 1] !== tag) return false;
      stack.pop();
      i = j + 1;
    } else if (code.startsWith("<", i)) {
      // handle opening tag
      const j = code.indexOf(">", i);
      if (j < 0) return false;
      const tag = code.substring(i + 1, j);
      if (!isValidTag(tag)) return false;
      stack.push(tag);
      i = j + 1;
    } else {
      // plain text
      i++;
    }
  }

  return stack.length === 0;
}

/**
 *
 * Time complexity is O(n^2)
 * Spce complexity is O(n)
 *
 */
