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

@app.route("/data")
def batting_average():
    pitcher = request.args.get('pitcher')
    batter = request.args.get('batter')
    print(pitcher)
    if pitcher == "All Pitchers":
        return {"avg" : [".300"]}
    else:
        return {"avg" : [".250"]}

if __name__ == "__main__":
    app.run(debug=True)