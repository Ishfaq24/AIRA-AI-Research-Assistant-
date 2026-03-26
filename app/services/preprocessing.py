import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Initialize once (IMPORTANT)
stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

def clean_text(text: str) -> str:
    # Remove references like [1], [2]
    text = re.sub(r"\[\d+\]", "", text)

    # Remove special characters
    text = re.sub(r"[^a-zA-Z\s]", "", text)

    # Lowercase
    text = text.lower()

    return text


def tokenize_text(text: str):
    return word_tokenize(text)

def split_sentences(text):
    return nltk.sent_tokenize(text)

def remove_stopwords(tokens):
    return [word for word in tokens if word not in stop_words and len(word) > 2]


def lemmatize_tokens(tokens):
    return [lemmatizer.lemmatize(word) for word in tokens]


def preprocess_pipeline(text: str):
    text = clean_text(text)
    tokens = tokenize_text(text)
    tokens = remove_stopwords(tokens)
    tokens = lemmatize_tokens(tokens)

    return tokens