 import "./Vorsorge.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import {
  Stethoscope,
  ClipboardList,
  HeartPulse,
  Sun,
  ClipboardCheck,
  Users,
  ShieldCheck,
  Activity,
  Syringe,
  Microscope,
  Scan,
} from "lucide-react";

export const Vorsorge = () => {
  const [data, setData] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const cleanHtml = (html) => decodeHtml(html.replace(/<[^>]+>/g, "").trim());

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/337")
      .then((res) => res.json())
      .then((res) => setData(res.acf))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  // --- Skeleton для загрузки ---
  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width="60%" height={50} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mt: 2 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 3 }} />
        <Skeleton variant="text" width="40%" height={30} sx={{ mt: 3 }} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ mt: 1 }} />
      </Box>
    );

  const leistungen = cleanHtml(data.vorsorge_leistungen_list || "")
    .split(/\r?\n/)
    .filter(Boolean);

  const diagnostik = cleanHtml(data.vorsorge_diagnostik_list || "")
    .split(/\r?\n/)
    .filter(Boolean);

  const leistungenIcons = [
    Stethoscope,
    ClipboardList,
    HeartPulse,
    Sun,
    ClipboardCheck,
    Users,
    ShieldCheck,
    Users,
  ];

  const diagnostikIcons = [
    Activity,
    HeartPulse,
    Stethoscope,
    Scan,
    Syringe,
    Microscope,
  ];

  const renderList = (items, icons) => (
    <ul className="vorsorge-list two-columns">
      {items.map((title, idx) => {
        const Icon = icons[idx] || Stethoscope;
        return (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="vorsorge-item"
          >
            <div className="vorsorge-icon">
              <Icon size={22} />
            </div>
            <span>{title}</span>
          </motion.li>
        );
      })}
    </ul>
  );

  return (
    <AnimatedPage>
      <div className="vorsorge">
        <div className="vorsorge__container">
          <div className="container vorsorge__box">
            <h1>Hausärztliche <span>Grundversorgung</span></h1>
          </div>
        </div>

        <div className="container">
          <div
            className="vorsorge__text"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(data.vorsorge_text || ""),
            }}
          />
        </div>

        <div className="vorsorge__services__wrapper">
          <div className="container">
            <section className="vorsorge-section">
              <h2>Unsere Leistungen im Überblick</h2>
              {renderList(leistungen, leistungenIcons)}
            </section>
          </div>
        </div>

        <div className="diagnostik">
          <div className="container">
            <section className="vorsorge-section">
              <h2>
                <span>Diagnostische Untersuchungen</span>
              </h2>
              {renderList(diagnostik, diagnostikIcons)}
            </section>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
