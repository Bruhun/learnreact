import React from "react";

export default function CardGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      backgroundColor: "white",
      color: "black",
      minHeight: "100vh",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      {children}
    </div>
  );
}