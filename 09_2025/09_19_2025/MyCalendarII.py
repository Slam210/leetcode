"""

We want to design a calendar where we allow double bookings but forbid triple bookings. 
To achieve this, we need to carefully track overlaps. Every time we try to add a new event, 
we check whether it intersects with an interval that already represents a double booking, if so, it 
would create a triple booking and must be rejected. Otherwise, we record new overlaps with existing 
bookings and then add the event. This way, our system maintains correctness while still allowing some flexibility.

"""

class MyCalendarTwo:
    def __init__(self):
        self.bookings = []
        self.overlaps = []

    def _overlap(self, s1, e1, s2, e2):
        return max(s1, s2) < min(e1, e2)

    def book(self, startTime: int, endTime: int) -> bool:
        for s, e in self.overlaps:
            if self._overlap(s, e, startTime, endTime):
                return False

        for s, e in self.bookings:
            if self._overlap(s, e, startTime, endTime):
                new_start = max(s, startTime)
                new_end = min(e, endTime)
                self.overlaps.append((new_start, new_end))

        self.bookings.append((startTime, endTime))
        return True        

# Your MyCalendarTwo object will be instantiated and called as such:
# obj = MyCalendarTwo()
# param_1 = obj.book(startTime,endTime)

def main():
    cal = MyCalendarTwo()
    print(cal.book(10, 20)) 
    print(cal.book(50, 60))  
    print(cal.book(10, 40))  
    print(cal.book(5, 15)) 
    print(cal.book(5, 10))   
    print(cal.book(25, 55))  


if __name__ == "__main__":
    main()
    
"""

Time complexity is O(m^2)
Space complexity is O(n^2)

"""