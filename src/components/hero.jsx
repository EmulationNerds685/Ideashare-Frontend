import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Hero = () => {
  const divstyle = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    boxSizing: "border-box",
    gap: "30px", // adds space between image and text
  };

  const textStyle = {
    width: "100%",
    maxWidth: "500px",
    padding: "10px",
    textAlign: "center",
  };

  const paragraphStyle = {
    fontSize: "clamp(20px, 5vw, 30px)",
    color: "white",
    fontFamily: "Winky Sans",
    fontWeight: "500",
    lineHeight: "1.5",
  };

  const imageBoxStyle = {
    width: "100%",
    maxWidth: "500px",
    height: "320px",
    backgroundImage: "url('/typing.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "20px",
  };

  return (
    <div style={divstyle}>
      <div style={textStyle}>
        <p style={paragraphStyle}>
          Got something on your mind? 💭 Share your thoughts and let the world hear you!
        </p>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="success"
            style={{ borderRadius: "20px", marginTop: "20px" }}
          >
            <p
              style={{
                color: "white",
                fontFamily: "Winky Sans",
                fontWeight: "500",
                margin: 0,
              }}
            >
              Write A Post 🚀
            </p>
          </Button>
        </Link>
      </div>
      <div style={imageBoxStyle}></div>
    </div>
  );
};

export default Hero;
