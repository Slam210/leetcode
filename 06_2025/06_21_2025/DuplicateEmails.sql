/*

The intuition behind this problem is to group every email, group by the email, and
select the ones having more than one email count.


*/

/*
Example Table
*/
Create table If Not Exists Person (id int, email varchar(255))
Truncate table Person
insert into Person (id, email) values ('1', 'a@b.com')
insert into Person (id, email) values ('2', 'c@d.com')
insert into Person (id, email) values ('3', 'a@b.com')

/*
Solution
*/
Select email
From Person
Group By email
HAVING Count(email) > 1;