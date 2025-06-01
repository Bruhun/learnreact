"use client"
import { useEffect, useState } from "react";

export default function Page21() {
  const [number, setNumber] = useState(21);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(prev => prev * 2);
    }, 10000); // 10 seconds
    if (number > 2000) {
      setNumber(21);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      color: "white", 
      display: "flex",
      flexDirection: "column",  
      height: "100vh",
      alignItems: "center",
      gap: "1.5rem",
      justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)", 
        padding: "20px", 
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        maxWidth: "580px", 
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: "50px", 
          fontStyle: "italic", 
          fontFamily: "Bastligen"
        }}>
          <center>{number}</center>
        </h1>
      </div>
    </div>
  );
} 