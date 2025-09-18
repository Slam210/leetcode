"""

We want to maintain a calendar of booked events while ensuring no double booking occurs. 
To achieve this, we represent each booking as an interval [start, end) and check each 
new booking against all previously stored ones. If the intervals overlap (meaning the new 
booking’s start is before an existing booking’s end, and its end is after the existing 
booking’s start), the booking is invalid. Otherwise, we add it to the calendar and return success.

"""

class MyCalendar:
    def __init__(self):
        self.events = []

    def book(self, startTime: int, endTime: int) -> bool:
        for s, e in self.events:
            if startTime < e and endTime > s:
                return False
        self.events.append((startTime, endTime))
        return True


def main():
    cal = MyCalendar()
    print(cal.book(10, 20))  
    print(cal.book(15, 25)) 
    print(cal.book(20, 30)) 
    print(cal.book(5, 10))   
    print(cal.book(25, 35))  


if __name__ == "__main__":
    main()

"""

Time complexity is O(n)
Space complexity is O(n)

"""