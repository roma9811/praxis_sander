 import "./Untersuchung.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Untersuchung = () => {
  const [data, setData] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/346")
      .then((res) => res.json())
      .then((data) => setData(data.acf))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width={300} height={50} />
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="60%" height={40} sx={{ mt: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
      </Box>
    );

  return (
    <AnimatedPage>
      <div className="untersuchung">
        <div className="untersuchungen__wrapper">
          <div className="container">
            <div className="untersuchungen__header">
              <h1>
                Regelmäßige <span> Untersuchungen</span>
              </h1>
            </div>
          </div>
        </div>

        {/* EKG */}
        <div className="ekg__box__wrapper">
          <div className="container ekg__box">
            {data.ekg_bild && <img src={data.ekg_bild} alt={data.ekg_bild || "EKG"} />}
            <div className="ekg__text">
              <h2>{data.ekg_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.ekg_text || ""),
                }}
              />
            </div>
          </div>
        </div>

        {/* Belastungs-EKG */}
        <div className="belastung__box__wrapper">
          <div className="container belastung__box">
            <div className="bel_ekg_text">
              <h2>{data.bel_ekg_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.bel_ekg_text || ""),
                }}
              />
            </div>
            {data.bel_ekg_bild && <img src={data.bel_ekg_bild} alt={data.bel_ekg_bild || "Bel-EKG"} />}
          </div>
        </div>

        {/* Ultraschall */}
        <div className="ultraschall__box__wrapper">
          <div className="container ultraschall__box">
            {data.ultraschall_bild && (
              <img src={data.ultraschall_bild} alt={data.ultraschall_bild || "Sono"} />
            )}
            <div className="ultraschall_text">
              <h2>{data.ultraschall_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.ultraschall_text || ""),
                }}
              />
            </div>
          </div>
        </div>

        {/* Langzeit-EKG / RR */}
        <div className="lzekg__box__wrapper">
          <div className="container lzekg__box">
            <div className="lzekg_text">
              <h2>{data.lz_ekg_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.lz_ekg_text || ""),
                }}
              />
            </div>
            {data.lz_ekg_bild && (
              <img src={data.lz_ekg_bild} alt={data.lz_ekg_bild || "LZ-EKG"} />
            )}
          </div>

          <div className="container lz_rr__box">
            {data.lz_rr_bild && (
              <img src={data.lz_rr_bild} alt={data.lz_rr_bild || "LZ-RR"} />
            )}
            <div className="lzrr_text">
              <h2>{data.lz_rr_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.lz_rr_text || ""),
                }}
              />
            </div>
          </div>
        </div>

        {/* Spirometrie */}
        <div className="spirometrie__box__wrapper">
          <div className="container spirometrie__box">
            <div className="spirometrie__text">
              <h2>{data.lufu_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.lufu_text || ""),
                }}
              />
            </div>
            {data.lufu_bild && (
              <img src={data.lufu_bild} alt={data.lufu_bild || "Spirometrie"} />
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
