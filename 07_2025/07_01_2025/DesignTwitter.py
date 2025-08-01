"""

We are building a twitter like class. We need to remember that each tweet needs 
a timestamp so we can sort by recency. Each user can post tweets, follow/unfollow 
other users, and see a news feed of their 10 most recent tweets.

"""

from typing import List
import heapq
from collections import defaultdict

class Twitter:

    def __init__(self):
        self.timestamp = 0
        # userId -> list of (timestamp, tweetId)
        self.user_tweets = defaultdict(list) 
         # userId -> set of followed userIdss
        self.following = defaultdict(set)    

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.user_tweets[userId].append((self.timestamp, tweetId))
        self.timestamp += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        heap = []

        # Include the user's own tweets
        users = self.following[userId].copy()
        users.add(userId)

        for uid in users:
             # Only take last 10 tweets for efficiency
            for tweet in self.user_tweets[uid][-10:]: 
                heapq.heappush(heap, tweet)
                if len(heap) > 10:
                    # keep only 10 most recent tweets
                    heapq.heappop(heap)  

        # Extract tweets in reverse order
        result = []
        while heap:
            result.append(heapq.heappop(heap)[1])
        return result[::-1]

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)

"""

Post tweet has a space/time complexity of O(1)
Follow/Unfollow tweet has a space/time complexity of O(1)
getNewsFeed has a space/time complexity of O(k log(10))

"""