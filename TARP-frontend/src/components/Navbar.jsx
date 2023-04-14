import React, { useState } from "react";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <a className="navbar-brand mx-3 h" href="/">
        TARP
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link h" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link h" href="/sample">
              Sample
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
