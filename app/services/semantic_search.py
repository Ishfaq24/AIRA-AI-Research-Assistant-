from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
import re

def semantic_search(text: str, query: str, top_k=5):
    # Step 1: split into sentences
    sentences = nltk.sent_tokenize(text)

    # Step 2: vectorize
    vectorizer = TfidfVectorizer()
    sentence_vectors = vectorizer.fit_transform(sentences)

    # Step 3: query vector
    query_vector = vectorizer.transform([query])

    # Step 4: similarity
    similarities = cosine_similarity(query_vector, sentence_vectors).flatten()

    # Step 5: top results
    top_indices = similarities.argsort()[-top_k:][::-1]

    results = [
    (clean_sentence(sentences[i]), float(similarities[i]))
    for i in top_indices
]

    return results

def clean_sentence(sentence):
    sentence = re.sub(r"\[\d+\]", "", sentence)
    return sentence.strip()