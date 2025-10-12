 import "./Footer.css";
import Logo from "../../Assets/Logo/logo.png";
import Play from "../../Assets/Logo/play.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const FooterComponent = () => {
  const [data, setData] = useState(null);

  const htmlToPlainText = (html) => {
    if (!html) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const decodeEscapedHtml = (str) => {
    if (!str) return "";
    const parser = new DOMParser();
    return parser.parseFromString(str, "text/html").body.textContent || "";
  };

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/291")
      .then((res) => res.json())
      .then((page) => setData(page.acf))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
 
    return (
      <div className="footer">
        <div className="container">
          <div className="footer__container" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            
            {/* Logo + Map Skeleton */}
            <Box className="logo__footer" sx={{ flex: "1 1 300px" }}>
              <Skeleton variant="rectangular" width={200} height={60} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Box>

            {/* Kontakt Skeleton */}
            <Box className="kontakt" sx={{ flex: "1 1 200px" }}>
              <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} variant="text" width="80%" height={20} sx={{ mb: 0.5 }} />
              ))}
            </Box>

            {/* Info Skeleton */}
            <Box className="info" sx={{ flex: "1 1 200px" }}>
              <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
              ))}
            </Box>

            {/* Links Skeleton */}
            <Box className="links" sx={{ flex: "1 1 200px" }}>
              <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
              {[...Array(2)].map((_, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Skeleton variant="rectangular" width={40} height={40} />
                  <Skeleton variant="text" width="70%" height={20} />
                </Box>
              ))}
            </Box>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="logo__footer">
            <img src={Logo} alt="logo" width={200} />
            <div className="anfarht">
              <iframe
                title="Anfahrt"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.1355818620325!2d8.678236815674289!3d49.554614979364746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797e02e0d8ae4c9%3A0xa8b8eb327e1cbb72!2sBergstra%C3%9Fe%2031%2C%2069469%20Weinheim!5e0!3m2!1sde!2sde!4v1655400190406!5m2!1sde!2sde"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="kontakt">
            <h2>Kontakt</h2>
            <ul>
              {data.kontakt_name && <li>{htmlToPlainText(data.kontakt_name)}</li>}
              {data.kontakt_tel && <li>{htmlToPlainText(data.kontakt_tel)}</li>}
              {data.kontakt_fax && <li>{htmlToPlainText(data.kontakt_fax)}</li>}
              {data.kontakt_email && <li>{htmlToPlainText(data.kontakt_email)}</li>}
              {data.kontakt_adresse && <li>{htmlToPlainText(data.kontakt_adresse)}</li>}
            </ul>
          </div>

          <div className="info">
            <h2>Info</h2>
            <p
              className="info__content"
              dangerouslySetInnerHTML={{
                __html: decodeEscapedHtml(data.info_text || ""),
              }}
            />
          </div>

          <div className="links">
            <h2>Links</h2>
            <ul>
              <li>
                <img src={Play} alt="" width={40} />
                <Link to="/impressum" className="impressum_link">
                  Impressum
                </Link>
              </li>
              <li>
                <img src={Play} alt="" width={40} />
                <Link to="/datenschutz" className="datenschutz_link">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
