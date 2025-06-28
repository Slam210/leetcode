"""

Write a solution to report the name and bonus amount of each employee 
with a bonus less than 1000. Return the result table in any order. 
We want to left join the table on the bonus so anyone who doesn't have
a bonus is considered null. That way we can return those with less than
1000 or is NULL.

"""

"""Example Table"""
Create table If Not Exists Employee (empId int, name varchar(255), supervisor int, salary int)
Create table If Not Exists Bonus (empId int, bonus int)
Truncate table Employee
insert into Employee (empId, name, supervisor, salary) values ('3', 'Brad', NULL, '4000')
insert into Employee (empId, name, supervisor, salary) values ('1', 'John', '3', '1000')
insert into Employee (empId, name, supervisor, salary) values ('2', 'Dan', '3', '2000')
insert into Employee (empId, name, supervisor, salary) values ('4', 'Thomas', '3', '4000')
Truncate table Bonus
insert into Bonus (empId, bonus) values ('2', '500')
insert into Bonus (empId, bonus) values ('4', '2000')

"""Solution"""
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 or b.bonus IS NULL;