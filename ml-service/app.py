from fastapi import FastAPI, HTTPException
import pandas as pd
import pickle
import numpy as np

with open("model.pkl", "rb") as f:
    model, label_encoder = pickle.load(f)

app = FastAPI(title="Soccer Match Predictor")

df = pd.read_csv("matches.csv")
df.columns = df.columns.str.strip()

df["HomeTeam"] = df["HomeTeam"].str.strip()
df["AwayTeam"] = df["AwayTeam"].str.strip()

df = df[[
    "HomeTeam", "AwayTeam",
    "HomeElo", "AwayElo",
    "Form3Home", "Form5Home",
    "Form3Away", "Form5Away",
    "OddHome", "OddDraw", "OddAway"
]]

df = df.dropna()

home_stats = df.groupby("HomeTeam").last()[[
    "HomeElo", "Form3Home", "Form5Home", "OddHome"
]].rename(columns={
    "HomeElo": "Elo",
    "Form3Home": "Form3",
    "Form5Home": "Form5",
    "OddHome": "Odd"
})

away_stats = df.groupby("AwayTeam").last()[[
    "AwayElo", "Form3Away", "Form5Away", "OddAway"
]].rename(columns={
    "AwayElo": "Elo",
    "Form3Away": "Form3",
    "Form5Away": "Form5",
    "OddAway": "Odd"
})

@app.get("/predict_by_teams")
def predict_by_teams(home_team: str, away_team: str):
    home_team = home_team.strip()
    away_team = away_team.strip()

    if home_team not in home_stats.index:
        raise HTTPException(status_code=404, detail=f"Home team '{home_team}' not found")
    if away_team not in away_stats.index:
        raise HTTPException(status_code=404, detail=f"Away team '{away_team}' not found")

    home = home_stats.loc[home_team]
    away = away_stats.loc[away_team]

    X = np.array([[
        home["Elo"],
        away["Elo"],
        home["Form3"],
        home["Form5"],
        away["Form3"],
        away["Form5"],
        home["Odd"],
        df["OddDraw"].mean(),
        away["Odd"]
    ]])

    probs = model.predict_proba(X)[0]
    classes = label_encoder.inverse_transform(np.arange(len(probs)))
    result = {c: float(p) for c, p in zip(classes, probs)}
    return result
