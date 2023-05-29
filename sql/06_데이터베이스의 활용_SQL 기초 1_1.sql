/*study 데이터베이스 사용*/
USE study;

/*player 테이블의 모든 데이터 조회*/
SELECT * FROM player;

/*player 테이블의 모든 데이터 삭제*/
DELETE FROM player;

/*player 테이블 삭제*/
DROP TABLE player;

/*player 테이블 생성*/
CREATE TABLE player (
	seq INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(20),
	age INT,
	company VARCHAR(20),
	country VARCHAR(20),
	PRIMARY KEY(seq)
) CHARSET=utf8;

/*player테이블에 데이터 추가*/
INSERT INTO player
(seq, name, age, company, country)
VALUES(1, '메시', 37, '바르셀로나', '아르헨티나');

/*player테이블에 데이터 추가*/
INSERT INTO player
(seq, name, age, company, country)
VALUES(2, '날강두', 39, '맨유', '포르투갈');

/*player테이블에 데이터 추가*/
INSERT INTO player
(seq, name, age, company, country)
VALUES(3, '박수호', 29, '바르셀로나', '한국');

/*player테이블에 데이터 추가*/
INSERT INTO player
(seq, name, age, company, country)
VALUES(4, '심교훈', 36, '토트넘', '한국');

/*player테이블에 데이터 추가*/
INSERT INTO player
(seq, name, age, company, country)
VALUES(5, '도준혁', 33, null, '한국');

/*player 테이블의 모든 데이터 조회*/
SELECT * FROM player;