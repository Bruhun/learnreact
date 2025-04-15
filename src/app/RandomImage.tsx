"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

type RandomImageProps = {
  imagePaths: string[]
}

export default function RandomImage({ imagePaths }: RandomImageProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [brightness, setBrightness] = useState("");
  const [borderImageSource, setBorderImageSource] = useState("linear-gradient(to right,maroon,maroon)");

  useEffect(() => {
    const randIndex = Math.floor(Math.random() * imagePaths.length);
    setSelectedImage(imagePaths[randIndex]);

    const chance = Math.random() * 100;

    const randBrightness = Math.random() * 0.8 + 0.2;
    setBrightness(`brightness(${randBrightness})`);

    let newBorderGradient = "linear-gradient(to right,gray,maroon)";
    if (randBrightness > 0.90) {
      newBorderGradient = "linear-gradient(to right,blue,green)";
    } else if (randBrightness > 0.7) {
      newBorderGradient = "linear-gradient(to right,rgb(255, 0, 0),rgb(255, 215, 0))";
    } else if (chance > 95) {
      newBorderGradient = "linear-gradient(to right,rgb(0, 255, 234),rgb(255, 0, 255))";
    }
    setBorderImageSource(newBorderGradient);

  }, [imagePaths]);


  if (!selectedImage) {
    return <div style={{ height: "508px", width: "508px", margin: "20px auto", border: "4px solid transparent" }}></div>;
  }

  return (
    <Image
      src={selectedImage}
      alt="Fatih Cem"
      width={500}
      height={500}
      style={{
        filter: brightness,
        border: "4px solid transparent",
        borderImageSource: borderImageSource,
        borderImageSlice: 1,
        display: "block",
        margin: "20px auto",
        maxWidth: "100%",
        padding: "4px"
      }}
    />
  );
}