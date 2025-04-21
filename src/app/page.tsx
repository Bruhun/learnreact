import { getImagePaths } from "./utils/getImages";
import RandomImage from "./RandomImage";


export default function Home() {
  // Get all image paths from the server
  const imagePaths = getImagePaths();

  return (
    <div style={{color:"white", display: "flex",flexDirection: "column",  height: "100vh",alignItems: "center",gap: "1.5rem",justifyContent: "center"}}>
      <div style={{backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "20px", borderRadius: "10px",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", maxWidth: "580px", margin: "0 auto",}}>
      <h1 style={{fontSize: "50px", fontStyle: "italic", fontFamily: "Bastligen"}}>
        <center>Fatih Cem</center>
      </h1>
      
      {/* Pass the image paths to the client component */}
      <RandomImage imagePaths={imagePaths} />
      </div>
      <div style={{
        width: "80%",
        maxWidth: "700px",
        position: "relative",
        alignSelf: "center"
      }}>
        <p style={{
          textAlign: "center",
          fontSize: "18px",
          fontStyle: "italic",
        }}>
          &quot;Kendini Cem sananların dünyasında yaşıyoruz...&quot;
        </p>
        
        <p style={{
          textAlign: "right",
          fontSize: "16px",
        }}>
          İsmi bilinmeyen kişi, -2025
        </p>
      </div>
    </div>
  );
}
