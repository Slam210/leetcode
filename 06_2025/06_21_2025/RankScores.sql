/*

The intuition behind this problem is to use a dense_rank over rank as we want
to assign the same rank when the values are the same rather than skipping them.
From there, we just ensure that the scores are ordered by the score descending.

*/

/*
Example Table
*/
Create table If Not Exists Scores (id int, score DECIMAL(3,2))
Truncate table Scores
insert into Scores (id, score) values ('1', '3.5')
insert into Scores (id, score) values ('2', '3.65')
insert into Scores (id, score) values ('3', '4.0')
insert into Scores (id, score) values ('4', '3.85')
insert into Scores (id, score) values ('5', '4.0')
insert into Scores (id, score) values ('6', '3.65')

/*
Solution
*/
SELECT 
    score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`
FROM 
    Scores
ORDER BY 
    score DESC;
