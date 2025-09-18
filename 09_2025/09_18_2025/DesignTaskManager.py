"""

We manage user tasks with a combination of a heap and a dictionary. The heap, guided by a custom comparator in the Manager class, ensures 
the task with the highest priority (and in case of ties, the highest taskId) always surfaces first. The dictionary record keeps track of 
the latest state of each task. Adding or editing simply pushes a new task object to the heap and updates the dictionary, while removal 
deletes the entry from the dictionary. Since the heap may contain outdated versions, we use lazy deletion during execution: repeatedly pop 
from the heap until we encounter a task that matches the latest dictionary record, then remove it and return its userId. This design balances 
efficient task retrieval with manageable updates.

"""

import heapq

class Manager:
    def __init__(self, userId, taskId, priority):
        self.userId = userId
        self.taskId = taskId
        self.priority = priority

    def __lt__(self, other):
        if self.priority == other.priority:
            return self.taskId > other.taskId  
        return self.priority > other.priority 


class TaskManager:
    def __init__(self, tasks):
        self.heap = []
        self.record = {}  
        for userId, taskId, priority in tasks:
            m = Manager(userId, taskId, priority)
            heapq.heappush(self.heap, m)
            self.record[taskId] = m

    def add(self, userId, taskId, priority):
        m = Manager(userId, taskId, priority)
        heapq.heappush(self.heap, m)
        self.record[taskId] = m

    def edit(self, taskId, newPriority):
        if taskId not in self.record:
            return
        old = self.record[taskId]
        updated = Manager(old.userId, taskId, newPriority)
        heapq.heappush(self.heap, updated)
        self.record[taskId] = updated

    def rmv(self, taskId):
        if taskId in self.record:
            del self.record[taskId] 

    def execTop(self):
        while self.heap:
            top = heapq.heappop(self.heap)
            latest = self.record.get(top.taskId)
            if latest is None:
                continue 
            if latest.priority != top.priority:
                continue
            if latest.userId != top.userId:
                continue  
            del self.record[top.taskId]
            return top.userId
        return -1


# Your TaskManager object will be instantiated and called as such:
# obj = TaskManager(tasks)
# obj.add(userId,taskId,priority)
# obj.edit(taskId,newPriority)
# obj.rmv(taskId)
# param_4 = obj.execTop()


def main():
    tasks = [
        [1, 5, 10],   
        [2, 3, 15],   
        [1, 7, 15],   
    ]

    tm = TaskManager(tasks)

    print("execTop ->", tm.execTop())  

    tm.edit(5, 20)
    print("execTop ->", tm.execTop())  

    tm.rmv(3)
    print("execTop ->", tm.execTop())

    tm.add(4, 10, 5)
    tm.add(5, 11, 5)
    print("execTop ->", tm.execTop())  
    print("execTop ->", tm.execTop())  
    print("execTop ->", tm.execTop()) 

if __name__ == "__main__":
    main()
    
"""

Time complexity is average O(log(n)) for modifying/executing operations, O(1) for removal
Space complexity is O(n)

"""