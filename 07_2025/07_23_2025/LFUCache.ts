class LFUCache {
  // Max number of items cache can hold
  private capacity: number;
  // Maps key to its value
  private keyToVal: Map<number, number>;
  // Maps key to its usage frequency
  private keyToFreq: Map<number, number>;
  // Maps frequency to a set of keys with that frequency
  private freqToKeys: Map<number, Set<number>>;
  // Tracks the minimum frequency in the cache
  private minFreq: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.keyToVal = new Map();
    this.keyToFreq = new Map();
    this.freqToKeys = new Map();
    this.minFreq = 0;
  }

  // Get the value for the given key. If key exists, update its frequency and return value. Otherwise return -1.
  get(key: number): number {
    if (!this.keyToVal.has(key)) return -1;
    // Increment frequency since it's being used
    this.updateFreq(key);
    return this.keyToVal.get(key)!;
  }

  // Put a key-value pair into the cache
  put(key: number, value: number): void {
    if (this.capacity === 0) return;

    // If the key already exists, update the value and increment its frequency
    if (this.keyToVal.has(key)) {
      this.keyToVal.set(key, value);
      this.updateFreq(key);
      return;
    }

    // Evict one key if cache is at full capacity
    if (this.keyToVal.size >= this.capacity) {
      // Get the least frequently used keys
      const keys = this.freqToKeys.get(this.minFreq)!;
      // Get the least recently used among them
      const evictKey = keys.values().next().value;
      // Remove from freq map
      keys.delete(evictKey);
      if (keys.size === 0) {
        this.freqToKeys.delete(this.minFreq);
      }
      // Remove from main map
      this.keyToVal.delete(evictKey);
      // Remove frequency mapping
      this.keyToFreq.delete(evictKey);
    }

    // Insert the new key with frequency 1
    this.keyToVal.set(key, value);
    this.keyToFreq.set(key, 1);
    if (!this.freqToKeys.has(1)) {
      this.freqToKeys.set(1, new Set());
    }
    this.freqToKeys.get(1)!.add(key);
    // New key has freq = 1, so minFreq must reset
    this.minFreq = 1;
  }

  // Helper function to update frequency of a key
  private updateFreq(key: number): void {
    const freq = this.keyToFreq.get(key)!;
    this.keyToFreq.set(key, freq + 1);

    // Remove key from old frequency set
    const oldSet = this.freqToKeys.get(freq)!;
    oldSet.delete(key);
    if (oldSet.size === 0) {
      this.freqToKeys.delete(freq);
      if (this.minFreq === freq) {
        // If the lowest frequency was removed, increase minFreq
        this.minFreq++;
      }
    }

    // Add key to new frequency set
    if (!this.freqToKeys.has(freq + 1)) {
      this.freqToKeys.set(freq + 1, new Set());
    }
    this.freqToKeys.get(freq + 1)!.add(key);
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
