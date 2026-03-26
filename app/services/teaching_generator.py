from app.services.semantic_search import semantic_search

def generate_teaching_content(topic: str, text: str):
    results = semantic_search(text, topic, top_k=5)

    if not results:
        return {
            "topic": topic,
            "explanation": "Sorry, I couldn't generate explanation for this topic. Try a different topic.",
            "key_points": []
        }

    explanation = " ".join([r[0] for r in results])

    return {
        "topic": topic,
        "explanation": explanation,
        "key_points": [r[0] for r in results]
    }