from fastapi import FastAPI, Body, Header
from typing import Union
from typing_extensions import Annotated
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware


import pytz
import crud

selected_round = None  # 전역 변수 선언
Round_num = None
count1 = 0
count2 = 0 
count3 = 0 
count4 = 0 
count5 = 0 
count6 = 0

app = FastAPI(title="경기 일정 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/Round")
def get_round():
    return crud.read_round()



@app.get("/RoundPeriod")
def get_round_period():
    return crud.read_round_period()



@app.get("/Info/{Round_num}")
def get_round_info(Round_num: str):
    global selected_round  # 전역 변수를 사용하도록 선언
    selected_round = Round_num[1:]
    print(f"{selected_round}라운드가 선택되었습니다")
    return crud.read_round_info(Round_num)




@app.post("/CountUp")
def show_vote_count(Round_num: Annotated[str, Body()], selected_game: Annotated[int, Body()]):
    Game_num = str(selected_game) + "경기"
    print(f"{Game_num}가 선택되었습니다")
    
    return crud.update_vote_count(Round_num, Game_num)






# 서버의 기본 시간대를 UTC로 설정합니다.
server_timezone = pytz.timezone("UTC")

@app.get("/getServerTime")

def get_server_time():
    server_time = datetime.now().astimezone(server_timezone)
    # 한국 시간대로 변경하기
    korea_timezone = pytz.timezone("Asia/Seoul")
    server_time_korea = server_time.astimezone(korea_timezone)


    # 년, 월, 일만 추출하기
    year = [server_time_korea.year]
    month = [server_time_korea.month]
    day = [server_time_korea.day]

    return {"year": year, "month": month, "day": day}


