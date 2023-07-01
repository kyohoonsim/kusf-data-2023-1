# FastAPI로 레먼데이터를 제공하는 API 서버 만들기

## 사전 체크 사항

- 구름IDE 실행

- MySQL 서버 재실행: `service mysql restart`

- 레먼데이터베이스에서 데이터 정상적으로 조회할 수 있는지 확인
    - mysql -uroot -pasdf1234!
    - show databases;
    - use lahmansbaseballdb;
    - select * from batting where playerID = 'choosh01';

---

## 파이썬에서 레먼데이터베이스내 데이터 조작하기

우리는 SQLAlchemy라는 라이브러리를 활용하여 파이썬에서 레먼데이터베이스를 조작할 것임. 

### 가상 환경 세팅

현재 구름 IDE에서 제공해주는 컨테이너에 설치되어 있는 파이썬 패키지 목록을 확인하고 싶으면 `pip list` 명령을 터미널에서 실행

보다시피 이미 많은 패키지들이 현재 컨테이너에 설치되어 있음. 작업 공간이 다소 지저분한 상태.

우리는 이 많은 패키지를 다 사용하지 않을 것이고, 미리 설치되어 있는 것이 버전 충돌 등의 문제를 일으킬 수 있음. 

따라서 우리는 가상 환경을 만들어서 작업을 할 것임.

- 가상환경 생성: `python -m venv .venv`

- 가상환경 활성화: `source .venv/bin/activate`  

![스크린샷 2023-06-28 오후 12 17 46](https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/e262a667-05fb-4e11-a813-e137d724882d)

가상환경에 진입한 상황에서 `pip list`를 해보면, 작업 공간이 깨끗함을 확인할 수 있다. 

pip를 최신 버전으로 업그레이드하기 위해 `pip install --upgrade pip` 명령을 실행한다.

이제 아래 나열된 패키지들을 설치하면 된다. 

### 필요 패키지 설치

- pip install sqlalchemy
- pip install mysql-connector-python

### python에서 SQL문을 활용해서 데이터 조작하기

crud.py라는 파일 하나 생성.

```python
from sqlalchemy import create_engine, text

db_connection_info = {
    'user': 'root',
    'password': 'asdf1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'lahmansbaseballdb'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)

with engine.connect() as conn:
    rows = conn.execute(text("select * from batting where playerID = 'choosh01'"))

print(rows)
print("="*20, "추신수 선수 타격 기록 전체 조회")

for row in rows:
    print(row)
```

아마도 Access denied for user 'root'@'localhost'와 같은 에러가 뜨면서 실행이 안 될 것이다.

root 계정으로 로컬에서 접속 가능하도록 해줘야 함.

- `sudo mysql -uroot -p` 
- `SELECT User, Host, plugin FROM mysql.user;` 
- `GRANT ALL PRIVILEGES ON *.* to 'root'@'localhost' IDENTIFIED BY 'asdf1234!';`
- `UPDATE mysql.user SET plugin='mysql_native_password' WHERE User='root';`
- `FLUSH PRIVILEGES;`

위와 같이 MySQL에서 설정을 해준 후에 `python crud.py`로 파이썬 파일을 실행하면 다음과 같이 파이썬에서 SQL을 활용하여 데이터를 조회한 결과를 가지고 온 것을 확인할 수 있다. 

![image](https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/a4f6c457-3b7e-483a-a94e-04360d773bdb)

이번에는 선수 이름을 변수로 받아서 SQL문에 반영해보자. 

```python
from sqlalchemy import create_engine, text

db_connection_info = {
    'user': 'root',
    'password': 'asdf1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'lahmansbaseballdb'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)

playerID = 'choosh01'

with engine.connect() as conn:
    rows = conn.execute(text("select * from batting where playerID = :playerID"), {'playerID': playerID})

print(rows)
print("="*20, "추신수 선수 타격 기록 전체 조회")

for row in rows:
    print(row)
```

이번에는 함수 처리를 하여 코드를 재사용가능하게 해볼 것이다.

```python
from sqlalchemy import create_engine, text

db_connection_info = {
    'user': 'root',
    'password': 'asdf1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'lahmansbaseballdb'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)


def read_player_batting_data(playerID: str):
    with engine.connect() as conn:
        rows = conn.execute(text("select * from batting where playerID = :playerID"), {'playerID': playerID})
    
    row_list = [row for row in rows]
    return row_list


if __name__ == "__main__":
    choo_data = read_player_batting_data('choosh01')
    print(choo_data)
    
    kang_data = read_player_batting_data('kangju01')
    print(kang_data)
```

### 실습: 투수 기록을 조회하는 함수를 만들어보고 활용해보자

### 실습: JOIN을 활용하여 선수 성으로 데이터를 조회하는 함수를 만들어보고 활용해보자


---

## FastAPI로 레먼데이터를 제공하는 API 서버 만들기


