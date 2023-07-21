from sqlalchemy import create_engine, text

db_connection_info = {
    'user': 'root',
    'password': 'asdf1234!',
    'host': 'localhost',
    'port': 3306,
    'database': 'foul_service'
}

db_url = f"mysql+mysqlconnector://{db_connection_info['user']}:{db_connection_info['password']}@{db_connection_info['host']}:{db_connection_info['port']}/{db_connection_info['database']}?charset=utf8"
engine = create_engine(db_url, max_overflow=0)



def read_foul_percentage(
    team=None, 
    batter=None, 
    date=None, 
    outcount=None, 
    strike=None, 
    ball=None, 
    opposing_team=None, 
    pitcher=None) :
    sql_text1 = "SELECT total_section, COUNT(foul_id)/(SELECT COUNT(foul_id) FROM foul_distribution WHERE 1=1"
    sql_text2 = ") * 100 AS foul_percentage FROM foul_distribution WHERE 1=1"
    sql_text3 = " GROUP BY total_section"
    
    if team:
        sql_text1 += f" AND team = '{team}'"
        sql_text2 += f" AND team = '{team}'"
    
    if batter:
        sql_text1 += f" AND batter = '{batter}'" 
        sql_text2 += f" AND batter = '{batter}'"
        
    if date:
        sql_text1 += f" AND foul_date = {date}"
        sql_text2 += f" AND foul_date = {date}"
        
    if outcount:
        sql_text1 += f" AND foul_outcount = {outcount}"
        sql_text2 += f" AND foul_outcount = {outcount}"
        
    if strike:
        sql_text1 += f" AND foul_ballcount_strike = {strike}"
        sql_text2 += f" AND foul_ballcount_strike = {strike}"
        
    if ball:
        sql_text1 += f" AND foul_ballcount_ball = {ball}"
        sql_text2 += f" AND foul_ballcount_ball = {ball}"
        
    if opposing_team:
        sql_text1 += f" AND opposing_team = '{opposing_team}'"
        sql_text2 += f" AND opposing_team = '{opposing_team}'"
        
    if pitcher:
        sql_text1 += f" AND pitcher = '{pitcher}'"
        sql_text2 += f" AND pitcher = '{pitcher}'"
        
    sql_text = sql_text1 + sql_text2 + sql_text3        
           
    with engine.connect() as conn:
        rows = conn.execute(text(sql_text))
        
    row_dict_list = []
    for row in rows:
        row_dict = [row[0], row[1]]
        row_dict_list.append(row_dict)
    
    return {
        "foul_percentage_data": row_dict_list        
    }

def batter_info(team) :
    sql_text = f"SELECT DISTINCT batter FROM foul_distribution WHERE team = '{team}' ORDER BY batter ASC"
    
    with engine.connect() as conn:
        rows = conn.execute(text(sql_text))
        
    row_dict_list = []
    for row in rows:
        row_dict = [row[0]]
        row_dict_list.append(row_dict)
    
    return {
        "batter": row_dict_list        
    }

def pitcher_info(opposing_team) :
    sql_text = f"SELECT DISTINCT pitcher FROM foul_distribution WHERE opposing_team = '{opposing_team}' ORDER BY pitcher ASC"
    
    with engine.connect() as conn:
        rows = conn.execute(text(sql_text))
        
    row_dict_list = []
    for row in rows:
        row_dict = [row[0]]
        row_dict_list.append(row_dict)
    
    return {
        "pitcher": row_dict_list        
    }
