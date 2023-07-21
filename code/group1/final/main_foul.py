from fastapi import FastAPI
from typing import Union
from typing_extensions import Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import crud_foul

app = FastAPI(title="레먼데이터베이스 API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/fouls")
def get_foul_data(team=None, batter=None, date=None, outcount=None, strike=None, ball=None, opposing_team=None, pitcher=None) :
    return crud_foul.read_foul_percentage(team, batter, date, outcount, strike, ball, opposing_team, pitcher)

@app.get("/batter")
def get_batter(team) :
    return crud_foul.batter_info(team)

@app.get("/pitcher")
def get_pitcher(opposing_team) :
    return crud_foul.pitcher_info(opposing_team)
