"""

The regular Iterator lets us call next() to get the next item. Check hasNext() if 
there's a next item but peek() should return the next element without consuming it. 
So, we cache the next element in advance. When initializing or after a call to next(), 
we pre-fetch the next element and store it. peek() just returns this cached value. 
next() returns the cached value, then updates the cache using the underlying iterator.

"""

# Below is the interface for Iterator, which is already defined for you.
#
# class Iterator:
#     def __init__(self, nums):
#         """
#         Initializes an iterator object to the beginning of a list.
#         :type nums: List[int]
#         """
#
#     def hasNext(self):
#         """
#         Returns true if the iteration has more elements.
#         :rtype: bool
#         """
#
#     def next(self):
#         """
#         Returns the next element in the iteration.
#         :rtype: int
#         """

class PeekingIterator:
    def __init__(self, iterator):
        """
        Initialize your data structure here.
        :type iterator: Iterator
        """
        self.iterator = iterator
        self._has_next = iterator.hasNext()
        self._next = iterator.next() if self._has_next else None
        

    def peek(self):
        """
        Returns the next element in the iteration without advancing the iterator.
        :rtype: int
        """
        return self._next
        

    def next(self):
        """
        :rtype: int
        """
        current = self._next
        self._has_next = self.iterator.hasNext()
        self._next = self.iterator.next() if self._has_next else None
        return current
        

    def hasNext(self):
        """
        :rtype: bool
        """
        return self._has_next
        

# Your PeekingIterator object will be instantiated and called as such:
# iter = PeekingIterator(Iterator(nums))
# while iter.hasNext():
#     val = iter.peek()   # Get the next element but not advance the iterator.
#     iter.next()         # Should return the same value as [val].

"""

peek() is O(1) for both time/space complexity
next() is O(1) for both time/space complexity
hasNext() is O(1) for both time/space complexity

"""