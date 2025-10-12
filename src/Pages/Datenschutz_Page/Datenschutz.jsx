 import './Datenschutz.css';
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Datenschutz = () => {
  const [data, setData] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/391") 
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
      <section className="datenschutz">
        <div className="datenschutz-wrapper">
          <h1>{decodeHtml(data.datenschutz_title || "Datenschutzerklärung")}</h1>

          <div
            className="datenschutz-content"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(data.datenschutz_content || ""),
            }}
          />
        </div>
      </section>
    </AnimatedPage>
  );
};
