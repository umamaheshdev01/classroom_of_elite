from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate

#setting up model

code =''

def run(command,question):

    model = ChatOpenAI(openai_api_key=code,temperature=0.9)
    prompt_template = "Answer from below paragrah ,imagine you are person named uma ,        {data}:{question} if you dont know say dont know dont give new answer "
    prompt = PromptTemplate(
    input_variables=["adjective"], template=prompt_template
    )
    llm = LLMChain(llm=model, prompt=prompt)
    ans = llm.invoke({'data':command,'question':question})
    return ans['text']







def ask(question):
    model = ChatOpenAI(openai_api_key=code,temperature=0.5)
    return model.invoke(question).content

