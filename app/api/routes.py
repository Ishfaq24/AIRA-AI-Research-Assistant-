from fastapi import APIRouter
from app.services.scraper import scrape_wikipedia
from app.services.preprocessing import preprocess_pipeline
from app.services.preprocessing import preprocess_pipeline
from app.services.embeddings import compute_tfidf
from app.services.word2vec_model import train_word2vec, get_similar_words
from app.services.semantic_search import semantic_search
from app.services.teaching_generator import generate_teaching_content

router = APIRouter()

@router.get("/research")
def research(topic: str):
    raw_text = scrape_wikipedia(topic)
    tokens = preprocess_pipeline(raw_text)

    return {
        "topic": topic,
        "raw_length": len(raw_text),
        "tokens_count": len(tokens),
        "sample_tokens": tokens[:50]
    }


@router.get("/tfidf")
def tfidf_endpoint(topic: str):
    raw_text = scrape_wikipedia(topic)
    tokens = preprocess_pipeline(raw_text)

    result = compute_tfidf(tokens)

    return {
        "topic": topic,
        "num_features": len(result["features"]),
        "sample_features": list(result["features"][:20])
    }

@router.get("/word2vec")
def word2vec_endpoint(topic: str, query_word: str):
    raw_text = scrape_wikipedia(topic)
    tokens = preprocess_pipeline(raw_text)

    model = train_word2vec(tokens)
    similar_words = get_similar_words(model, query_word)

    return {
        "query": query_word,
        "similar_words": similar_words
    }


@router.get("/search")
def search(topic: str, query: str):
    raw_text = scrape_wikipedia(topic)

    results = semantic_search(raw_text, query)

    return {
        "query": query,
        "results": results
    }

@router.get("/teach")
def teach(topic: str):
    raw_text = scrape_wikipedia(topic)

    content = generate_teaching_content(topic, raw_text)

    return content