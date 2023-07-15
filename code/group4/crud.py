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
        rows = conn.execute(text("SELECT Game_num, Game_Date, Home_Team, Away_Team, TIME_FORMAT(Start_Time, '%H:%i') AS Start_Time, Vote_Count FROM game_info WHERE Round_num = :Round_num"), {'Round_num': Round_num})
        

    columns = rows.keys()
    print(columns)
    
    row_dict_list = []
    vote_count_list = []
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append({key: value for key, value in row_dict.items() if key != 'Vote_Count'})
        vote_count_list.append(row_dict['Vote_Count'])
    

    selected_round = Round_num[1:]
    
    count1 = vote_count_list[0]
    count2 = vote_count_list[1]
    count3 = vote_count_list[2]
    count4 = vote_count_list[3]
    count5 = vote_count_list[4]
    count6 = vote_count_list[5]
    count = count1 + count2 + count3 + count4 + count5 + count6
    

    if count == 0:
        rate1 = 0
        rate2 = 0
        rate3 = 0
        rate4 = 0
        rate5 = 0
        rate6 = 0
    else:    
        rate1 = round(count1 / count * 100, 2)
        rate2 = round(count2 / count * 100, 2)
        rate3 = round(count3 / count * 100, 2)
        rate4 = round(count4 / count * 100, 2)
        rate5 = round(count5 / count * 100, 2)
        rate6 = round(count6 / count * 100, 2)
    
    rate_list = []
    rate_list.append(rate1)
    rate_list.append(rate2)
    rate_list.append(rate3)
    rate_list.append(rate4)
    rate_list.append(rate5)
    rate_list.append(rate6)

        
    return {"Round_number": row_dict_list, "Updated_Vote_Count": vote_count_list, "voteResult": rate_list}



def update_vote_count(Round_num: str, Game_num: str) -> dict:

    with engine.connect() as conn:
        conn.execute(text("UPDATE game_info SET Vote_Count = Vote_Count + 1 WHERE Round_num = :Round_num AND Game_num = :Game_num"), {'Round_num': Round_num, 'Game_num': Game_num})
        conn.commit() #데이터 베이스에 변경되게 해줌
        rows = conn.execute(text("SELECT Game_num, Vote_Count FROM game_info WHERE Round_num = :Round_num"), {'Round_num': Round_num})

          
    columns = rows.keys()
    print(columns)
    
    row_dict_list = []

    
    for row in rows:
        row_dict = {column: row[idx] for idx, column in enumerate(columns)}
        row_dict_list.append(row_dict)
    
    
    return {"득표수": row_dict_list}









if __name__ == "__main__":
    R20_data = read_sch_info('R20')
    print(R20_data)
