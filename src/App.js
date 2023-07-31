// Imports default for configure project
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Project from "./components/pages/Project";
// Layouts
import NavBar from "./components/layouts/NavBar/NavBar";
import Footer from "./components/layouts/Footer/Footer"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/company" element={<Company/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/newproject" element={<NewProject/>}/>
        <Route exact path="/project" element={<Project/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;