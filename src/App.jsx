import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Journey from "./pages/Journey";
import Projects from "./pages/Projects";
import Design from "./pages/Design";
import Contact from "./pages/Contact";
import Cv from "./pages/CV";
import Studio from "./pages/Studio";
import "./App.css";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="journey" element={<Journey />} />
          <Route path="projects" element={<Projects />} />
          <Route path="design" element={<Design />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cv" element={<Cv />} />
          <Route path="studio" element={<Studio />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
