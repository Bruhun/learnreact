
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const images = [
    "/images/chess.jpg",
    "/images/man.jpg",
    "/images/home.jpg",
    "/images/monk.jpg",
    "/images/sax.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];

  const randomBrightness = Math.random() * 0.8 + 0.2;
  const brightness = `brightness(${randomBrightness})`;

  let golden = false;
  let prism = false;
  
  if (randomBrightness > 0.95) {
    prism = true;
  } else if (randomBrightness > 0.9) {
    golden = true;
  }
  return (
    <div style={{marginTop: "50px", display: "flex", flexDirection: "column", height: "90vh"}}>
      
      <h1 style={{fontSize: "50px",fontStyle: "italic",fontFamily: "bastligen"}}> <center>Fatih Cem</center></h1>
      <div style={{
        margin: "40px auto",
        maxWidth: "600px",
        padding: "20px",
        position: "relative"
      }}>
      <img 
        src={selectedImage} 
        alt="Fatih Cem" 
        width={500} 
        height={500} 
        style={{
          filter:brightness,
          border: prism ? "3px solid rgb(67, 220, 255)" : golden ? "2px solid gold" : "none" }}   />
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
          "Kendini Cem sananların dünyasında yaşıyoruz..."
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
