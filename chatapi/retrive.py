from loader import load_Text,split_Docs
from llm import run
from embed import create_DB

docs = load_Text('./uma.txt')
docs = split_Docs(docs)
db = create_DB(docs)

def ask(question):
    db.similarity_search()