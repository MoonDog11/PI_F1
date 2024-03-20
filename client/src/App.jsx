// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Views/Home/Home";
import CardsContainer from './Components/CardContainer/CardConatiner';
import DriverForm from "./Views/Form/Form";  // Cambiado el nombre del import
import DriverDetail from "./Views/Detail/Detail";
import Landing from "./Views/Landing/Landing";
import Contact from "./Views/Contact/Contact";
import './App.css';
import axios from "axios";
axios.defaults.baseURL = "https://pif1-production.up.railway.app"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Mostrar LandingPage en la ruta por defecto */}
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<CardsContainer />} />
        <Route path="/create" element={<DriverForm />} />
        <Route path="/driver/:id" element={<DriverDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
