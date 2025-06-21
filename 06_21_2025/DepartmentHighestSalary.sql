/*

The intiotion behind this problem is join each employee with their department
and use that table to filter the max salary employee from each department.

*/

/*
Example Tables
*/
Create table If Not Exists Employee (id int, name varchar(255), salary int, departmentId int)
Create table If Not Exists Department (id int, name varchar(255))
Truncate table Employee
insert into Employee (id, name, salary, departmentId) values ('1', 'Joe', '70000', '1')
insert into Employee (id, name, salary, departmentId) values ('2', 'Jim', '90000', '1')
insert into Employee (id, name, salary, departmentId) values ('3', 'Henry', '80000', '2')
insert into Employee (id, name, salary, departmentId) values ('4', 'Sam', '60000', '2')
insert into Employee (id, name, salary, departmentId) values ('5', 'Max', '90000', '1')
Truncate table Department
insert into Department (id, name) values ('1', 'IT')
insert into Department (id, name) values ('2', 'Sales')

/*
Solution
*/
SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary
FROM 
    Employee e
JOIN 
    Department d ON e.departmentId = d.id
WHERE 
    e.salary = (
        SELECT MAX(salary)
        FROM Employee
        WHERE departmentId = e.departmentId
    );
