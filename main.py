import os
from dotenv import load_dotenv
from typing import TypedDict, List, Dict
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables (like your OpenAI key)
load_dotenv()

# 1. DEFINE THE STATE
class LegalState(TypedDict):
    raw_documents: List[Dict[str, str]]
    extracted_entities: List[Dict]
    graph_truths: List[str]
    inconsistencies: List[str]
    deposition_questions: List[str]

# Initialize LLM (Requires OPENAI_API_KEY in .env)
llm = ChatOpenAI(model="gpt-4o", temperature=0)

# 2. DEFINE THE AGENT NODES
def parse_and_extract(state: LegalState):
    print("--- 📄 EXTRACTING ENTITIES (Mock Docling/GliNER) ---")
    extracted = [
        {"type": "Contract", "person": "Rahul Sharma", "deadline": "October 1st", "penalty": "\$50,000"},
        {"type": "Email", "person": "Rahul Sharma", "expected_delivery": "November 15th", "intent": "Concealment"}
    ]
    return {"extracted_entities": extracted}

def populate_graph(state: LegalState):
    print("--- 🕸️ POPULATING NEO4J GRAPH (Mock) ---")
    truths = [
        "Rahul Sharma signed Contract requiring Oct 1st delivery.",
        "Rahul Sharma authored Email stating Nov 15th delivery."
    ]
    return {"graph_truths": truths}

def recursive_auditor(state: LegalState):
    print("--- 🔍 AUDITING FOR INCONSISTENCIES ---")
    truths = state["graph_truths"]
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert legal auditor. Compare the following facts and identify any material inconsistencies in 1 short sentence."),
        ("user", "Facts: {facts}")
    ])
    
    chain = prompt | llm
    response = chain.invoke({"facts": "\n".join(truths)})
    print(f"Found: {response.content}\n")
    
    return {"inconsistencies": [response.content]}

def generate_deposition_strategy(state: LegalState):
    print("--- ⚖️ DRAFTING DEPOSITION QUESTIONS ---")
    inconsistencies = state["inconsistencies"]
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a litigator. Based on this inconsistency, draft a pointed deposition question that traps the witness."),
        ("user", "Inconsistency: {inconsistency}")
    ])
    
    chain = prompt | llm
    response = chain.invoke({"inconsistency": inconsistencies[0]})
    
    return {"deposition_questions": [response.content]}

# 3. BUILD THE GRAPH (STATE MACHINE)
workflow = StateGraph(LegalState)

workflow.add_node("extract", parse_and_extract)
workflow.add_node("graph_db", populate_graph)
workflow.add_node("auditor", recursive_auditor)
workflow.add_node("strategy", generate_deposition_strategy)

workflow.add_edge("extract", "graph_db")
workflow.add_edge("graph_db", "auditor")

def check_inconsistencies(state: LegalState):
    if len(state["inconsistencies"]) > 0:
        return "strategy"
    return END

workflow.add_conditional_edges("auditor", check_inconsistencies)
workflow.add_edge("strategy", END)

app = workflow.compile()

# 4. RUN THE PROTOTYPE
if __name__ == "__main__":
    if not os.getenv("OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY") == "your_actual_api_key_goes_here":
        print("⚠️ ERROR: Please add your OpenAI API key to the .env file first!")
    else:
        print("\n🚀 STARTING LEGAL AI ITERATIVE DISCOVERY...\n")
        initial_state = {
            "raw_documents": [], "extracted_entities": [], 
            "graph_truths": [], "inconsistencies": [], "deposition_questions": []
        }

        for output in app.stream(initial_state):
            pass 

        final_state = app.get_state(app).values
        print("\n=== FINAL DEPOSITION QUESTION ===")
        print(final_state["deposition_questions"][0])
        print("=================================\n")