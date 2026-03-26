const BASE_URL = "http://127.0.0.1:8000";

// 🔥 Generic fetch handler (clean + reusable)
const handleRequest = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: "Backend not reachable" };
  }
};


// 🧠 Research API
export const fetchResearch = async (topic) => {
  if (!topic) return { error: "Topic is required" };

  return handleRequest(
    `${BASE_URL}/research?topic=${encodeURIComponent(topic)}`
  );
};


// 🎓 Teaching API
export const fetchTeach = async (topic) => {
  if (!topic) return { error: "Topic is required" };

  return handleRequest(
    `${BASE_URL}/teach?topic=${encodeURIComponent(topic)}`
  );
};


// 🔎 Semantic Search API
export const fetchSearch = async (topic, query) => {
  if (!topic || !query) {
    return { error: "Topic and query are required" };
  }

  return handleRequest(
    `${BASE_URL}/search?topic=${encodeURIComponent(topic)}&query=${encodeURIComponent(query)}`
  );
};


// 📊 TF-IDF API (optional)
export const fetchTFIDF = async (topic) => {
  if (!topic) return { error: "Topic is required" };

  return handleRequest(
    `${BASE_URL}/tfidf?topic=${encodeURIComponent(topic)}`
  );
};


// 🔗 Word2Vec API (optional)
export const fetchWord2Vec = async (topic, word) => {
  if (!topic || !word) {
    return { error: "Topic and word are required" };
  }

  return handleRequest(
    `${BASE_URL}/word2vec?topic=${encodeURIComponent(topic)}&query_word=${encodeURIComponent(word)}`
  );
};