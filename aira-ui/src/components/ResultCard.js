import React from "react";

const ResultCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl mt-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <pre className="whitespace-pre-wrap text-gray-700">
        {content}
      </pre>
    </div>
  );
};

export default ResultCard;