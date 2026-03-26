import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ topic, setTopic, placeholder = "Enter a research topic..." }) => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "700px",
      margin: "20px auto",
    },
    iconWrapper: {
      position: "absolute",
      top: "50%",
      left: "15px",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: "14px 16px 14px 45px",
      borderRadius: "16px",
      border: isFocused ? "1px solid #3b82f6" : "1px solid #ddd",
      outline: "none",
      fontSize: "16px",
      background: "#fff",
      boxShadow: isFocused
        ? "0 0 0 3px rgba(59,130,246,0.15)"
        : "0 4px 10px rgba(0,0,0,0.05)",
      transition: "all 0.2s ease",
      color: "#222",
    },
    icon: {
      color: isFocused ? "#3b82f6" : "#9ca3af",
      transition: "color 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconWrapper}>
        <Search size={20} style={styles.icon} />
      </div>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchBar;