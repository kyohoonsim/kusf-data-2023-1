USE study;

/*alias(별칭)*/

SELECT * FROM player AS p;

SELECT p.name FROM player AS p;

SELECT name AS nm FROM player;

SELECT p.name AS nm FROM player AS p;



/*자료형 예시 테이블*/
CREATE TABLE data_type (
	col_varchar VARCHAR(100)
	, col_int INT(11)
	, col_decimal DECIMAL(10, 2)
	, col_date DATE
	, col_datetime DATETIME
) CHARSET=utf8;

INSERT INTO data_type (col_varchar, col_int, col_decimal, col_date, col_datetime)
VALUES(‘문자열’, 1, 11.11, NOW(), NOW());

INSERT INTO data_type (col_varchar, col_int, col_decimal, col_date, col_datetime)
VALUES(‘문자열’, 1.5, 11.115, NOW(), NOW());

SELECT * FROM data_type;

/*테이블 모든 행 삭제*/
TRUNCATE TABLE data_type;

/*테이블 삭제*/
DROP TABLE data_type;

/*테이블 열 속성 변경*/
/*열 추가*/
ALTER TABLE student ADD major VARCHAR(20);
/*ALTER TABLE student ADD major VARCHAR(20) DEFAULT '컴퓨터 공학' NOT NULL;*/

/*열 속성 변경*/
ALTER TABLE student MODIFY major VARCHAR(40);
/*ALTER TABLE student MODIFY VARCHAR(40) DEFAULT '영어학과';*/

/*열 이름 변경*/
ALTER TABLE student CHANGE major new_major VARCHAR(40);

/*열 삭제*/
ALTER TABLE student DROP new_major;




/*UNION ALL - 합집합(중복O)*/
SELECT name FROM student
UNION ALL
SELECT name FROM player;

/*UNION - 합집합(중복X)*/
SELECT name FROM student
UNION
SELECT name FROM player;



/*테이블 결합*/

/*스폰서 테이블*/
CREATE TABLE sponsor (
	id VARCHAR(20) NOT NULL,
	name VARCHAR(20) NOT NULL,
	PRIMARY KEY(id)
) CHARSET=utf8;

INSERT INTO sponsor (id, name) VALUES ('01', '나이키');
INSERT INTO sponsor (id, name) VALUES ('02', '아디다스');
INSERT INTO sponsor (id, name) VALUES ('03', '삼성');
INSERT INTO sponsor (id, name) VALUES ('04', '현대');


/*player sponsor 컬럼 추가*/
ALTER TABLE player ADD sponsor VARCHAR(20);
/*메시*/
UPDATE player SET sponsor = '01' WHERE seq = 1;
/*날강두*/
UPDATE player SET sponsor = '02' WHERE seq = 2;
/*박수호*/
UPDATE player SET sponsor = '03' WHERE seq = 3;
/*심교훈*/
UPDATE player SET sponsor = '05' WHERE seq = 4;
/*도준혁*/
UPDATE player SET sponsor = '04' WHERE seq = 5;


/*INNER JOIN - 교집합*/
SELECT 
	p.name
	, s.name AS sponsor 
FROM player AS p
INNER JOIN sponsor AS s 
	ON p.sponsor = s.id;
	

/*LEFT OUTER JOIN - 왼쪽을 기준으로 오른쪽의 데이터를 가져온다(없으면 null)*/
SELECT 
	p.name
	, s.name AS sponsor 
FROM player AS p
LEFT OUTER JOIN sponsor AS s 
	ON p.sponsor = s.id;
	

/*RIGHT OUTER JOIN - 오른쪽을 기준으로 오른쪽의 데이터를 가져온다(없으면 null)*/
SELECT 
	p.name
	, s.name AS sponsor 
FROM player AS p
RIGHT OUTER JOIN sponsor AS s 
	ON p.sponsor = s.id;