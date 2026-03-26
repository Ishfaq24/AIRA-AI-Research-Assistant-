import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import { fetchResearch, fetchTeach, fetchSearch } from "../services/api";

const Home = () => {
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const handleResearch = async () => {
    const res = await fetchResearch(topic);
    setData({
      title: "Research Preview",
      content: res.preview || JSON.stringify(res)
    });
  };

  const handleTeach = async () => {
    const res = await fetchTeach(topic);
    setData({
      title: "Teaching Output",
      content: res.explanation
    });
  };

  const handleSearch = async () => {
    const res = await fetchSearch(topic, query);
    setData({
      title: "Semantic Search Results",
      content: JSON.stringify(res.results, null, 2)
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Research Assistant</h1>

      <SearchBar topic={topic} setTopic={setTopic} />

      <div className="flex gap-2 mb-4">
        <button onClick={handleResearch} className="btn">Research</button>
        <button onClick={handleTeach} className="btn">Teach</button>
      </div>

      <input
        type="text"
        placeholder="Search inside topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 w-full rounded-lg border mb-4"
      />

      <button onClick={handleSearch} className="btn mb-4">
        Semantic Search
      </button>

      {data && <ResultCard title={data.title} content={data.content} />}
    </div>
  );
};

export default Home;