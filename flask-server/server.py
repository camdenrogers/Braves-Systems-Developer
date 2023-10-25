from flask import Flask
import pandas as pd


app = Flask(__name__)

@app.route("/matchup")
def matchup():
    return {"matchup" : ["Name1", "Name2"]}

@app.route("/pitchers")
def pitchers():
    df = pd.read_excel("data/BattedBallData.xlsx")
    df = df["PITCHER"]
    df = df.drop(columns=['Name']).reset_index(drop=True)
    json_data_split = df.to_json(orient='split')
    return json_data_split

@app.route("/batters")
def batters():
    df = pd.read_excel("data/BattedBallData.xlsx")
    df = df["BATTER"]
    df = df.drop(columns=['Name']).reset_index(drop=True)
    json_data_split = df.to_json(orient='split')
    return json_data_split

if __name__ == "__main__":
    app.run(debug=True)