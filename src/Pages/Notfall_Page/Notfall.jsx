 import "./Notfall.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
import Alarm from "../../Assets/Logo/alarm.png";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const Notfall = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/325")
      .then((res) => res.json())
      .then((page) => setData(page.acf))
      .catch((err) => console.error(err));
  }, []);

  const renderSkeleton = () => (
    <AnimatedPage>
      <Box className="notfall">
        <div className="container">
          <Skeleton variant="text" width="70%" height={60} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 3 }} />
          <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 3 }} />
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
      </Box>
    </AnimatedPage>
  );

  if (!data) return renderSkeleton();

  return (
    <AnimatedPage>
      <div className="notfall">
        {/* Header */}
        <div className="notfall__wrapper">
          <div className="container">
            <div className="notfall__header">
              <h1>
                <span>Im Notfall</span> - so handeln Sie richtig!
              </h1>
            </div>
          </div>
        </div>

        {/* Akuter Notfall */}
        <div className="notfall__box">
          <div className="container">
            <h2>Akuter Notfall in der Praxis</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: decodeHtml(data.notfall_text || ""),
              }}
            />
          </div>
        </div>

        {/* Außerhalb der Sprechzeiten */}
        <div className="notfall__box2">
          <div className="container">
            <div className="notfall__box__header">
              <img
                src={Alarm}
                alt="Alarm Icon"
                width={50}
                className="alarm-icon"
              />
              <h2>Außerhalb unserer Sprechzeiten</h2>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: decodeHtml(data.auserhalb_unserer_sprechzeiten || ""),
              }}
            />
          </div>
        </div>

        {/* Wichtige Kontakte */}
        <div className="notfall__contacts">
          <div className="container">
            <h2>Wichtige Notfallkontakte</h2>

            <div className="contacts__grid">
              <div className="contact__card">
                <h3>Ärztlicher Bereitschaftsdienst:</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(
                      data.arztlicher_bereitschaftsdienst || ""
                    ),
                  }}
                />
              </div>

              <div className="contact__card">
                <h3>Giftnotruf Baden-Württemberg:</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(data.giftnotruf || ""),
                  }}
                />
              </div>

              <div className="contact__card">
                <h3>Notaufnahme:</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(data.notaufnahme || ""),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
