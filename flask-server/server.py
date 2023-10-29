from flask import Flask, request
import pandas as pd
import cachetools


app = Flask(__name__)

# Cache the data
cache = cachetools.LRUCache(maxsize=1)  # Adjust cache size as needed
data = pd.read_excel("data/BattedBallData.xlsx")
cache['excel_data'] = data

@app.route("/matchup")
def matchup():
    return {"matchup" : ["Name1", "Name2"]}

@app.route("/pitchers")
def pitchers():
    df = cache.get('excel_data')["PITCHER"]
    df = df.drop_duplicates()
    json_data_split = df.to_json(orient='split')
    return json_data_split

@app.route("/batters")
def batters():
    df = cache.get('excel_data')["BATTER"]
    df = df.drop_duplicates()
    json_data_split = df.to_json(orient='split')
    return json_data_split

def get_average(df):
    hits = ['Single', 'Double', 'Triple', 'HomeRun']
    num_at_bats = len(df)
    df = df[df['PLAY_OUTCOME'].isin(hits)]
    num_hits = len(df)
    avg = num_hits/num_at_bats
    return avg

def get_slg(df):
    hits = ['Single', 'Double', 'Triple', 'HomeRun']
    num_at_bats = len(df)
    df = df[df['PLAY_OUTCOME'].isin(hits)]
    count_single = (df['PLAY_OUTCOME'] == 'Single').sum()
    count_double = (df['PLAY_OUTCOME'] == 'Double').sum()
    count_triple = (df['PLAY_OUTCOME'] == 'Triple').sum()
    count_hr = (df['PLAY_OUTCOME'] == 'HomeRun').sum()
    slg = (count_single + (2 * count_double) + (3 * count_triple) + (4 * count_hr))/num_at_bats
    return slg

def get_hits(df):
    hits = ['Single', 'Double', 'Triple', 'HomeRun']
    num_at_bats = len(df)
    df = df[df['PLAY_OUTCOME'].isin(hits)]
    num_hits = len(df)
    return num_hits, num_at_bats

def get_hrs(df):
    num_at_bats = len(df)
    count_hr = (df['PLAY_OUTCOME'] == 'HomeRun').sum()
    hr_rate = count_hr / num_at_bats
    return count_hr, hr_rate  

def get_bb_data(df, col_name):
    bb_data_list = df[col_name].dropna().tolist()
    average_bb_data = sum(bb_data_list) / len(bb_data_list)
    return bb_data_list, average_bb_data

@app.route("/data")
def data():
    pitcher = request.args.get('pitcher')
    batter = request.args.get('batter')

    df = cache.get('excel_data')
    all_outcomes_that_count_abs = ['Single', 'Double', 'Triple', 'HomeRun', 'Out', 'Error', 'FieldersChoice']
    df = df[df['PLAY_OUTCOME'].isin(all_outcomes_that_count_abs)]
    matchups_exist = "True"

    #If no pitcher is selected
    if(pitcher == "All Pitchers"):
        #If a batter is selected
        if(batter != "All Batters"):
            df = df[df['BATTER'] == batter]
    #If a pitcher is selected
    else:
        #If no batter is selected
        if(batter == "All Batters"):
            df = df[df['PITCHER'] == pitcher]
        #If both a pitcher and batter are selected
        else:
            df = df[(df['PITCHER'] == pitcher) & (df['BATTER'] == batter)]
            if(df.empty):
                matchups_exist = "False"

    if(matchups_exist == "False"):
        return {
            "matchups_exist" : matchups_exist
        }

    average = get_average(df)
    slg = get_slg(df)
    hits, at_bats = get_hits(df)
    hr, hr_rate = get_hrs(df)
    exit_vlo_data, average_exit_vlo = get_bb_data(df, "EXIT_SPEED")
    launch_angle_data, average_launch_angle = get_bb_data(df, "LAUNCH_ANGLE")
    exit_direction_data, average_exit_direction = get_bb_data(df, "EXIT_DIRECTION")
    hit_distance_data, average_hit_distance = get_bb_data(df, "HIT_DISTANCE")
    hang_time_data, average_hang_time = get_bb_data(df, "HANG_TIME")
    hit_spin_rate_data, average_hit_spin_rate = get_bb_data(df, "HIT_SPIN_RATE")
    
    if(pitcher == "All Pitchers" and batter == "All Batters"):
        exit_vlo_data = [average_exit_vlo]
        launch_angle_data = [average_launch_angle]
        exit_direction_data = [average_exit_direction]
        hit_distance_data = [average_hit_distance]
        hang_time_data = [average_hang_time]
        hit_spin_rate_data = [average_hit_spin_rate]

    return {
        "matchups_exist" : "True",
        "avg" : "{:.3f}".format(average).lstrip('0'),
        "slg" : "{:.3f}".format(slg).lstrip('0'),
        "hits" : hits,
        "at_bats" : at_bats,
        "hr" : str(hr),
        "hr_rate" : "{:.3f}".format(hr_rate).lstrip('0'),
        "exit_vlo_data" : exit_vlo_data,
        "launch_angle_data" : launch_angle_data,
        "exit_direction_data" : exit_direction_data,
        "hit_distance_data" : hit_distance_data,
        "hang_time_data" : hang_time_data,
        "hit_spin_rate_data" : hit_spin_rate_data
    } 


if __name__ == "__main__":
    app.run(debug=True)