import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import pickle

df = pd.read_csv("matches.csv")
df.columns = df.columns.str.strip()

df = df[[
    "HomeElo", "AwayElo",
    "Form3Home", "Form5Home",
    "Form3Away", "Form5Away",
    "OddHome", "OddDraw", "OddAway",
    "FTResult"
]]

df = df.dropna()

label_encoder = LabelEncoder()
df["FTResult"] = label_encoder.fit_transform(df["FTResult"])

X = df.drop("FTResult", axis=1)
y = df["FTResult"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = xgb.XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    eval_metric="mlogloss"
)

model.fit(X_train, y_train)

preds = model.predict(X_test)
acc = accuracy_score(y_test, preds)
print("Accuracy:", acc)

with open("model.pkl", "wb") as f:
    pickle.dump((model, label_encoder), f)

print("Model saved → model.pkl")
