/**
 *
 * We can implement TinyURL with two hash maps, one from generated short keys to the original URLs for decoding,
 * and one from long URLs to their assigned short keys to avoid duplicates. We also keep a counter that increments
 * for each new URL and convert it to a compact base-62 key (digits, lowercase, uppercase). encode checks if the
 * long URL already has a key, otherwise generates one from the counter, stores it in both maps, and returns it
 * with a fixed prefix like http://tinyurl.com/. decode strips the prefix, looks up the key in the short-to-long
 * map, and returns the original URL.
 *
 */

const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base = alphabet.length;

const shortToLong = new Map<string, string>();
const longToShort = new Map<string, string>();
let nextId = 1;
const prefix = "http://tinyurl.com/";

function idToKey(id: number): string {
  if (id === 0) return "0";
  let key = "";
  while (id > 0) {
    key = alphabet[id % base] + key;
    id = Math.floor(id / base);
  }
  return key;
}

/**
 * Encodes a URL to a shortened URL.
 */
function encode(longUrl: string): string {
  if (longToShort.has(longUrl)) {
    return prefix + longToShort.get(longUrl);
  }
  const key = idToKey(nextId++);
  shortToLong.set(key, longUrl);
  longToShort.set(longUrl, key);
  return prefix + key;
}

/**
 * Decodes a shortened URL to its original URL.
 */
function decode(shortUrl: string): string {
  if (!shortUrl.startsWith(prefix)) return "";
  const key = shortUrl.slice(prefix.length);
  return shortToLong.get(key) ?? "";
}

function main(): void {
  const url = "https://leetcode.com/problems/design-tinyurl";
  const tiny = encode(url);
  const ans = decode(tiny);

  console.log("Original:", url);
  console.log("Short   :", tiny);
  console.log("Decoded :", ans);
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(m * L)
 *
 */