### 필요 패키지 설치

- pip install fastapi
- pip install "uvicorn[standard]"


### 세상에서 가장 간단한 API 서버 띄우기

```python 
from fastapi import FastAPI


app = FastAPI()


@app.get("/test")
def test():
    return "테스트"
```

서버 실행 명령: `uvicorn main:app --host 0.0.0.0 --port 80 --reload`

아마 다음과 같은 내용이 콘솔에 출력되면서 서버가 실행될 것입니다.

![image](https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/ce74f495-d154-41d2-a135-6a7f864e19c2)

이제 웹 브라우저에서 주소창에 `https://kusf-sports-data-qzzgm.run.goorm.site/test`를 쳐보세요. 

여러분의 구름 IDE 컨터이너 설정에 들어가셔서 URL을 찾으셔야 합니다. 

![image](https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/8a449561-4887-401c-9e40-19db6d5a69ff)


### HTTP 메소드

- GET: 조회
- POST: 생성
- PUT: 수정
- DELETE: 삭제


### 서버로 값 전달하는 방법

1. path parameter (경로 매개변수)

2. query parameter (쿼리 매개변수)

3. Request Body

4. Header parameter


### 레먼 데이터베이스의 데이터를 api 서버를 통해 제공하기

crud.py
```python
from sqlalchemy import create_engine, text
import pandas as pd


db_connection_info = {
    'user': 'root',
    'password': 'asdf1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'lahmansbaseballdb'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)


def read_player_info(playerID: str) -> dict:
    with engine.connect() as conn:
        rows = conn.execute(text("select * from people where playerID = :playerID"), {'playerID': playerID})
        
    columns = rows.keys()
    print(columns)
    
    row_dict_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    return {
        "player_info": row_dict_list        
    }

def read_player_name(playerID: str) -> dict:
    with engine.connect() as conn:
        row = conn.execute(text("select nameFirst, nameLast from people where playerID = :playerID"), {'playerID': playerID}).one()
        
    print(row)
    name = row[0] + " " + row[1]
    return {"name": name}


def read_player_batting_data(playerID: str):
    with engine.connect() as conn:
        rows = conn.execute(text("select * from batting where playerID = :playerID"), {'playerID': playerID})
        
    columns = rows.keys()
    print(columns)
    
    row_dict_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    return {
        "batting_data": row_dict_list        
    }


def read_player_pitching_data_by_lastname(lastname: str):
    with engine.connect() as conn:
        rows = conn.execute(text("SELECT * FROM pitching LEFT OUTER JOIN people ON pitching.playerID = people.playerID WHERE people.nameLast = :nameLast"), {'nameLast': lastname})
    
    columns = rows.keys()
    
    row_dict_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    return {
        "pitching_data": row_dict_list        
    }

def read_player_pitching_data_a_season(playerID: str, yearID: str):
    with engine.connect() as conn:
        rows = conn.execute(text("select * from pitching where playerID = :playerID AND yearID = :yearID"), {'playerID': playerID, 'yearID': yearID})
        
    columns = rows.keys()
    
    row_dict_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    print(row_dict_list)
    return {
        "pitching_data": row_dict_list        
    }

def read_player_pitching_data_many_season(playerID: str, start_year: str, end_year: str):
    with engine.connect() as conn:
        rows = conn.execute(text("select * from pitching where playerID = :playerID AND yearID BETWEEN :start_year AND :end_year"), {'playerID': playerID, 'start_year': start_year, 'end_year': end_year})
        
    columns = rows.keys()
    print(columns)
    
    row_dict_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    print(row_dict_list)
    return {
        "pitching_data": row_dict_list        
    }

if __name__ == "__main__":
    choo_data = read_player_batting_data('choosh01')
    print(choo_data)
    
    kang_data = read_player_batting_data('kangju01')
    print(kang_data)
    
    ryu_data = read_player_pitching_data_by_lastname('ryu')
    print(ryu_data)
```

