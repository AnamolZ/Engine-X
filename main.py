import json
import logging
import requests
from bs4 import BeautifulSoup
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Depends, FastAPI, Request, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


