from sqlalchemy import create_engine, text
# import pandas as pd


db_connection_info = {
    'user': 'root',
    'password': 'qwer1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'game_data'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)



def read_sch_info(Round_num: str) -> dict:
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
    
    row_list = []
    
    for row in rows:
        row_list.append(row[0])
    
    return {"roundList" : row_list}



if __name__ == "__main__":
    R20_data = read_sch_info('R20')
    print(R20_data)