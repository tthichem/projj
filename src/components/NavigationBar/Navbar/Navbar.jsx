import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../../assets/logo-dark.png";
import lightLogo from "../../../assets/logo-dar.png";
import SearchBar from "../../SearchBar/SearchBar";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { decoderToken } from "../../../utils/auth";

const Navbar = ({
  setShowLogin,
  theme,
  setTheme,
  token,
  setToken,
  activeSection,
  onHomeClick,
  onArchiveClick,
  onAboutClick,
  onReportClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = decoderToken(token);
      setUserRole(decoded?.role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsOpen(false);
  };

  //min dir refrech ykhalik mlogini
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="navbar-container">
      <div className={`navbar ${theme}`}>
        <div className="navbar-left">
          <img
            src={theme === "light" ? logo : lightLogo}
            alt="udl info logo"
            className="logo"
            onClick={onHomeClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={`navbar-menu ${isOpen ? "show" : ""}`}>
          <a
            href="#"
            className={`nav-link ${activeSection === "home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
              setIsOpen(false);
            }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link ${
              activeSection === "archive" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onArchiveClick();
              setIsOpen(false);
            }}
          >
            Archive
          </a>
          <a
            href="#"
            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onAboutClick();
              setIsOpen(false);
            }}
          >
            About
          </a>
          <a
            href="#"
            className={`nav-link ${activeSection === "report" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onReportClick();
              setIsOpen(false);
            }}
          >
            Report
          </a>
          {userRole === "superuser" && (
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
            >
              Admin
            </a>
          )}

          {userRole === "prof" && (
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/upload");
              }}
            >
              upload
            </a>
          )}

          <div className="mobiel">
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className={`login-buttona mobiel ${theme}`}
              >
                Sign in
              </button>
            ) : (
              <button onClick={logout} className="logout mobiel">
                <CiLogout size={18} />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </div>
        <div className="navbar-right">
          <div className="ser">
            <SearchBar theme={theme} />
          </div>
          <div className="theme-toggle">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <BsMoonFill size={18} style={{ transform: "rotate(-25deg)" }} />
              ) : (
                <BsSunFill size={20} />
              )}
            </button>
          </div>
          <div className="desktop">
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className={`login-buttona ${theme}`}
              >
                Sign in
              </button>
            ) : (
              <>
                <div className="profile">
                  <div className="profile-avatar">
                    <CgProfile />
                  </div>
                  <button onClick={logout} className="profile-dropdown">
                    <CiLogout size={18} />
                    <span>Sign out</span>
                  </button>
                </div>
              </>
            )}
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
