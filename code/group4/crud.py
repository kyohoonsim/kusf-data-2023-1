from sqlalchemy import create_engine, text



db_connection_info = {
    'user': 'root',
    'password': 'qwer1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'game_data'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)



def read_round():
    query_str = '''
                SELECT
                    Round_num
                FROM 
                    game_info
                GROUP BY 
                    Round_num
                '''
    
    with engine.connect() as conn:
        rows = conn.execute(text(query_str))
    
    row_dict_list = []
    
    for row in rows:
        row_dict_list.append(row[0])
    
    return {"roundList" : row_dict_list}




def read_round_info(Round_num: str) -> dict:
    with engine.connect() as conn:
        rows = conn.execute(text("SELECT Game_num, Game_Date, Home_Team, Away_Team, TIME_FORMAT(Start_Time, '%H:%i') AS Start_Time FROM game_info WHERE Round_num = :Round_num"), {'Round_num': Round_num})
        
        
    columns = rows.keys()
    print(columns)
    
    row_dict_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
        
    selected_round = Round_num[1:3]
    
    
    
    return {
        # f"{selected_round}Round": row_dict_list        
        f"Round_number": row_dict_list   
    }



def update_vote_count(Round_num: str, Game_num: str) -> dict:

    with engine.connect() as conn:
        conn.execute(text("UPDATE game_info SET Vote_Count = Vote_Count + 1 WHERE Round_num = :Round_num AND Game_num = :Game_num"), {'Round_num': Round_num, 'Game_num': Game_num})
        # conn.commit()
        rows = conn.execute(text("SELECT Game_num, Vote_Count FROM game_info WHERE Round_num = :Round_num"), {'Round_num': Round_num})

          
    columns = rows.keys()
    print(columns)
    
    row_dict_list = []

    
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    
    return {"득표수" : row_dict_list}



def read_round_period():
    query_str = '''
                SELECT
                    Round_num, Game_Date
                FROM 
                    game_info
                WHERE
                    Game_num In ("1경기", "6경기")
                '''

    with engine.connect() as conn:
        rows = conn.execute(text(query_str))
            
    row_dict_list = []
    start_end_date = []

    for row in rows:
        row_dict_list.append(row[0])
        start_end_date.append(row[1])
        
    row_round = []
    row_start_date = []
    row_end_date = []
    
    for i in range(0, len(row_dict_list), 2):
        row_round.append(row_dict_list[i])
        
    for j in range(0, len(start_end_date), 2):
        row_start_date.append(start_end_date[j])
        
    for k in range(1, len(start_end_date), 2):
        row_end_date.append(start_end_date[k])

    return {"Round_row": row_round, "Start_Date": row_start_date, "End_Date": row_end_date}




if __name__ == "__main__":
    R20_data = read_sch_info('R20')
    print(R20_data)
