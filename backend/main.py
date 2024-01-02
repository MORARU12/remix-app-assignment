from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
from fastapi import FastAPI, HTTPException
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = FastAPI()
client = OpenAI(api_key=os.getenv("TOP_SECRET_API_KEY"))

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message":"Hello, World"}

@app.get("/scrape/")
async def scrape_url(url: str):
    try:
        print("Scraping........")

        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        title = soup.title.string
        #paragraphs = [p.get_text() for p in soup.find_all('p')]

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Generate content based on the following title {title} in a sentence."},
            ]
        )
        
        return {"url": url, "content": response.choices[0].message.content}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching or parsing the page: {str(e)}")
    
    
if __name__ == "__main__":
 run(app, host="0.0.0.0", port=8000)
