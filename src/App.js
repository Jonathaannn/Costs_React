// Imports default for configure project
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./components/pages/Home/Home";
import Company from "./components/pages/Company/Company";
import Contact from "./components/pages/Contact/Contact";
import NewProject from "./components/pages/NewProject/NewProject";
import Project from "./components/pages/Project/Project";
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