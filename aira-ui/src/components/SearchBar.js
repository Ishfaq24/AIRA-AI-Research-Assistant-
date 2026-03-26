import React from "react";

const SearchBar = ({ topic, setTopic }) => {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter topic (e.g. Machine Learning)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="px-4 py-2 w-full rounded-lg border focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;