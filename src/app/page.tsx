import RandomImage from "./RandomImage";

export default function Home() {
  return (
    <div style={{marginTop: "50px", display: "flex", flexDirection: "column", height: "90vh"}}>
      
      <h1 style={{fontSize: "50px", fontStyle: "italic", fontFamily: "Bastligen"}}>
        <center>Fatih Cem</center>
      </h1>
      
      {/* This is your client component */}
      <RandomImage />
      
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
