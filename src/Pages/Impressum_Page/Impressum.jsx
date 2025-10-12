 import { useEffect, useState } from "react";
import "./Impressum.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Impressum = () => {
  const [data, setData] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    window.scrollTo(0, 0); 

    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/397") 
      .then((res) => res.json())
      .then((res) => setData(res.acf))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);


  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width="50%" height={50} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="85%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="95%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 3 }} />
      </Box>
    );

  return (
    <AnimatedPage>
      <section className="impressum">
        <div className="impressum-wrapper">
          <h1>{decodeHtml(data.impressum_title || "Impressum")}</h1>

          <div
            className="impressum-content"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(data.impressum_content || ""),
            }}
          />
        </div>
      </section>
    </AnimatedPage>
  );
};
