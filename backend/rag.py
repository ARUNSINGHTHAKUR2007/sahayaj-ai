import json
from pathlib import Path
from sentence_transformers import SentenceTransformer, util


# Scheme JSON location
SCHEMES_FILE = Path(__file__).parent / "schemes.json"

# Load schemes
with open(SCHEMES_FILE, "r", encoding="utf-8") as file:
    schemes = json.load(file)


# AI embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


def scheme_to_text(scheme):
    """
    Scheme ke structured data ko AI-searchable text mein convert karta hai.
    """

    categories = ", ".join(scheme.get("category", []))
    genders = ", ".join(scheme.get("gender", []))
    business_types = ", ".join(scheme.get("business_types", []))
    documents = ", ".join(scheme.get("documents", []))

    text = f"""
    Scheme Name: {scheme.get("name", "")}

    Description:
    {scheme.get("description", "")}

    Benefit Type:
    {scheme.get("benefit_type", "")}

    Eligible Categories:
    {categories}

    Gender:
    {genders}

    Business Types:
    {business_types}

    Minimum Age:
    {scheme.get("min_age")}

    Required Documents:
    {documents}

    Loan / Financial Support:
    {scheme.get("loan_limit", "")}
    """

    return text.strip()


# Convert all schemes into text
scheme_texts = [
    scheme_to_text(scheme)
    for scheme in schemes
]


print("Creating AI embeddings...")


# Create embeddings once when backend starts
scheme_embeddings = model.encode(
    scheme_texts,
    convert_to_tensor=True
)


print(f"AI Retriever ready with {len(schemes)} schemes.")


def search_schemes(query, top_k=3):
    """
    Natural language query ke basis par
    most relevant schemes return karta hai.
    """

    query_embedding = model.encode(
        query,
        convert_to_tensor=True
    )

    similarities = util.cos_sim(
        query_embedding,
        scheme_embeddings
    )[0]

    results = []

    for index, score in enumerate(similarities):

        results.append({
            "scheme": schemes[index],
            "semantic_score": round(
                float(score) * 100,
                2
            )
        })

    results.sort(
        key=lambda item: item["semantic_score"],
        reverse=True
    )

    return results[:top_k]


if __name__ == "__main__":

    test_query = """
    I am a woman entrepreneur and want financial
    support to start a manufacturing business.
    """

    results = search_schemes(
        test_query,
        top_k=3
    )

    print("\nAI Recommended Schemes:\n")

    for result in results:

        print(
            result["scheme"]["name"],
            "-",
            result["semantic_score"],
            "%"
        )