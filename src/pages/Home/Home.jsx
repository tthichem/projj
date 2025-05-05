import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Filter from "../../components/FilterByYear/Filter";
import Afficher from "../../components/Afficher/Afficher";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavigationBar/Navbar/Navbar";
import ReportsPopUp from "../../components/ReportsPopUp/ReportsPopUp";

const Home = ({
  theme,
  setTheme,
  setShowLogin,
  token,
  setToken,
}) => {
  const [promoSelecte, setPromoSelecte] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [showReport, setShowReport] = useState(false);

  const homeRef = useRef(null);
  const archiveRef = useRef(null);
  const aboutRef = useRef(null);
  const reportRef = useRef(null);
  const promoRefs = useRef({});

  useEffect(() => {
    if (showReport) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showReport]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionToNav = {
            "home-section": "home",
            "archive-section": "archive",
            "about-section": "about",
            "report-section": "report",
          };
          setActiveSection(sectionToNav[entry.target.id]);
        }
      });
    }, options);

    const sections = [
      { ref: homeRef, id: "home-section" },
      { ref: archiveRef, id: "archive-section" },
      { ref: aboutRef, id: "about-section" },
      { ref: reportRef, id: "report-section" },
    ];

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePromoClick = (promo) => {
    scrollToSection(archiveRef);

    if (promo && promoRefs.current[promo]) {
      setTimeout(() => {
        promoRefs.current[promo].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  };

  const handleReportClick = () => {
    setActiveSection("report");
    scrollToSection(aboutRef);
    setTimeout(() => {
      setShowReport(true);
    }, 500);
  };

  return (
    <>
      {showReport && (
        <ReportsPopUp onClose={() => setShowReport(false)} theme={theme} />
      )}

      <div className={`home ${theme}`}>
        <div className="heder">
          <Navbar
            theme={theme}
            setTheme={setTheme}
            setShowLogin={setShowLogin}
            token={token}
            setToken={setToken}
            activeSection={activeSection}
            onHomeClick={() => {
              setActiveSection("home");
              scrollToSection(homeRef);
            }}
            onArchiveClick={() => {
              setActiveSection("archive");
              scrollToSection(archiveRef);
            }}
            onAboutClick={() => {
              setActiveSection("about");
              scrollToSection(aboutRef);
            }}
            onReportClick={handleReportClick}
          />
          <div id="home-section" ref={homeRef}>
            <Header
              onDiscoverClick={() => scrollToSection(archiveRef)}
              onMoreAboutUsClick={() => scrollToSection(aboutRef)}
              theme={theme}
            />
          </div>
        </div>
        <Filter
          promoSelecte={promoSelecte}
          setPromoSelecte={setPromoSelecte}
          theme={theme}
          onPromoClick={handlePromoClick}
        />
        <hr />
        <div id="archive-section" ref={archiveRef}>
          <Afficher
            promoSelecte={promoSelecte}
            promoRefs={promoRefs}
            theme={theme}
          />
        </div>
        <div id="about-section" ref={aboutRef}>
          <About theme={theme} />
        </div>
        <div id="report-section" ref={reportRef}></div>
        <Footer
          theme={theme}
          activeSection={activeSection}
          onHomeClick={() => {
            setActiveSection("home");
            scrollToSection(homeRef);
          }}
          onArchiveClick={() => {
            setActiveSection("archive");
            scrollToSection(archiveRef);
          }}
          onAboutClick={() => {
            setActiveSection("about");
            scrollToSection(aboutRef);
          }}
          onReportClick={handleReportClick}
        />
      </div>
    </>
  );
};

export default Home;
