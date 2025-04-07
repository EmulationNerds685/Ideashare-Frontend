import { Link } from 'react-router-dom';

const Header = () => {
  const hstyle = {
    height: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    fontFamily: "Winky Sans",
    fontWeight: "500",
    fontSize: "20px",
    color: "white",
  };

  const navstyle = {
    margin: "5px",
    padding: "10px",
    color: "white",
    textDecoration: 'none',
  };

  return (
    <div style={hstyle}>
      <div style={{ flexGrow: "0.8", fontSize: "40px" }}>IdeaShare</div>
      
      <Link to="/" style={navstyle}>Home</Link>
      <Link to="/about" style={navstyle}>About</Link>
      <Link to="/services" style={navstyle}>Services</Link>
      <Link to="/posts" style={navstyle}>Blogs</Link>
      <Link to="/contact" style={navstyle}>Contact</Link>
    </div>
  );
};

export default Header;
