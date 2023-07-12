from fastapi import FastAPI, Body, Header
from typing import Union
from typing_extensions import Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import crud

selected_round = None  # 전역 변수
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



@app.get("/Round/{Round_num}")
def get_sch_info(Round_num: str):
    global selected_round  # 전역 변수를 사용하도록 선언
    selected_round = Round_num[1:3]
    print(f"{selected_round}라운드가 선택되었습니다")
    return crud.read_sch_info(Round_num)



@app.get("/Rounds") # 쿼리 매개변수 활용 예시
def read_round():
    return crud.read_round()




'''
class Vote(BaseModel):
    selected_game : str
    selected_game_num : int
'''
        
    
@app.post("/votes")
def create_vote(selected_game: Annotated[int, Body()]):
    print(f"{selected_game}번 경기가 선택되었습니다")
    
    global count1, count2, count3, count4, count5, count6
    if selected_game == 1:
        count1 += 1
    elif selected_game == 2:
        count2 += 1
    elif selected_game == 3:
        count3 += 1
    elif selected_game == 4:
        count4 += 1
    elif selected_game == 5:
        count5 += 1
    elif selected_game == 6:
        count6 += 1
        
    count = count1 + count2 + count3 + count4 + count5 + count6
    
    rate1 = round(count1 / count * 100, 2)
    rate2 = round(count2 / count * 100, 2)
    rate3 = round(count3 / count * 100, 2)
    rate4 = round(count4 / count * 100, 2)
    rate5 = round(count5 / count * 100, 2)
    rate6 = round(count6 / count * 100, 2)
    
    response = (f"<{selected_round}라운드 득표 현황> 1경기: {rate1}% / 2경기: {rate2}% / 3경기: {rate3}% / 4경기: {rate4}% / 5경기: {rate5}% / 6경기: {rate6}% / select: {selected_game}")
    return {response}