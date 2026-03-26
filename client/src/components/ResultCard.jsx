import React from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { FileText, Sparkles, Search as SearchIcon } from "lucide-react";

const ResultCard = ({ title, content, type = "research" }) => {
  let Icon, accentColor, bgColor;

  if (type === "research") {
    Icon = FileText;
    accentColor = "#2563eb";
    bgColor = "#eff6ff";
  } else if (type === "teach") {
    Icon = Sparkles;
    accentColor = "#9333ea";
    bgColor = "#f5f3ff";
  } else {
    Icon = SearchIcon;
    accentColor = "#059669";
    bgColor = "#ecfdf5";
  }

  const styles = {
    card: {
      width: "100%",
      maxWidth: "800px",
      margin: "20px auto",
      background: "#fff",
      borderRadius: "20px",
      border: "1px solid #eee",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "20px",
      borderBottom: "1px solid #f1f1f1",
    },
    iconBox: {
      padding: "10px",
      borderRadius: "12px",
      backgroundColor: bgColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#222",
    },
    content: {
      padding: "25px",
      lineHeight: "1.7",
      color: "#555",
    },
  };

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <Icon size={22} color={accentColor} />
        </div>
        <h2 style={styles.title}>{title}</h2>
      </div>

      <div style={styles.content}>
        <Markdown>{content}</Markdown>
      </div>
    </motion.div>
  );
};

export default ResultCard;