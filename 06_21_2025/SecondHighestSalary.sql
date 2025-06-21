/*

The idea behind this code is to grab the highest salary from employee
and then select the second highest salary right after,

*/

/*
Example Table
*/

Create table If Not Exists Employee (id int, salary int)
Truncate table Employee
insert into Employee (id, salary) values ('1', '100')
insert into Employee (id, salary) values ('2', '200')
insert into Employee (id, salary) values ('3', '300')

/*
Solution
*/

SELECT Max(salary) as SecondHighestSalary
From Employee
Where salary < (SELECT Max(salary) From Employee);