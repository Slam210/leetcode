/*

The intuition behind this is to use a datastructure that can link one letter to another.
We can use two maps, as we need to comfirm both ways of the string being isomorphic.
If the maps do not contain the link, then we can map it.
If the map does contian the letter, we can check to see if it's correctly mapped to another.

*/

function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const mapST = new Map<string, string>();
  const mapTS = new Map<string, string>();

  for (let i = 0; i < s.length; i++) {
    const sChar = s[i];
    const tChar = t[i];

    if (mapST.has(sChar)) {
      if (mapST.get(sChar) !== tChar) return false;
    } else {
      mapST.set(sChar, tChar);
    }

    if (mapTS.has(tChar)) {
      if (mapTS.get(tChar) !== sChar) return false;
    } else {
      mapTS.set(tChar, sChar);
    }
  }

  return true;
}

console.log(isIsomorphic("egg", "add"));

/*

Time complexity is O(n) as we loop through the string once
Space complexity is O(n) as worst case we map each charcter in s and t

*/
