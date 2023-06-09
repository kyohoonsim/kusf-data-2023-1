USE study;

/*예제*/

/*비정규화*/
/*수강내역 테이블*/
CREATE TABLE college_lecture_history (
	student_id VARCHAR(20)
	, name VARCHAR(20)
	, lecture VARCHAR(100)
	, professor VARCHAR(20)
	, professor_number VARCHAR(40)
) CHARSET=utf8;

INSERT INTO college_lecture_history (student_id, name, lecture, professor, professor_number)
VALUES ('6210062', '도준혁', 'JAVA, SQL', '제임스 아서 고슬링, 몬티', '010-1111-1111, 010-2222-2222');

INSERT INTO college_lecture_history (student_id, name, lecture, professor, professor_number)
VALUES ('6210210', '심교훈', 'PYTHON, SQL', '귀도 반 로섬, 몬티', '010-3333-3333, 010-2222-2222');

SELECT * FROM college_lecture_history;


/*제1정규화*/

/*수강내역 테이블*/
DROP TABLE college_lecture_history;

CREATE TABLE college_lecture_history (
	student_id VARCHAR(20)
	, name VARCHAR(20)
	, lecture VARCHAR(100)
	, professor VARCHAR(20)
	, professor_number VARCHAR(40)
) CHARSET=utf8;

INSERT INTO college_lecture_history (student_id, name, lecture, professor, professor_number)
VALUES ('6210062', '도준혁', 'JAVA', '제임스 아서 고슬링', '010-1111-1111');

INSERT INTO college_lecture_history (student_id, name, lecture, professor, professor_number)
VALUES ('6210062', '도준혁', 'SQL', '몬티', '010-2222-2222');

INSERT INTO college_lecture_history (student_id, name, lecture, professor, professor_number)
VALUES ('6210210', '심교훈', 'PYTHON', '귀도 반 로섬', '010-3333-3333');

INSERT INTO college_lecture_history (student_id, name, lecture, professor, professor_number)
VALUES ('6210210', '심교훈', 'SQL', '몬티', '010-2222-2222');

SELECT * FROM college_lecture_history;


/*제2정규화*/

/*복합키(student_id, lecture)를 기준*/
/*name은 student_id에 종속*/
/*professor은 lecture에 종속*/
/*테이블을 분리한다(수강생 테이블, 강의 테이블, 수강내역 테이블)*/

/*수강생 테이블*/
CREATE TABLE college_student (
	student_id VARCHAR(20)
	, name VARCHAR(20)
) CHARSET=utf8;

INSERT INTO college_student (student_id, name)
VALUES ('6210062', '도준혁');

INSERT INTO college_student (student_id, name)
VALUES ('6210210', '심교훈');

SELECT * FROM college_student;


/*강의 테이블*/
CREATE TABLE college_lecture (
	lecture VARCHAR(100)
	, professor VARCHAR(20)
	, professor_number VARCHAR(40)
) CHARSET=utf8;

INSERT INTO college_lecture (lecture, professor, professor_number)
VALUES ('JAVA', '제임스 아서 고슬링', '010-1111-1111');

INSERT INTO college_lecture (lecture, professor, professor_number)
VALUES ('SQL', '몬티', '010-2222-2222');

INSERT INTO college_lecture (lecture, professor, professor_number)
VALUES ('PYTHON', '귀도 반 로섬', '010-3333-3333');

SELECT * FROM college_lecture;


/*수강 내역 테이블*/
DROP TABLE college_lecture_history;

CREATE TABLE college_lecture_history (
	student_id VARCHAR(20)
	, lecture VARCHAR(100)
) CHARSET=utf8;


INSERT INTO college_lecture_history (student_id, lecture)
VALUES ('6210062', 'JAVA');

INSERT INTO college_lecture_history (student_id, lecture)
VALUES ('6210062', 'SQL');

INSERT INTO college_lecture_history (student_id, lecture)
VALUES ('6210210', 'PYTHON');

INSERT INTO college_lecture_history (student_id, lecture)
VALUES ('6210210', 'SQL');

SELECT * FROM college_lecture_history;



/*제3정규화*/

/*기본키를 제외한 일반 컬럼(professor 컬럼)에 professor_number가 종속*/
/*테이블 분리*/

/*강사 테이블*/
CREATE TABLE college_professor (
	professor VARCHAR(20)
	, professor_number VARCHAR(40)
) CHARSET=utf8;

INSERT INTO college_professor (professor, professor_number)
VALUES ('제임스 아서 고슬링', '010-1111-1111');

INSERT INTO college_professor (professor, professor_number)
VALUES ('몬티', '010-2222-2222');

INSERT INTO college_professor (professor, professor_number)
VALUES ('귀도 반 로섬', '010-3333-3333');

SELECT * FROM college_professor;


/*강의 테이블*/
DROP TABLE college_lecture;

CREATE TABLE college_lecture (
	lecture VARCHAR(100)
	, professor VARCHAR(20)
) CHARSET=utf8;

INSERT INTO college_lecture (lecture, professor)
VALUES ('JAVA', '제임스 아서 고슬링');

INSERT INTO college_lecture (lecture, professor)
VALUES ('SQL', '몬티');

INSERT INTO college_lecture (lecture, professor)
VALUES ('PYTHON', '귀도 반 로섬');

SELECT * FROM college_lecture;
