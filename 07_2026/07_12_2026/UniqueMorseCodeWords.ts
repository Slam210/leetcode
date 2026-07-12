/*
 * @lc app=leetcode id=804 lang=typescript
 *
 * [804] Unique Morse Code Words
 */

// @lc code=start
function uniqueMorseRepresentations(words: string[]): number {
  const morseCode: string[] = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
  const uniqueMorse = new Set();
  for (const word of words) {
    let morse = "";
    for (const char of word) {
      morse += morseCode[char.charCodeAt(0) - 97];
    }
    uniqueMorse.add(morse);
  }
  return uniqueMorse.size;
}
// @lc code=end
