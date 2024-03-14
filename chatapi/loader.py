from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

#extracting document

def load_Text(path):
    loader = TextLoader(path)
    docs = loader.load()
    return docs


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=100,
    chunk_overlap=20,
    length_function=len,
    is_separator_regex=False,
)

def split_Docs(docs):
    texts = text_splitter.split_documents(docs)
    return texts




