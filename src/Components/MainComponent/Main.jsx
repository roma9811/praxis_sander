 import "./Main.css";
import { useEffect, useState } from "react";
import { Clock, PhoneCall, Contact } from "lucide-react";
import { motion } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const MainComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://hausarztpraxis-sander.de/wp-json/wp/v2/pages/168")
      .then((res) => res.json())
      .then((page) => setData(page.acf))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  if (!data) {
    return (
      <div className="main">
        <div className="container">
          <div className="praxis__info" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {/* Öffnungszeiten Skeleton */}
            <Box className="öffnungszeiten__box" sx={{ flex: "1 1 300px" }}>
              <Skeleton variant="text" width="50%" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>

            {/* Telefonsprechstunden Skeleton */}
            <Box className="telefon__box" sx={{ flex: "1 1 300px" }}>
              <Skeleton variant="text" width="50%" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>

            {/* Kontakt Skeleton */}
            <Box className="kontakt__box" sx={{ flex: "1 1 300px" }}>
              <Skeleton variant="text" width="50%" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="container">
        <div className="praxis__info">
          {/* Öffnungszeiten */}
          <motion.div
            className="öffnungszeiten__box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="öffnungszeiten__header">
              <h2>
                <Clock size={30} color="#A82834" /> Öffnungszeiten:
              </h2>
            </div>
            <ul>
              <li>
                <span>Mo - Di - Do:</span><br />
                {data["mo_-_di_-_do_offnungszeiten"] || "—"}
              </li>
              <li>
                <span>Mi - Fr:</span><br />
                {data["mi_-_fr_offnungszeiten"] || "—"}
              </li>
            </ul>
          </motion.div>

          {/* Telefonsprechstunden */}
          <motion.div
            className="telefon__box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="telefon__header">
              <h2>
                <PhoneCall size={30} color="#A82834" />
                Telefonsprechstunden:
              </h2>
            </div>
            <ul>
              <li>
                <span>Mo - Di - Do: </span><br />
                {data["mo_-_di_-_do_telefonsprechstunden"] || "—"}
              </li>
              <li>
                <span>Mi - Fr:</span><br />
                {data["mi_-_fr_hours"] || "—"}
              </li>
            </ul>
          </motion.div>

          {/* Kontakt */}
          <motion.div
            className="kontakt__box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <div className="kontakt__header">
              <h2>
                <Contact size={30} color="#A82834" />
                Kontakt:
              </h2>
            </div>
            <ul>
              <li>
                <span>Telefon:</span> {data.phone || "—"}
              </li>
              <li>
                <span>Telefax:</span> {data.fax || "—"}
              </li>
              <li>
                <span>E-Mail:</span> {data.email || "—"}
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
