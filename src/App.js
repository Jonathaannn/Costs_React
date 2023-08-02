// Imports default for configure project
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./components/pages/Home/Home";
import Company from "./components/pages/Company/Company";
import Contact from "./components/pages/Contact/Contact";
import NewProject from "./components/pages/NewProject/NewProject";
import Projects from "./components/pages/Projects/Projects";
// Layouts
import NavBar from "./components/layouts/NavBar/NavBar";
import Footer from "./components/layouts/Footer/Footer";
import Porject from "./components/pages/Project/Project";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Porject />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