main.py
```python
from fastapi import FastAPI, Body, Header
from typing import Union
from typing_extensions import Annotated
from pydantic import BaseModel

import crud

class SignupRequestBodySchema(BaseModel):
    userid: str
    userpwd: str


app = FastAPI(title="레먼데이터베이스 API")


# GET 요청 예시
@app.get("/ping")
def ping():
    return "pong"


@app.get("/players/{playerID}") # 경로 매개변수 활용 예시
def get_player_info(playerID: str):
    return crud.read_player_info(playerID)


@app.get("/players/{playerID}/name") # 경로 매개변수 활용 예시
def get_player_name(playerID: str):
    return crud.read_player_name(playerID)


@app.get("/batting/{playerID}") # 경로 매개변수 활용 예시
def get_batting_data(playerID: str):
    return crud.read_player_batting_data(playerID)


@app.get("/pitching/season") # 쿼리 매개변수 활용 예시
def get_pitching_data_a_season(playerID: str, yearID: str):
    return crud.read_player_pitching_data_a_season(playerID, yearID)


@app.get("/pitching/seasons") # 쿼리 매개변수 활용 예시
def get_pitching_data_many_season(playerID: str, start_year: str, end_year: str):
    return crud.read_player_pitching_data_many_season(playerID, start_year, end_year)


@app.get("/pitching") # 쿼리 매개변수 활용 예시
def get_pitching_data_by_lastname(lastname: str):
    return crud.read_player_pitching_data_by_lastname(lastname)


@app.get("/protected") # 헤더 매개변수 활용 예시
def do_something(api_key: Union[str, None] = Header(default=None)):
    return {"api_key": api_key}


# POST 요청 예시
@app.post("/login") # request body 활용 예시
def login(userid: Annotated[str, Body()], userpwd: Annotated[str, Body()]):
    print(f"id: {userid}, pwd: {userpwd}로 로그인 시도")
    return {"id": userid, "pwd": userpwd}


@app.post("/signup") # request body 활용 예시
def login(body: SignupRequestBodySchema = Body(...)):
    print(body)
    print(f"id: {body.userid}, pwd: {body.userpwd}로 회원가입 시도")
    return body
```

---

## FastAPI로 여러분이 기획한 웹 서비스의 핵심 데이터를 제공하는 API 서버 만들기

### 테이블 만들기

만약 간단한 메모를 저장하기 위한 데이터베이스라고 가정하고 테이블을 만들어보자. 

- 데이터베이스 생성: `CREATE DATABASE my_memo;`
- 데이터베이스 사용: `USE my_memo;`
- 테이블 생성
  ```
  CREATE TABLE memo (
	title VARCHAR(100) NOT NULL,
	content VARCHAR(1000) NOT NULL,
	created_at DATETIME NOT NULL
  )CHARSET=utf8;
  ```
- 데이터 입력
  ```
  INSERT INTO memo VALUES ("Kusf 강의준비", "fastapi로 api 서버를 만드는 것을 잘 알려드려야 하는데....", "2023-06-30 10:30:00");
  INSERT INTO memo VALUES ("치킨 먹을까?", "야식으로 치킨이나 먹을까? 살 찌겠지? 이미 쪘는데 뭐. 오늘까지만 먹을까?", "2023-06-30 11:23:39");
  ```
- 데이터 조회: `SELECT * FROM memo;`

    <img width="698" alt="image" src="https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/1b3213c6-0a05-4bc7-a11d-bdbe7961ea6c">

조금 더 멋진 테이블을 만들기 위해 만들어 놓은 테이블을 삭제하자. 

- 테이블 삭제: `DROP TABLE memo;`
- 테이블 생성: 데이터 입력 시간과 수정 시간 및 memo_id를 직접 입력하지 않아도 자동으로 입력되도록 처리했음. 
  ```
  CREATE TABLE memo (
	memo_id INT AUTO_INCREMENT, 
	title VARCHAR(100) NOT NULL,
	content VARCHAR(1000) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(memo_id)
  )CHARSET=utf8;
  ```

- 데이터 입력: title, content만 입력하지만 나머지 컬럼이 저절로 잘 입력되는 것을 확인할 것.
  ```
  INSERT INTO memo (title, content) VALUES ("Kusf 강의준비", "fastapi로 api 서버를 만드는 것을 잘 알려드려야 하는데....");
  INSERT INTO memo (title, content) VALUES ("치킨 먹을까?", "야식으로 치킨이나 먹을까? 살 찌겠지? 이미 쪘는데 뭐. 오늘까지만 먹을까?");
  ```
  
- 데이터 조회: `SELECT * FROM memo;`

    <img width="941" alt="image" src="https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/1f34d300-c978-493a-9d28-12745ad17554">
  
- 데이터 수정: updated_at 컬럼 데이터가 자동으로 잘 변경된 것을 확인할 것.
  ```
  UPDATE memo SET title = '야식 고민' WHERE memo_id = 2;
  ```
- 데이터 조회: `SELECT * FROM memo;`

  <img width="945" alt="image" src="https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/3d1cd759-838c-452f-88b7-af8973afb721">

### 실습: 여러분이 기획한 서비스에서 필요한 테이블을 만들고 그 데이터를 조회하는 함수를 만들어보고 활용해보자

- 조별로 꼭 필요한 테이블을 여기에 정의해주세요. <https://docs.google.com/spreadsheets/d/1QjBxz8w-CY1ztVsVRryWC-Xa9jy0x484sYnze2WF6MQ/edit?usp=sharing>

- 중요 공지: 2023/7/8/토 수업 시간에 각 조마다 FastAPI 서버를 하나 띄워서 활용하는 것을 시연해주세요. (핵심 테이블의 데이터를 제공할 수 있는 endpoint들이 정의되어 있어야 함.)

