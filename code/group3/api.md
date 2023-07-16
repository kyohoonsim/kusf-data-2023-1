# API 연결

## 구름 IDE로 백엔드 서버 START (사전 준비)
``` bash
service mysql restart
source .venv/bin/activate
```
## DBeaver 연결
1. 데이터 연결하고 kusf3이라는 데이터 베이스를 하나 생성해요.(데이터베이스 우클릭해서 create 하시고 직접 적으시면 됩니다)
2. 밑 코드 복붙
``` 
USE kusf3;

CREATE TABLE baseball_game_date (
	baseball_game_ID VARCHAR(10)
	,date DATE
	, time TIME
	, away_team VARCHAR(10)
	, home_team VARCHAR(10)
	, stadium VARCHAR(20)
	, group_count INT
	, place VARCHAR(10)
	,PRIMARY KEY(baseball_game_ID)
) CHARSET=utf8;

CREATE TABLE baseball_group_data (
	baseball_game_ID VARCHAR(10)
	, group_name VARCHAR(10)
	, group_leader VARCHAR(10)
	, cheer_team VARCHAR(10)
	, member_total INT
	, member_num INT
	, keyword1 VARCHAR(10)
	, keyword2 VARCHAR(10)
	, keyword3 VARCHAR(10)
) CHARSET=utf8;

CREATE TABLE soccer_game_date (
	soccer_game_ID VARCHAR(10)
	,date DATE
	, time TIME
	, away_team VARCHAR(10)
	, home_team VARCHAR(10)
	, stadium VARCHAR(20)
	, group_count INT
	, place VARCHAR(10)
	,PRIMARY KEY(soccer_game_ID)
) CHARSET=utf8;

```
3. 데이터베이스 클릭-> 테이블 클릭-> 새로고침하시면 생성된 테이블들이 보입니다.
4. 각 테이블 우클릭->데이터 가져오기 누르시고 제가 보낸 csv 파일명이랑 테이블명이랑 맞게 연결하시면 됩니다. next 계속 누르다가 proceed 하세요.

## crud, main 파일 열기
1. 구름 IDE로 가셔서 제가 보낸 new_crud.py, main_crud.py 를 각각 KUSF_DATA에 불러오세요
2. 그럼 코드가 다 작성되어 있을 겁니다. 저장하고 실행해요
```
uvicorn new_main:app --host 0.0.0.0 --port 8001 --reload
```
## 프론트엔드에 연결하기
1. 제가 보낸 html 파일 열고 url 앞부분만 본인 걸로 바꿔주세요. ex. https://kusf-api-3-zim.run.goorm.site


