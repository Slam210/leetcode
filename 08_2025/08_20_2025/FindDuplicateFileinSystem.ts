/**
 *
 * We want to identify duplicate files by grouping them according to their contents. Each input string provides
 * directory information, where filenames and contents are formatted in a consistent way. By using regex, we
 * can directly extract both the filename and the content in one step, avoiding manual string slicing. Once we
 * have these pairs, we build the full path and insert it into a map keyed by content. At the end, any content
 * that corresponds to multiple file paths represents a group of duplicates. This approach ensures accurate parsing
 * and efficient grouping in one pass through the data.
 *
 */

function findDuplicate(paths: string[]): string[][] {
  let contentMap: Map<string, string[]> = new Map();
  let fileRegex = /^(\S+)\((.+)\)$/;

  for (let path of paths) {
    let parts = path.split(" ");
    let dir = parts[0];

    for (let i = 1; i < parts.length; i++) {
      let match = parts[i].match(fileRegex);
      if (match) {
        let fileName = match[1];
        let content = match[2];
        let fullPath = dir + "/" + fileName;

        if (!contentMap.has(content)) {
          contentMap.set(content, []);
        }
        contentMap.get(content)!.push(fullPath);
      }
    }
  }

  let result: string[][] = [];
  for (let files of contentMap.values()) {
    if (files.length > 1) {
      result.push(files);
    }
  }

  return result;
}

function main() {
  let input = [
    "root/a 1.txt(abcd) 2.txt(efgh)",
    "root/c 3.txt(abcd)",
    "root/c/d 4.txt(efgh)",
    "root 4.txt(efgh)",
  ];

  console.log(findDuplicate(input));
}

main();

/**
 *
 * Time complexity is O(L) where L is total length of input strings
 * Space complexity is O(N * P) where N is number of files, and P is avg path length
 *
 */
