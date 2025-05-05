import React from "react";
import "./Header.css";

const Header = ({onDiscoverClick, onMoreAboutUsClick,theme}) => {
  return (
    <div className={`header ${theme}`}>
      <div className="header-content">
        <h1>Welcome to UdlInfo!</h1>
        <p>
          A centralized platform designed to simplify access to modules,
          resources, and materials across all years and specialities.
          <br />
          Built by students, for students.
        </p>
        <div className="heder-buttons ">
          <button className="heder-button premiere" onClick={onDiscoverClick}>
            Discover Archive!
          </button>
          <button className="heder-button deuxiem" onClick={onMoreAboutUsClick}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
