/*

The way this code works is being first selecting the top n amount of salaries
That are distinct. Then we check if the total number of distinct salaries is at least N. 
If not, we return NULL. Otherwise, we return the Nth salary from the limited result.

*/

/*
Example Table
*/
Create table If Not Exists Employee (Id int, Salary int)
Truncate table Employee
insert into Employee (id, salary) values ('1', '100')
insert into Employee (id, salary) values ('2', '200')
insert into Employee (id, salary) values ('3', '300')

/*
Solution
*/

CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  DECLARE result INT;

  SELECT salary INTO result
  FROM (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT N
  ) AS temp
  ORDER BY salary ASC
  LIMIT 1;

  IF (SELECT COUNT(DISTINCT salary) FROM Employee) < N THEN
    RETURN NULL;
  END IF;

  RETURN result;
END