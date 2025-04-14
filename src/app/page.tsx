import { getImagePaths } from "./utils/getImages";
import RandomImage from "./RandomImage";

export default function Home() {
  // Get all image paths from the server
  const imagePaths = getImagePaths();

  return (
    <div style={{marginTop: "50px", display: "flex", flexDirection: "column", height: "90vh"}}>
      
      <h1 style={{fontSize: "50px", fontStyle: "italic", fontFamily: "Bastligen"}}>
        <center>Fatih Cem</center>
      </h1>
      
      {/* Pass the image paths to the client component */}
      <RandomImage imagePaths={imagePaths} />
      
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
