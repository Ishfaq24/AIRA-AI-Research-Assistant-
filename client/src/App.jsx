import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Search as SearchIcon,
  Loader2,
  BrainCircuit,
} from "lucide-react";

import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import { fetchResearch, fetchTeach, fetchSearch } from "./services/api";

export default function App() {
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      // 🔍 RESEARCH
      if (action === "research") {
        const res = await fetchResearch(topic);

        let content = "";

        if (res.error) {
          content = res.error;
        } else if (res.preview) {
          content = res.preview;
        } else if (res.sample_tokens) {
          content = `
🔍 Topic: ${res.topic}

📊 Total Tokens: ${res.tokens_count}

🧠 Key Concepts:
${res.sample_tokens.slice(0, 50).join(", ")}
          `;
        } else {
          content = "No research data available.";
        }

        setData({
          title: `Research: ${topic}`,
          content,
          type: "research",
        });
      }

      // 🎓 TEACH
      else if (action === "teach") {
        const res = await fetchTeach(topic);

        setData({
          title: `Learning: ${topic}`,
          content: res.explanation || res.error || "No explanation available",
          type: "teach",
        });
      }

      // 🔎 SEMANTIC SEARCH
      else if (action === "search") {
        if (!query.trim()) return;

        const res = await fetchSearch(topic, query);

        let content = "";

        if (res.error) {
          content = res.error;
        } else if (Array.isArray(res.results)) {
          content = res.results
            .map(
              (r, i) =>
                `${i + 1}. ${r[0]}\n   (score: ${r[1].toFixed(2)})`
            )
            .join("\n\n");
        } else {
          content = "No results found.";
        }

        setData({
          title: `Search: ${query}`,
          content,
          type: "search",
        });
      }
    } catch (err) {
      setData({
        title: "Error",
        content: "Something went wrong 🚫",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0f172a, #1e293b, #020617)",
      color: "white",
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif",
    },

    header: {
      textAlign: "center",
      marginBottom: "50px",
    },

    logoBox: {
      background: "linear-gradient(135deg, #3b82f6, #9333ea)",
      padding: "15px",
      borderRadius: "16px",
      display: "inline-flex",
      marginBottom: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    },

    title: {
      fontSize: "42px",
      fontWeight: "700",
    },

    subtitle: {
      color: "#94a3b8",
      marginTop: "10px",
    },

    section: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      marginBottom: "40px",
    },

    actions: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
    },

    glassCard: {
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "20px",
      border: "1px solid rgba(255,255,255,0.1)",
    },

    input: {
      flex: 1,
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      outline: "none",
      background: "rgba(255,255,255,0.08)",
      color: "white",
    },

    searchBtn: {
      background: "#10b981",
      border: "none",
      padding: "12px",
      borderRadius: "12px",
      cursor: "pointer",
    },

    footer: {
      textAlign: "center",
      marginTop: "40px",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <motion.div style={styles.header}>
        <div style={styles.logoBox}>
          <BrainCircuit size={30} color="white" />
        </div>
        <h1 style={styles.title}>MindMap AI</h1>
        <p style={styles.subtitle}>
          Research • Learn • Explore — smarter
        </p>
      </motion.div>

      {/* SEARCH */}
      <div style={styles.section}>
        <SearchBar topic={topic} setTopic={setTopic} />

        <div style={styles.actions}>
          <ActionButton
            label="Research"
            icon={<BookOpen size={18} />}
            onClick={() => handleAction("research")}
            disabled={loading}
            color="#3b82f6"
          />
          <ActionButton
            label="Explain"
            icon={<GraduationCap size={18} />}
            onClick={() => handleAction("teach")}
            disabled={loading}
            color="#9333ea"
          />
        </div>
      </div>

      {/* SEMANTIC SEARCH */}
      {topic && (
        <div style={{ ...styles.glassCard, maxWidth: "700px", margin: "auto" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask deeper..."
              style={styles.input}
            />
            <button
              onClick={() => handleAction("search")}
              style={styles.searchBtn}
            >
              <SearchIcon color="white" />
            </button>
          </div>
        </div>
      )}

      {/* RESULTS */}
      <div style={{ marginTop: "40px" }}>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Loader2 className="spin" />
            <p>Thinking...</p>
          </div>
        ) : (
          <AnimatePresence>
            {data && (
              <ResultCard
                title={data.title}
                content={data.content}
                type={data.type}
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* FOOTER */}
      {!data && (
        <div style={styles.footer}>
          Try: "AI Agents", "Blockchain", "OS Scheduling"
        </div>
      )}
    </div>
  );
}

function ActionButton({ label, icon, onClick, disabled, color }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: color,
        border: "none",
        padding: "12px 18px",
        borderRadius: "14px",
        color: "white",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}