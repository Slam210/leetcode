/*

The intuition behind this problem is to combine each employee with their manager.
To accomplish this, we can join Each employee with the same table based on whether or not
their id equals the manager id, showing only the results where the e.salary is greater than
the m.salary

*/

/*
Example Table
*/

Create table If Not Exists Employee (id int, name varchar(255), salary int, managerId int)
Truncate table Employee
insert into Employee (id, name, salary, managerId) values ('1', 'Joe', '70000', '3')
insert into Employee (id, name, salary, managerId) values ('2', 'Henry', '80000', '4')
insert into Employee (id, name, salary, managerId) values ('3', 'Sam', '60000', NULL)
insert into Employee (id, name, salary, managerId) values ('4', 'Max', '90000', NULL)

/*
Solution
*/

Select 
    e.name As Employee
From 
    Employee e
Join 
    Employee m
ON 
    e.managerId = m.id
WHERE
    e.salary > m.salary
