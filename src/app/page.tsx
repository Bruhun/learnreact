"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  
  
  // Create states for all random/calculated values
  const [selectedImage, setSelectedImage] = useState("");
  const [brightness, setBrightness] = useState("");
  const [golden, setGolden] = useState(false);
  const [prism, setPrism] = useState(false);

  // Calculate everything in useEffect on component mount
  useEffect(() => {
    const images = [
    "/images/chess.jpg",
    "/images/man.jpg",
    "/images/home.jpg",
    "/images/monk.jpg",
    "/images/sax.jpg",
  ];
    // Random image selection
    const randIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randIndex]);
    
    // Random brightness
    const randBrightness = Math.random() * 0.8 + 0.2;
    setBrightness(`brightness(${randBrightness})`);
    
    // Special cases
    if (randBrightness > 0.95) {
      setPrism(true);
    } else if (randBrightness > 0.9) {
      setGolden(true);
    }
  }, []);

  return (
    <div style={{marginTop: "50px", display: "flex", flexDirection: "column", height: "90vh"}}>
      
      <h1 style={{fontSize: "50px", fontStyle: "italic", fontFamily: "bastligen"}}>
        <center>Fatih Cem</center>
      </h1>
      
      <div style={{
        margin: "40px auto",
        maxWidth: "600px",
        padding: "20px",
        position: "relative"
      }}>
        {selectedImage && (
          <Image 
            src={selectedImage} 
            alt="Fatih Cem" 
            width={500} 
            height={500} 
            style={{
              filter: brightness,
              border: prism 
                ? "3px solid rgb(67, 220, 255)" 
                : golden 
                  ? "2px solid gold" 
                  : "none"
            }} 
          />
        )}
      </div>
      
      <div style={{
        marginTop: "auto", 
        marginBottom: "50px",
        width: "80%",
        maxWidth: "700px",
        position: "relative",
        alignSelf: "center"
      }}>
        <p style={{
          textAlign: "center",
          fontSize: "18px",
          fontStyle: "italic",
          marginBottom: "10px"
        }}>
          &quot;Kendini Cem sananların dünyasında yaşıyoruz...&quot;
        </p>
        
        <p style={{
          textAlign: "right",
          fontSize: "16px",
          marginTop: "5px"
        }}>
          İsmi bilinmeyen kişi, -2025
        </p>
      </div>
    </div>
  );
}
