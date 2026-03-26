from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
import re

def semantic_search(text: str, query: str, top_k=5):
    import nltk

    if not text or len(text.strip()) == 0:
        return []

    sentences = nltk.sent_tokenize(text)

    # 🚨 FIX: remove empty/short sentences
    sentences = [s for s in sentences if len(s.strip()) > 20]

    if len(sentences) == 0:
        return []

    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity

    vectorizer = TfidfVectorizer()
    
    try:
        sentence_vectors = vectorizer.fit_transform(sentences)
    except:
        return []

    query_vector = vectorizer.transform([query])
    similarities = cosine_similarity(query_vector, sentence_vectors).flatten()

    top_indices = similarities.argsort()[-top_k:][::-1]

    results = [(sentences[i], float(similarities[i])) for i in top_indices]

    return results
def clean_sentence(sentence):
    sentence = re.sub(r"\[\d+\]", "", sentence)
    return sentence.strip()