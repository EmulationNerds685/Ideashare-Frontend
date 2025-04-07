import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Hero = () => {
    const divstyle = {
      height: "auto",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: "30px 20px",
      boxSizing: "border-box",
    };
  
    const textStyle = {
      width: "40%",
      minWidth: "280px",
      maxWidth: "500px",
      padding: "10px",
    };
  
    const paragraphStyle = {
      fontSize: '30px',
      color: "white",
      fontFamily: "Winky Sans",
      fontWeight: "500",
      lineHeight: "1.4",
    };
  
    const imageBoxStyle = {
      width: "45%",
      minWidth: "280px",
      maxWidth: "500px",
      height: "320px",
      backgroundImage: "url('/typing.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      marginTop: "20px",
    };
  
    return (
      <div style={divstyle}>
        <div style={textStyle}>
          <p style={paragraphStyle}>
            Got something on your mind? 💭 Share your thoughts and let the world hear you!
          </p>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="success" style={{ borderRadius: "20px" }}>
              <p style={{ color: "white", fontFamily: "Winky Sans", fontWeight: "500", margin: 0 }}>
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
  