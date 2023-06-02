USE study;

/*비교연산자 - AND OR*/
SELECT 
	* 
FROM player 
WHERE (country = '한국' AND company = '토트넘')
	OR name = '도준혁';

/*IN*/
SELECT 
	* 
FROM player
WHERE name IN ('박수호', '심교훈', '도준혁');

/*NULL*/
SELECT
	*
FROM player
WHERE company IS NULL;

/*패턴 - LIKE*/
SELECT
	*
FROM player
WHERE country LIKE '한%';

/*Quiz2-1*/
SELECT 
	name 
FROM player 
WHERE (age >= 30 AND age < 40) 
	AND country = '한국';

/*Quiz2-2*/
SELECT 
	*
FROM player 
WHERE (age >= 30 AND age < 40) 
	AND (company IS NULL OR country <> '포르투갈');

/*데이터 추가*/
INSERT INTO player(seq, name, age, company, country)
VALUES(6, '홍길동', 20, '맨유', '한국');

/*데이터 수정*/
UPDATE player 
	SET country = '미국'
WHERE seq = 6;

/*데이터 삭제*/
DELETE FROM player WHERE seq = 6;
