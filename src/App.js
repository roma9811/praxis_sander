 import React, { useRef} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";

import { NavbarComponent } from './Components/NavbarComponent/Navbar';
import { FooterComponent } from './Components/FooterComponent/Footer';
import { HeaderComponent } from './Components/HeaderComponent/Header';
import { MainComponent } from './Components/MainComponent/Main';
import { MainComponentTwo } from './Components/MainComponentTwo/MainTwo';
import { MainComponentThree } from './Components/MainComponentThree/MainThree';


import { Impressum } from './Pages/Impressum_Page/Impressum';
import { Datenschutz } from './Pages/Datenschutz_Page/Datenschutz';
import { Vorsorge } from './Pages/Vorsorge_Page/Vorsorge';
import { Untersuchung } from './Pages/Untersuchung_Page/Untersuchung';
import { Notfall } from "./Pages/Notfall_Page/Notfall";
import { Kontakt } from "./Pages/Kontakt_Page/Kontakt";

import { ScrollToTop } from './ScrollToTop';

function App() {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <NavbarComponent scrollToFooter={scrollToFooter} />

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Fade triggerOnce direction="up">
                    <HeaderComponent />
                  </Fade>
                  <Fade triggerOnce direction="up" cascade damping={0.5}>
                    <MainComponent />
                  </Fade>
                  <Fade triggerOnce direction="up" cascade damping={2.0}>
                    <MainComponentTwo />
                  </Fade>
                  <Fade triggerOnce direction="up" cascade damping={0.5}>
                    <MainComponentThree />
                  </Fade>
                </>
              }
            />
            <Route path="/impressum" element={<Fade triggerOnce direction="up"><Impressum /></Fade>} />
            <Route path="/datenschutz" element={<Fade triggerOnce direction="up"><Datenschutz /></Fade>} />
            <Route path="/vorsorge" element={<Fade triggerOnce direction="up"><Vorsorge /></Fade>} />
            <Route path="/untersuchungen" element={<Fade triggerOnce direction="up"><Untersuchung /></Fade>} />
            <Route path="/notfall" element={<Fade triggerOnce direction="up"><Notfall /></Fade>} />
            <Route path="/kontakt" element={<Fade triggerOnce direction="up"><Kontakt /></Fade>} />
          </Routes>
        </div>

        <Fade triggerOnce>
          <FooterComponent ref={footerRef} />
        </Fade>
      </div>
    </Router>
  );
}

export default App;
