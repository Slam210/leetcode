"""

Given the table Person, we want to delete all duplicate emnails, saving the one
with the loweat id. We can solve this problem by deleting every entry we get when
we join the two tables on matching emails.

"""

"""Example Table"""
Create table If Not Exists Person (Id int, Email varchar(255))
Truncate table Person
insert into Person (id, email) values ('1', 'john@example.com')
insert into Person (id, email) values ('2', 'bob@example.com')
insert into Person (id, email) values ('3', 'john@example.com')

"""Solution"""
Delete p1
From Person p1
Join Person p2
On p1.email = p2.email
AND p1.id > p2.id