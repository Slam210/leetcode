/*

The idea behind this query is that we have two tables we want to combine.
Since we combine address, we can perform a left join on the address table since
we want to priotize the data in the person table.

*/

/*
Table Creation
*/
Create table If Not Exists Person (personId int, firstName varchar(255), lastName varchar(255))
Create table If Not Exists Address (addressId int, personId int, city varchar(255), state varchar(255))
Truncate table Person
insert into Person (personId, lastName, firstName) values ('1', 'Wang', 'Allen')
insert into Person (personId, lastName, firstName) values ('2', 'Alice', 'Bob')
Truncate table Address
insert into Address (addressId, personId, city, state) values ('1', '2', 'New York City', 'New York')
insert into Address (addressId, personId, city, state) values ('2', '3', 'Leetcode', 'California')


/*
Solution
*/
Select
    p.FirstName,
    p.LastName,
    a.City,
    a.State
From
    Person P
LEFT JOIN
    Address a
ON
    p.PersonId = a.PersonId