 import "./Kontakt.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
import Rezept from "../../Assets/Praxis-images/rezept.webp";
import Überweisung from "../../Assets/Praxis-images/Überweisung.jpg";
import { Phone, Printer, Mail, MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

// функция для очистки HTML (если ACF возвращает <p>)
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const Kontakt = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/301")
      .then((res) => res.json())
      .then((page) => setData(page.acf))
      .catch((err) => console.error(err));
  }, []);

  // --- Пока данные загружаются — показываем Skeleton ---
  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="rectangular" width="100%" height={180} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="80%" height={40} sx={{ mt: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ mt: 2 }} />
      </Box>
    );

  // --- После загрузки данных ---
  return (
    <AnimatedPage>
      <div className="kontakt">
        <div className="kontakt__container">
          {/* Заголовок */}
          <div className="kontakt__wrapper">
            <div className="container">
              <div className="kontakt__content">
                <h1>
                  <span>Kontakt</span> aufnehmen
                </h1>
              </div>
            </div>
          </div>

          {/* PRAKTISCHER KONTAKT */}
          <div className="anschrift_wrapper">
            <div className="container">
              <h2>Praxiskontakt</h2>
              <div className="kontakt__flex">
                <ul>
                  <li>{decodeHtml(data.kontakt_name)}</li>
                  <li>
                    <Phone size={24} color="#A82834" /> {decodeHtml(data.kontakt_tel)}
                  </li>
                  <li>
                    <Printer size={24} color="#A82834" /> {decodeHtml(data.kontakt_fax)}
                  </li>
                  <li>
                    <Mail size={24} color="#A82834" /> {decodeHtml(data.kontakt_email)}
                  </li>
                  <li>
                    <MapPin size={24} color="#A82834" /> {decodeHtml(data.kontakt_adresse)}
                  </li>
                </ul>

                {/* Map */}
                <div className="map__container">
                  <iframe
                    title="Praxis Standort"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2653.433281813005!2d8.662!3d49.548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797dada19a6e2a7%3A0x123456789abcdef!2sBergstraße%2031%2C%2069469%20Weinheim!5e0!3m2!1sde!2sde!4v1691234567890!5m2!1sde!2sde"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "12px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Rezept & Überweisung */}
          <div className="rezept_bestellungen_wrapper">
            <div className="container">
              <div className="bestellung__container">
                <div className="bestellungen_box">
                  <h2>Rezept- und Überweisungsbestellungen</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(data.rezept_text || ""),
                    }}
                  />
                </div>

                <div className="rezept__überweisung__container">
                  <img
                    src={Überweisung}
                    alt="überweisung"
                    className="img__überweisung"
                  />
                  <img src={Rezept} alt="rezept" className="img__rezept" />
                </div>
              </div>
            </div>
          </div>

          {/* Terminvereinbarung */}
          <section className="termin__container">
            <div className="container">
              <div className="termin__header">
                <div className="termin_vereinbarung">
                  <Calendar size={40} color="#A82834" />
                  <h2>Terminvereinbarung</h2>
                </div>
              </div>

              <div className="termin__text_card">
                <div
                  className="termin__content"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(data.termin_text || ""),
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
};
