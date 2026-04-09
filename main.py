import os
from typing import TypedDict, List, Dict

from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()


# 1. DEFINE THE STATE
class LegalState(TypedDict):
    raw_documents: List[Dict[str, str]]
    extracted_entities: List[Dict]
    graph_truths: List[str]
    inconsistencies: List[str]
    deposition_questions: List[str]


# 2. INITIALIZE GEMINI
llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",
    temperature=0,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)


# 3. DEFINE THE AGENT NODES
def parse_and_extract(state: LegalState):
    print("--- EXTRACTING ENTITIES (Mock) ---")
    extracted = [
        {
            "type": "Contract",
            "person": "Rahul Sharma",
            "deadline": "October 1st",
            "penalty": "\$50,000"
        },
        {
            "type": "Email",
            "person": "Rahul Sharma",
            "expected_delivery": "November 15th",
            "intent": "Concealment"
        }
    ]
    return {"extracted_entities": extracted}


def populate_graph(state: LegalState):
    print("--- POPULATING GRAPH (Mock) ---")
    truths = [
        "Rahul Sharma signed a contract requiring delivery by October 1st.",
        "Rahul Sharma authored an email stating delivery would happen on November 15th."
    ]
    return {"graph_truths": truths}


def recursive_auditor(state: LegalState):
    print("--- AUDITING FOR INCONSISTENCIES ---")
    truths = state["graph_truths"]

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            "You are an expert legal auditor. Compare the following facts and identify any material inconsistency in one short sentence."
        ),
        ("user", "Facts:\n{facts}")
    ])

    chain = prompt | llm
    response = chain.invoke({"facts": "\n".join(truths)})

    print("Found inconsistency:", response.content)
    return {"inconsistencies": [response.content]}


def generate_deposition_strategy(state: LegalState):
    print("--- GENERATING DEPOSITION QUESTION ---")
    inconsistency = state["inconsistencies"][0]

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            "You are a litigator. Based on this inconsistency, draft one sharp deposition question."
        ),
        ("user", "Inconsistency: {inconsistency}")
    ])

    chain = prompt | llm
    response = chain.invoke({"inconsistency": inconsistency})

    return {"deposition_questions": [response.content]}


# 4. BUILD THE LANGGRAPH WORKFLOW
workflow = StateGraph(LegalState)

workflow.add_node("extract", parse_and_extract)
workflow.add_node("graph_db", populate_graph)
workflow.add_node("auditor", recursive_auditor)
workflow.add_node("strategy", generate_deposition_strategy)

workflow.set_entry_point("extract")
workflow.add_edge("extract", "graph_db")
workflow.add_edge("graph_db", "auditor")


def check_inconsistencies(state: LegalState):
    if state["inconsistencies"]:
        return "strategy"
    return END


workflow.add_conditional_edges("auditor", check_inconsistencies)
workflow.add_edge("strategy", END)

app = workflow.compile()


# 5. RUN THE MVP
if __name__ == "__main__":
    if not os.getenv("GOOGLE_API_KEY"):
        print("ERROR: GOOGLE_API_KEY not found in .env")
    else:
        print("\nSTARTING LEGAL AI ASSOCIATE MVP...\n")

        initial_state = {
            "raw_documents": [
                {
                    "source": "contract.pdf",
                    "text": "The penalty for missing the delivery date of October 1st is \$50,000. Signed by Rahul Sharma."
                },
                {
                    "source": "email.txt",
                    "text": "Hi team, Rahul here. We won't be able to deliver until November 15th, but don't tell the client yet."
                }
            ],
            "extracted_entities": [],
            "graph_truths": [],
            "inconsistencies": [],
            "deposition_questions": []
        }

        final_state = app.invoke(initial_state)

        print("\n=== FINAL OUTPUT ===")
        print("Inconsistency:")
        print(final_state["inconsistencies"][0])
        print("\nDeposition Question:")
        print(final_state["deposition_questions"][0])
        print("====================\n")