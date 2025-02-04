from fastapi import FastAPI  # type: ignore
import mysql.connector  # type: ignore
from mysql.connector import errorcode
import sys

USER: str = ""
PWD: str = ""


def load_env():
    with open(".env") as f:
        for l in f.readlines():
            var, val = l.strip().split("=")
            if var == "USER":
                global USER
                USER = val
            if var == "PWD":
                global PWD
                PWD = val


load_env()
app = FastAPI()

try:
    cnx = mysql.connector.connect(
        host="127.0.0.1", port=3306, user=USER, password=PWD, database="kattes_hem"
    )
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with the username or password", file=sys.stderr)
        print(f"user: {USER}, pwd: {PWD}")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist", file=sys.stderr)
    else:
        print(err, file=sys.stderr)

cur = cnx.cursor()  # type: ignore
# cur.execute("USE kattes_hem;")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/wiki/{page}")
async def wiki_page(page: str):
    return cur.execute(f"SELECT * FROM wiki_pages WHERE name = {page}")


@app.get("/emotes/{item_id}")
async def read_item(item_id: int):
    cur.execute(f"SELECT name, src FROM emotes WHERE id = {item_id}")
    row = cur.fetchone()
    if row is None:
        return {}
    return {"name": row[0], "src": row[1]}
