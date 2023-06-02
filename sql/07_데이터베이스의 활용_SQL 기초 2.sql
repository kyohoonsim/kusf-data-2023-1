USE study;

/*정렬*/
SELECT 
	* 
FROM player 
ORDER BY country DESC, age ASC;

/*집계 함수*/
SELECT
	COUNT(age)
	, SUM(age)
	, AVG(age)
	, MIN(age)
	, MAX(age)
FROM player;

/*GROUP BY - HAVING*/
SELECT 
	country, COUNT(country)
FROM player
GROUP BY country
HAVING COUNT(country) = 1;

/*GROUP BY - WHERE*/
SELECT
	country, COUNT(country)
FROM player
WHERE age >= 30 AND age < 40
GROUP BY country;

/*Quiz 6-1*/
SELECT 
	age
	, COUNT(email) 
FROM student 
GROUP BY age
HAVING age > 23;

/*Quiz 6-2*/
SELECT 
	school
	, COUNT(email) 
FROM student 
WHERE age >= 23 
GROUP BY school;

/*서브쿼리*/
SELECT
	*
FROM player
WHERE age = (SELECT MIN(age) FROM player);

/*Quiz 7-1*/
SELECT
	*
FROM student
WHERE age > (SELECT AVG(age) FROM student);