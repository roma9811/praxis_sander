 import "./MainTwo.css";
import Play from "../../Assets/Logo/play.png";
import { HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const MainComponentTwo = () => {
  const [data, setData] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    fetch("https://admin.hausarztpraxis-sander.de/wp-json/wp/v2/pages/255")
      .then((res) => res.json())
      .then((page) => setData(page.acf))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {

    return (
      <div className="main__two">
        <div className="container">
          <div className="leistungen__container">
            <Box className="leistungen__text" sx={{ mb: 4 }}>
              <Skeleton variant="circular" width={35} height={35} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={40} />
            </Box>

            <div className="untersuchungen__container" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              {[1, 2, 3, 4].map((i) => (
                <Box key={i} className="untersuchungen__box" sx={{ flex: "1 1 250px", p: 2, borderRadius: 1 }}>
                  <Box className="box__header" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Skeleton variant="rectangular" width={50} height={50} sx={{ mr: 1 }} />
                    <Skeleton variant="text" width="60%" height={30} />
                  </Box>
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="95%" height={20} />
                </Box>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main__two">
      <div className="container">
        <div className="leistungen__container">
          <div className="leistungen__text">
            <div className="service__icon">
              <HeartPulse size={35} color="#A82834" />
            </div>
            <h1>{data.leistungen_title || "Unsere Leistungen"}</h1>
          </div>

          <div className="untersuchungen__container">

            {/* Service 1 */}
            <div className="untersuchungen__box">
              <div className="box__header">
                <img src={Play} alt="play" width={50} />
                <h3>{data.service1_title}</h3>
              </div>
              <p dangerouslySetInnerHTML={{ __html: decodeHtml(data.service1_text) }} />
            </div>

            {/* Service 2 */}
            <div className="untersuchungen__box">
              <div className="box__header box__header__two">
                <img src={Play} alt="play" width={50} />
                <h3>{data.service2_title}</h3>
              </div>
              <p dangerouslySetInnerHTML={{ __html: decodeHtml(data.service2_text) }} />
            </div>

            {/* Service 3 */}
            <div className="untersuchungen__box">
              <div className="box__header box__header__two">
                <img src={Play} alt="play" width={50} />
                <h3>{data.service3_title}</h3>
              </div>
              <p dangerouslySetInnerHTML={{ __html: decodeHtml(data.service3_text) }} />
            </div>

            {/* Service 4 */}
            <div className="untersuchungen__box">
              <div className="box__header">
                <img src={Play} alt="play" width={50} />
                <h3>{data.service4_title}</h3>
              </div>
              <p dangerouslySetInnerHTML={{ __html: decodeHtml(data.service4_text) }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
