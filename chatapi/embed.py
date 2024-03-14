from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

embedding = OpenAIEmbeddings(openai_api_key='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')

persist_directory = 'db/'
def create_DB(splits):
    vectordb = Chroma.from_documents(
    documents=splits,
    embedding=embedding,
    persist_directory=persist_directory
)
    return vectordb


