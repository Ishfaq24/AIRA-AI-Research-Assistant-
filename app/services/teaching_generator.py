from app.services.semantic_search import semantic_search

def generate_teaching_content(topic: str, text: str):
    # Get top relevant sentences
    results = semantic_search(text, topic, top_k=5)

    explanation = " ".join([r[0] for r in results])

    return {
        "topic": topic,
        "explanation": explanation,
        "key_points": [r[0] for r in results]
    }