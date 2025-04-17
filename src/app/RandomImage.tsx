"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


type RandomImageProps = {
  imagePaths: string[]
}

export default function RandomImage({ imagePaths }: RandomImageProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [brightness, setBrightness] = useState("");
  const [borderClass, setBorderClass] = useState("");
  const [floatNumber, setFloatNumber] = useState(0);
  useEffect(() => {
    const randIndex = Math.floor(Math.random() * imagePaths.length);
    setSelectedImage(imagePaths[randIndex]);

    const floatNumber = Math.random();
    setFloatNumber(floatNumber);

    const randBrightness = floatNumber > 0.8 ? floatNumber * 0.2 + 0.8 : 0.5;
    setBrightness(`brightness(${randBrightness})`);

    let newBorderClass = "border";
    if (floatNumber > 0.90) {
      newBorderClass = "border-prismatic";
    } else if (floatNumber > 0.7) {
      newBorderClass = "border-uncommon";
    } else if (floatNumber > 0.5) {
      newBorderClass = "border-common";
    }
    setBorderClass(newBorderClass);

  }, [imagePaths]);


  if (!selectedImage) {
    return <div style={{ height: "508px", width: "508px", margin: "20px auto", border: "4px solid transparent" }}></div>;
  }

  return (
    <div style={{ textAlign: "center"}} >
    <div className={`animated-border ${borderClass}`} style={{
      display: "inline-block",
      margin: "20px auto"
    }}>
      <Image
        src={selectedImage}
        alt="Fatih Cem"
        width={500}
        height={500}
        style={{
          filter: brightness,
          display: "block",
          maxWidth: "100%"
        }}
      />
    </div>
    <div style={{ fontSize: "12px", color: "white",marginTop: "5px" }}>
      Float: {floatNumber.toFixed(6)}
    </div>
    </div>
  );
}