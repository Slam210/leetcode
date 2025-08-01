"""

We are to a solution to find all dates' id with higher temperatures compared to 
its previous dates (yesterday). Return the result table in any order. We can solve
this problem by comparing recordDate to recordDate - 1 and that the current tempeture
is greater than the previous.

"""

"""Example Table"""
Create table If Not Exists Weather (id int, recordDate date, temperature int)
Truncate table Weather
insert into Weather (id, recordDate, temperature) values ('1', '2015-01-01', '10')
insert into Weather (id, recordDate, temperature) values ('2', '2015-01-02', '25')
insert into Weather (id, recordDate, temperature) values ('3', '2015-01-03', '20')
insert into Weather (id, recordDate, temperature) values ('4', '2015-01-04', '30')

"""Solution"""
SELECT w1.id
FROM Weather w1
JOIN Weather w2
    ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature