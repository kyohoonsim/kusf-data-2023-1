from fastapi import FastAPI, Body, Header
from typing import Union
from typing_extensions import Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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



@app.get("/Info/{Round_num}")
def get_round_info(Round_num: str):
    global selected_round  # 전역 변수를 사용하도록 선언
    selected_round = Round_num[1:3]
    print(f"{selected_round}라운드가 선택되었습니다")
    return crud.read_round_info(Round_num)






'''
class Vote(BaseModel):
    selected_game : str
    selected_game_num : int
'''
        
    
@app.post("/Vote")
def get_vote(selected_game: Annotated[str, Body()]):
    print(f"{selected_game}번 경기가 선택되었습니다")
    selected_game = int(selected_game)
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


    
@app.post("/CountUp")
def show_vote_count(Round_num: Annotated[str, Body()], selected_game: Annotated[int, Body()]):
    Game_num = str(selected_game) + "경기"
    print(f"{Game_num}가 선택되었습니다")
    
    return crud.update_vote_count(Round_num, Game_num)



@app.get("/RoundPeriod")
def get_round_period():
    return crud.read_round_period()


