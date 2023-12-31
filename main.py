import json
import logging
import requests
from bs4 import BeautifulSoup
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Depends, FastAPI, Request, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(filename='error.log', level=logging.ERROR)

app.mount("/static", StaticFiles(directory="./static"), name="static")
templates = Jinja2Templates(directory="templates")

def get_random_animal_photo(api_key: str = 'pOoUofTGrf9bk53QeVlJF4jUt0akLDdoEgm6wMOt2Cw'):
    base_url = "https://api.unsplash.com/photos/random"
    params = {"query": "random", "client_id": api_key}
    response = requests.get(base_url, params=params)
    data = response.json()

    if response.status_code == 200 and data:
        return data["urls"]["regular"]
    else:
        print(f"Error: {response.status_code}")
        return None

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request, api_key: str = Depends(get_random_animal_photo)):
    photo_url = api_key
    return templates.TemplateResponse("index.html", {"request": request, "photo_url": photo_url})

@app.post("/search")
async def search(data: dict):
    query = data.get("query")
    if not query:
        raise HTTPException(status_code=422, detail="Missing or empty 'query' field in the request body")

    try:
        result = search_wiki(query)
        return {"result": result}
    except Exception as e:
        logging.error(f"Error in search_wiki: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


def search_wiki(user_input):
    da = []
    last_word = user_input.split()[-1]
    url = "https://en.wikipedia.org/wiki/" + last_word
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")
        for i in range(len(soup.findAll('p'))):
            one_a_tag = soup.findAll('p')[i]
            da.append(one_a_tag.text)
        json_object = json.dumps(da)
        return json_object

    except requests.RequestException as e:
        logging.error(f"Error in search_wiki: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from Wikipedia: {e}")

@app.get("/favicon.ico")
async def favicon():
    return {"message": "favicon"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            try:
                result_summary = search_wiki(data)
                await websocket.send_text(result_summary)
            except Exception as e:
                logging.error(f"Error in WebSocket communication: {e}")
    except WebSocketDisconnect:
        logging.info("WebSocket connection closed")
