from gensim.models import Word2Vec

def train_word2vec(text):
    sentences = split_sentences(text)

    processed_sentences = [
        preprocess_pipeline(sentence)
        for sentence in sentences
    ]

    model = Word2Vec(
        processed_sentences,
        vector_size=100,
        window=5,
        min_count=2,
        workers=4
    )

    return model

def get_similar_words(model, word: str):
    if word in model.wv:
        return model.wv.most_similar(word, topn=10)
    return []