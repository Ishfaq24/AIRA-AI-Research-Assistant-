from sklearn.feature_extraction.text import TfidfVectorizer

def compute_tfidf(tokens):
    # Convert tokens back to clean string
    clean_text = " ".join(tokens)

    vectorizer = TfidfVectorizer(max_features=1000)
    tfidf_matrix = vectorizer.fit_transform([clean_text])

    return {
        "features": vectorizer.get_feature_names_out(),
        "matrix_shape": tfidf_matrix.shape
    }