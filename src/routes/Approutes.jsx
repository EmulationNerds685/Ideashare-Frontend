import { Routes, Route } from "react-router-dom";
import Home from "../Pages/home";
import About from "../Pages/about";
import Contact from "../Pages/contact";
import Services from "../Pages/services";
import PostCreation from "../components/PostCreation";
import Post from "../Pages/Posts";
const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/create" element={<PostCreation />} />
      <Route path="/posts" element={<Post />} />
    </Routes>
  );
};
export default Approutes;
