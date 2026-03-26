const BASE_URL = "http://127.0.0.1:8000";

export const fetchResearch = async (topic) => {
  console.log("Calling API:", topic);

  const res = await fetch(`http://127.0.0.1:8000/research?topic=${topic}`);
  return res.json();
};

export const fetchTeach = async (topic) => {
  const res = await fetch(`${BASE_URL}/teach?topic=${topic}`);
  return res.json();
};

export const fetchSearch = async (topic, query) => {
  const res = await fetch(`${BASE_URL}/search?topic=${topic}&query=${query}`);
  return res.json();
};