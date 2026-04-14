"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

type RandomImageProps = {
  imagePaths: string[]
}

export default function RandomImage({ imagePaths }: RandomImageProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [compressedSrc, setCompressedSrc] = useState("");
  const [brightness, setBrightness] = useState("");
  const [borderClass, setBorderClass] = useState("");
  const [floatNumber, setFloatNumber] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    document.body.style.transition = "background-color 600ms ease-in-out, background-image 600ms ease-in-out";
    selectRandomImage();
    
    return () => {
      document.body.style.transition = "";
    };
  }, [imagePaths]);

  const selectRandomImage = () => {
    const randIndex = Math.floor(Math.random() * imagePaths.length);
    setSelectedImage(imagePaths[randIndex]);

    // YÜKSEK FLOAT = DAHA İYİ KALİTE MANTIĞI
    const currentFloat = Math.random();
    setFloatNumber(currentFloat);

    // Brightness: Float yüksekse (iyi resim) parlak, düşükse (bozuk resim) karanlık
    const randBrightness = currentFloat > 0.5 ? 1 : 0.4 + (currentFloat * 0.6);
    setBrightness(`brightness(${randBrightness})`);

    // Border: Yüksek float daha nadir/iyi
    let newBorderClass = "border";
    if (currentFloat > 0.95) {
      newBorderClass = "border-prismatic";
    } else if (currentFloat > 0.8) {
      newBorderClass = "border-uncommon";
    } else if (currentFloat > 0.6) {
      newBorderClass = "border-common";
    }
    setBorderClass(newBorderClass);

    let patternColor = '#9C92AC';
    let bgColor = '#000000';      
    
    if (newBorderClass === 'border-common') {
      patternColor = '#FF4242';   
      bgColor = '#1a0000';        
    } else if (newBorderClass === 'border-uncommon') {
      patternColor = '#ffe924';   
      bgColor = '#201c00';        
    } else if (newBorderClass === 'border-prismatic') {
      patternColor = '#15E4FF';   
      bgColor = '#49009c';        
    }
    
    const encodedColor = patternColor.replace('#', '%23');
    const svgPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'%3E%3Cpath fill='${encodedColor}' fill-opacity='0.4' d='M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z'%3E%3C/path%3E%3C/svg%3E")`;
    
    document.body.style.backgroundImage = svgPattern;
    document.body.style.backgroundColor = bgColor;
  };

  useEffect(() => {
    if (!selectedImage) return;

    if (selectedImage.endsWith(".gif")) {
      setCompressedSrc(selectedImage);
      return;
    }

    const img = new window.Image();
    img.src = selectedImage;
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      let scale, jpegQuality;

      // AGRESİF BOZULMA MANTIĞI
      if (floatNumber < 0.1) {
        // RESİM ANLAŞILMASIN (10x10 piksellik bir dünyaya indiriyoruz)
        scale = Math.max(0.01, floatNumber * 0.05); 
        jpegQuality = 0.01; 
      } else if (floatNumber < 0.3) {
        // BAYA Kötü 
        scale = floatNumber * 0.7; 
        jpegQuality = 0.2;
      } else if (floatNumber < 0.5) {
        // BAYA Kötü 
        scale = floatNumber * 0.4; 
        jpegQuality = 0.2;
      } else if (floatNumber < 0.7) {
        // BAYA BAYA KÖTÜLEŞSİN (Net bir şekilde bozuk)
        scale = floatNumber * 0.7; 
        jpegQuality = 0.3;
      } else {
        // YÜKSEK FLOAT = İYİ KALİTE
        // 0.7 -> 1.0 arasında kalite hızla düzelir
        scale = Math.pow(floatNumber, 2); 
        jpegQuality = floatNumber;
      }

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      if (ctx) {
        // Yumuşatmayı kapat ki pikseller çamur gibi değil, kare kare görünsün
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setCompressedSrc(canvas.toDataURL("image/jpeg", jpegQuality));
      }
    };
  }, [selectedImage, floatNumber]);

  const handleReroll = () => {
    setOpacity(0);
    setTimeout(() => {
      selectRandomImage();
      setTimeout(() => setOpacity(1), 50);
    }, 300);
  };

  if (!selectedImage) {
    return <div style={{ height: "508px", width: "508px", margin: "20px auto", border: "4px solid transparent" }}></div>;
  }

  return (
    <div style={{ textAlign: "center"}} >
      <div className={`animated-border ${borderClass}`} style={{
        display: "inline-block",
        margin: "4px ",
        backgroundColor: "#000",
        lineHeight: 0 // Resim altındaki boşluğu siler
      }}>
        <Image
          src={compressedSrc || selectedImage} 
          alt="Generated Content"
          width={500}
          height={500}
          unoptimized={true} 
          style={{
            filter: brightness,
            display: "block",
            maxWidth: "100%",
            opacity: opacity,
            transition: "opacity 300ms ease-in-out, filter 300ms ease-in-out",
            // Piksellerin devasa görünmesi için en önemli ayar:
            imageRendering: floatNumber < 0.8 ? "pixelated" : "auto"
          }}
        />
      </div>
      <div style={{ fontSize: "12px", color: "white", marginTop: "4px", fontFamily: "monospace" }}>
        Vaziyet: {
          floatNumber < 0.1 ? "Annihilated" :
          floatNumber < 0.5 ? "Withering" : 
          floatNumber < 0.7 ? "Worn" : 
          floatNumber < 0.9 ? "Pristine" : "Mint"
        } ({floatNumber.toFixed(6)})
      </div>
      <button 
        onClick={handleReroll}
        style={{
          backgroundColor: "#444",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid #666",
          marginTop: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          textTransform: "uppercase"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#555"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#444"}
      >
        Inspect New Item
      </button>
    </div>
  );
}