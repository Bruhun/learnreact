"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RandomImage() {
  const [selectedImage, setSelectedImage] = useState("");
  const [brightness, setBrightness] = useState("");
  const [golden, setGolden] = useState(false);
  const [prism, setPrism] = useState(false);

  useEffect(() => {
    const images = [
      "/images/chess.jpg",
      "/images/man.jpg",
      "/images/home.jpg",
      "/images/monk.jpg",
      "/images/sax.jpg",
      "/images/trala.png",
    ];
    
    const randIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randIndex]);
    
    const randBrightness = Math.random() * 0.8 + 0.2;
    setBrightness(`brightness(${randBrightness})`);
    
    if (randBrightness > 0.95) {
      setPrism(true);
    } else if (randBrightness > 0.9) {
      setGolden(true);
    }
  }, []);

  if (!selectedImage) {
    return <div style={{ height: "500px", width: "500px", margin: "20px auto" }}></div>;
  }

  return (
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
            : "none",
        display: "block",
        margin: "20px auto",
        maxWidth: "100%"
      }} 
    />
  );
}