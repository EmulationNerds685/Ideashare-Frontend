import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Close mobile menu on resize to desktop
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hstyle = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    fontFamily: "Winky Sans",
    fontWeight: "500",
    color: "white",
    
    boxSizing: "border-box",
  };

  const logoStyle = {
    fontSize: "32px",
    flex: "1",
  };

  const navstyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    margin: "10px",
  };

  const navContainerStyle = {
    display: "flex",
    gap: "20px",
  };

  const hamburgerStyle = {
    fontSize: "28px",
    cursor: "pointer",
    display: isMobile ? "block" : "none",
  };

  const mobileMenuStyle = {
    display: menuOpen ? "flex" : "none",
    flexDirection: "column",
    width: "100%",
    padding: "10px 0",
    
    alignItems: "center",
  };

  return (
    <div style={hstyle}>
      <div style={logoStyle}>IdeaShare</div>

      {/* Hamburger Icon */}
      <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Desktop Nav */}
      {!isMobile && (
        <div style={navContainerStyle}>
          <Link to="/" style={navstyle}>Home</Link>
          <Link to="/about" style={navstyle}>About</Link>
          <Link to="/services" style={navstyle}>Services</Link>
          <Link to="/posts" style={navstyle}>Blogs</Link>
          <Link to="/contact" style={navstyle}>Contact</Link>
        </div>
      )}

      {/* Mobile Nav */}
      {isMobile && menuOpen && (
        <div style={mobileMenuStyle}>
          <Link to="/" style={navstyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" style={navstyle} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" style={navstyle} onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/posts" style={navstyle} onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link to="/contact" style={navstyle} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
