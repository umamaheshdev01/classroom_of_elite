from fastapi import FastAPI,Request
from llm import ask
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)



@app.post("/answer")
async def read_root(request: Request):
    request_json = await request.json()
    question = request_json.get('question')
    answer = ask(question=question)
    
    url = 'http://localhost:3000/api/ai'
    data = {
      'role' : 1,
      'content' : answer,
      'user_id' : request_json.get('user')
    }
    response = requests.post(url, json=data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
