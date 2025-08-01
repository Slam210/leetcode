/*

Write a solution to find managers with at least five direct reports. Return 
the result table in any order. Write a solution to find managers with at 
least five direct reports. Return the result table in any order. The idea is to
Group the Employee table by managerId, count the number of employees under 
each managerId, only keep those groups with count >= 5, return the manager’s 
name, so we'll join back to the Employee table using id = managerId

*/

/* Example Table */
Create table If Not Exists Employee (id int, name varchar(255), department varchar(255), managerId int)
Truncate table Employee
insert into Employee (id, name, department, managerId) values ('101', 'John', 'A', NULL)
insert into Employee (id, name, department, managerId) values ('102', 'Dan', 'A', '101')
insert into Employee (id, name, department, managerId) values ('103', 'James', 'A', '101')
insert into Employee (id, name, department, managerId) values ('104', 'Amy', 'A', '101')
insert into Employee (id, name, department, managerId) values ('105', 'Anne', 'A', '101')
insert into Employee (id, name, department, managerId) values ('106', 'Ron', 'B', '101')

/* Solution */
SELECT e.name
FROM Employee e
JOIN (
  SELECT managerId
  FROM Employee
  WHERE managerId IS NOT NULL
  GROUP BY managerId
  HAVING COUNT(*) >= 5
) AS mgr ON e.id = mgr.managerId;
