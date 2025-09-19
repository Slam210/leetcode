"""

We want to design a calendar that keeps track of the maximum number of overlapping events (k-booking) after each booking. 
Instead of brute-force checking every overlap, we use a sweep line strategy where we treat each booking as adding +1 at 
its start and -1 at its end. By accumulating these changes in chronological order, we can maintain how many events are 
ongoing at any moment. The highest count observed represents the maximum overlap so far. Since we only process at most 
400 bookings, storing endpoints and sweeping them is efficient and clean.

"""

class MyCalendarThree:
    def __init__(self):
        # key: time, value: net change (+1 start, -1 end)
        self.timeline = {}   
        # maximum overlap observed so far
        self.maxBooking = 0  

    def book(self, startTime: int, endTime: int) -> int:
        # Apply sweep line changes
        self.timeline[startTime] = self.timeline.get(startTime, 0) + 1
        self.timeline[endTime] = self.timeline.get(endTime, 0) - 1

        # Recalculate max overlap
        active = 0
        for t in sorted(self.timeline.keys()):
            active += self.timeline[t]
            self.maxBooking = max(self.maxBooking, active)

        return self.maxBooking


def main():
    myCalendarThree = MyCalendarThree()
    print(myCalendarThree.book(10, 20))  
    print(myCalendarThree.book(50, 60))  
    print(myCalendarThree.book(10, 40)) 
    print(myCalendarThree.book(5, 15))   
    print(myCalendarThree.book(5, 10))  
    print(myCalendarThree.book(25, 55)) 


if __name__ == "__main__":
    main()
    
"""

Time complexity is O(nlog(n))
Space complexity is O(n)

"""
