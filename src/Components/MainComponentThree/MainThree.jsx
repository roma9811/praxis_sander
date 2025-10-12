 import { useEffect, useState } from "react";
import "./MainThree.css";
import { Hospital } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const MainComponentThree = () => {
  const [arztData, setArztData] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/205")
      .then((res) => res.json())
      .then((data) => setArztData(data.acf))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  if (!arztData) {
    // Skeleton пока данные загружаются
    return (
      <div className="main__three">
        <div className="container">
          <div className="ärzte__header" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <Skeleton variant="circular" width={35} height={35} />
            <Skeleton variant="text" width="200px" height={40} />
          </div>

          <div className="arzt__container" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {[1, 2].map((i) => (
              <Box key={i} className={`arzt__${i}`} sx={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 1 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="70%" height={30} />
                <Skeleton variant="text" width="50%" height={25} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main__three">
      <div className="container">
        <div className="ärzte__header">
          <Hospital size={35} color="#A82834" />
          <h1>Unsere Ärzte</h1>
        </div>
        <div className="arzt__container">
          {/* Arzt One */}
          <div className="arzt__one">
            {arztData._arzt1_foto && (
              <img
                src={arztData._arzt1_foto}
                alt={arztData.arzt1_name || "Arzt 1"}
              />
            )}
            <div className="arzt__box">
              <h2>{arztData.arzt1_name || "Dr. med. Kathrin Sander"}</h2>
              <h3>{arztData.arzt1_titel || "Fachärztin für Allgemeinmedizin"}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(arztData.arzt1_beschreibung || ""),
                }}
              />
            </div>
          </div>
          {/* Arzt Two */}
          <div className="arzt__two">
            <div className="arzt__box">
              <h2>{arztData.arzt2_name || "Dr. med. Axel Sander"}</h2>
              <h3>{arztData.arzt2_titel || "Facharzt für Allgemeinmedizin"}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(arztData.arzt2_beschreibung || ""),
                }}
              />
            </div>
            {arztData._arzt2_foto && (
              <img
                src={arztData._arzt2_foto}
                alt={arztData.arzt2_name || "Arzt 2"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
