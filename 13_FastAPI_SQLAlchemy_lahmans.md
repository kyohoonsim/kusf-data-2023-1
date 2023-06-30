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

### 실습: 여러분이 기획한 서비스에서 필요한 테이블을 만들고 그 데이터를 조회하는 함수를 만들어보고 활용해보자

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

import crud


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
    print(f"id: {userid}, pwd: {userpwd}로 회원가입 시도")
    return {"id": userid, "pwd": userpwd}
```
