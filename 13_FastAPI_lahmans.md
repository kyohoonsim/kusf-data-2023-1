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

```

아마도 Access denied for user 'root'@'localhost'와 같은 에러가 뜨면서 실행이 안 될 것이다.

root 계정으로 로컬에서 접속 가능하도록 해줘야 함.

- SELECT User, Host, plugin FROM mysql.user; 
- GRANT ALL PRIVILEGES ON *.* to 'root'@'localhost' IDENTIFIED BY 'asdf1234!';
- UPDATE mysql.user SET plugin='mysql_native_password' WHERE User='root';
- FLUSH PRIVILEGES;

위와 같이 MySQL에서 설정을 해준 후에 `python crud.py`로 파이썬 파일을 실행하면 다음과 같이 파이썬에서 SQL을 활용하여 데이터를 조회한 결과를 가지고 온 것을 확인할 수 있다. 

![image](https://github.com/kyohoonsim/kusf-data-2023-1/assets/58966525/a4f6c457-3b7e-483a-a94e-04360d773bdb)


---

## FastAPI로 레먼데이터를 제공하는 API 서버 만들기


### 필요 패키지 설치
