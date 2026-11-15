 import { useEffect, useState } from "react";
import "./Header.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AnimatedPage from "../AnimatedPage/AnimatedPage";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { CircleAlert } from "lucide-react";

 
 
export const HeaderComponent = () => {
  const [data, setData] = useState(null);
  const [vacationOpen, setVacationOpen] = useState(false);

  useEffect(() => {
    fetch("https://admin.hausarztpraxis-sander.de/wp-json/wp/v2/pages/194")
      .then((res) => {
        if (!res.ok) throw new Error("WordPress API error");
        return res.json();
      })
      .then((page) => setData(page.acf))
      .catch((err) => console.error(err));
  }, []);

  const renderSkeleton = () => (
    <Box className="header">
      <div className="container">
        <div
          className="praxis__box"
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            className="praxis__text"
            style={{
              flex: "1 1 300px",
              minWidth: 0,
            }}
          >
            <Skeleton variant="text" width="60%" height={50} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={20} />
          </div>

          <div
            className="praxis__image"
            style={{
              flex: "1 1 300px",
              minWidth: 0,
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={300} />
          </div>
        </div>
      </div>
    </Box>
  );

  if (!data) return renderSkeleton();

  // Urlaub aktivieren: ACF Checkbox
  const vacationEnabled =
    data.enabled === true ||
    data.enabled === 1 ||
    data.enabled === "1" ||
    (Array.isArray(data.enabled) &&
      data.enabled.includes("1"));

  const images = [
    data.header_image1,
    data.header_image2,
    data.header_image3,
    data.header_image4,
  ]
    .filter(Boolean)
    .map((img) =>
      img.startsWith("http")
        ? img
        : `https://hausarztpraxis-sander.de${img}`
    );

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <AnimatedPage>
      <div className="header">
        <div className="container">
          <div className="praxis__box">

            <div className="praxis__text">

              {/* URAUB BANNER */}
              {vacationEnabled && (
                <div className="vacation-banner">
                  <button
                    onClick={() => setVacationOpen(true)}
                  >
                    <span><CircleAlert /></span>
                    
                      <h3>Wichtige Information: Praxisurlaub</h3>
                  
                    <span>Mehr erfahren →</span>
                  </button>
                </div>
              )}

              {/* URAUB POPUP */}
              {vacationEnabled && vacationOpen && (
                <div
                  className="vacation-overlay"
                  onClick={() => setVacationOpen(false)}
                >
                  <div
                    className="vacation-popup"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="vacation-close"
                      onClick={() => setVacationOpen(false)}
                      aria-label="Schließen"
                    >
                      ×
                    </button>

                    <h2>{data.title}</h2>

                    <p className="vacation-date">
                      {data.date}
                    </p>

                    <p>{data.message}</p>

                    {data.substitute && (
                      <div className="vacation-substitute">
                        <strong>Vertretung:</strong>
                        <p>{data.substitute}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* BEGRÜSSUNGSTEXT */}
              <h1
                dangerouslySetInnerHTML={{
                  __html: data.header_title,
                }}
              />

              <p>{data.header_paragraph1}</p>
              <p>{data.header_paragraph2}</p>

            </div>

            {/* HEADER BILDER */}
            <div
              className="praxis__image"
              style={{ width: "100%" }}
            >
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={8000}
                arrows={false}
                showDots={false}
              >
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Header ${index + 1}`}
                    style={{ objectFit: "cover" }}
                  />
                ))}
              </Carousel>
            </div>

          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
