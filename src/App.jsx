import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Approutes from "./routes/Approutes";

const App = () => {
  const heroStyle = {
    backgroundImage: "url('/shubham-dhage-CPCoLrPtOPs-unsplash.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    paddingTop: "10px",
  };

  return (
    <div style={heroStyle}>
      <Router>
        <Header />
        <Approutes />
      </Router>

      {/* Responsive enhancements */}
      <style>
        {`
          @media (max-width: 768px) {
            div {
              padding-top: 20px;
            }
          }

          @media (max-width: 480px) {
            div {
              padding-top: 30px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
