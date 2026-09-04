from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

from matching import calculate_match
from rag import search_schemes


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="AI Scheme Matcher",
    description="AI-Driven Scheme Matching for Marginalized Entrepreneurs",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# LOAD SCHEME DATABASE
# =========================================================

SCHEMES_FILE = Path(__file__).parent.parent / "data" / "schemes.json"

with open(SCHEMES_FILE, "r", encoding="utf-8") as file:
    schemes = json.load(file)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "AI Scheme Matcher API is running!",
        "status": "success"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =========================================================
# GET ALL SCHEMES
# =========================================================

@app.get("/schemes")
def get_schemes():

    return {
        "total_schemes": len(schemes),
        "schemes": schemes
    }


# =========================================================
# NORMAL MATCH
# =========================================================

@app.post("/match")
def match_schemes(user: dict):

    results = []

    for scheme in schemes:

        match_result = calculate_match(
            user,
            scheme
        )

        results.append({

            # Frontend expected fields
            "id": scheme.get("id"),
            "name": scheme.get("name", "Government Scheme"),

            "match_score": match_result["score"],

            "status": match_result["status"],

            "verification_required":
                match_result["verification_required"],

            "reasons":
                match_result["reasons"],

            "missing":
                match_result["missing"],

            "benefit_type":
                scheme.get("benefit_type"),

            "documents":
                scheme.get("documents", []),

            "description":
                scheme.get("description"),

            "official_website":
                scheme.get("official_website")
                or scheme.get("official_link"),

            "source_status":
                scheme.get("source_status")
        })

    results.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return {
        "user": user,
        "matches": results
    }


# =========================================================
# AI / RAG SEARCH
# =========================================================

@app.post("/ai-search")
def ai_search(data: dict):

    query = data.get("query", "").strip()

    language = data.get(
        "language",
        "en"
    )

    if not query:

        return {
            "error": "Query is required"
        }

    results = search_schemes(
        query,
        top_k=3
    )

    formatted_results = []

    for item in results:

        scheme = item["scheme"]

        formatted_results.append({

            "id":
                scheme.get("id"),

            "name":
                scheme.get(
                    "name",
                    "Government Scheme"
                ),

            "semantic_score":
                item["semantic_score"],

            "benefit_type":
                scheme.get("benefit_type"),

            "description":
                scheme.get("description"),

            "documents":
                scheme.get("documents", []),

            "official_website":
                scheme.get("official_website")
                or scheme.get("official_link")
        })

    return {

        "query": query,

        "language": language,

        "results": formatted_results
    }


# =========================================================
# SMART MATCH
# ELIGIBILITY + AI/RAG
# =========================================================

@app.post("/smart-match")
def smart_match(user: dict):

    # -----------------------------------------------------
    # LANGUAGE
    # -----------------------------------------------------

    language = user.get(
        "language",
        "en"
    )


    # -----------------------------------------------------
    # 1. NORMAL ELIGIBILITY MATCHING
    # -----------------------------------------------------

    normal_results = []

    for scheme in schemes:

        match_result = calculate_match(
            user,
            scheme
        )

        normal_results.append({

            "scheme": scheme,

            "match_score":
                match_result["score"],

            "status":
                match_result["status"],

            "verification_required":
                match_result["verification_required"],

            "reasons":
                match_result["reasons"],

            "missing":
                match_result["missing"]
        })


    # -----------------------------------------------------
    # 2. BUILD AI QUERY
    # -----------------------------------------------------

    query = f"""
    Entrepreneur profile:

    Age: {user.get("age", "")}

    Gender: {user.get("gender", "")}

    Social Category: {user.get("category", "")}

    Annual Income: {user.get("annual_income", "")}

    Business Type: {user.get("business_type", "")}

    Required Amount: {user.get("required_amount", "")}

    State: {user.get("state", "")}

    District: {user.get("district", "")}

    Find government schemes suitable for this entrepreneur.

    Consider:
    - social category
    - gender
    - business type
    - financial requirement
    - location
    - entrepreneur profile

    Find schemes that are semantically relevant
    to this entrepreneur.
    """


    # -----------------------------------------------------
    # 3. RAG SEARCH
    # -----------------------------------------------------

    ai_results = search_schemes(
        query,
        top_k=len(schemes)
    )


    # -----------------------------------------------------
    # 4. AI SCORES
    # -----------------------------------------------------

    ai_scores = {}

    for item in ai_results:

        scheme_id = item["scheme"].get("id")

        if scheme_id:

            ai_scores[scheme_id] = float(
                item.get(
                    "semantic_score",
                    0
                )
            )


    # -----------------------------------------------------
    # 5. COMBINED MATCHING
    # -----------------------------------------------------

    final_results = []

    for item in normal_results:

        scheme = item["scheme"]

        scheme_id = scheme.get("id")

        eligibility_score = float(
            item["match_score"]
        )

        ai_score = float(
            ai_scores.get(
                scheme_id,
                0
            )
        )


        # Eligibility = 70%
        # AI relevance = 30%

        combined_score = round(
            (
                eligibility_score * 0.70
            )
            +
            (
                ai_score * 0.30
            ),
            2
        )


        # -------------------------------------------------
        # FINAL FRONTEND OBJECT
        # -------------------------------------------------

        final_results.append({

            # IMPORTANT
            # Frontend expects these exact fields

            "id":
                scheme.get("id"),

            "name":
                scheme.get(
                    "name",
                    "Government Scheme"
                ),

            "match_score":
                eligibility_score,

            "status":
                item["status"],

            "verification_required":
                item["verification_required"],

            "ai_relevance":
                round(
                    ai_score,
                    2
                ),

            "combined_score":
                combined_score,

            "benefit_type":
                scheme.get(
                    "benefit_type"
                ),

            "description":
                scheme.get(
                    "description"
                ),

            "reasons":
                item["reasons"],

            "missing":
                item["missing"],

            "documents":
                scheme.get(
                    "documents",
                    []
                ),

            # Frontend expects official_website
            "official_website":
                scheme.get(
                    "official_website"
                )
                or scheme.get(
                    "official_link"
                ),

            "source_status":
                scheme.get(
                    "source_status"
                )
        })


    # -----------------------------------------------------
    # 6. SORT BY COMBINED SCORE
    # -----------------------------------------------------

    final_results.sort(
        key=lambda x: x["combined_score"],
        reverse=True
    )


    # -----------------------------------------------------
    # 7. RETURN
    # -----------------------------------------------------

    return {

        "user": user,

        "language": language,

        "matches": final_results
    }