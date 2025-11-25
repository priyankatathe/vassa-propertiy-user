import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import HeroSection from "./Pages/Hero";
import FindHome from "./Pages/FindHome";
import ContactUs from "./Pages/Contact";
import ListProperty from "./Pages/Listproperties";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// Components for Home / About
import PropertyDreamToReality from "./Components/PropertyDreamToReality";
import ModernCitySection from "./Components/ModernLeaving";
import PropertyShowcase from "./Components/PropertyShowcase";
import WhyChooseVassa from "./Components/WhyChooseVasaa";
import DreamHomeCTA from "./Components/DreamHomeCta";
import WhatMakeUsDiffernt from "./Components/Whatsmakeusdiff";
import ProvidingExcellence from "./Components/ProvidingExcellence";
import VisionMission from "./Components/VissionMission";
import TotalProperties from "./Components/TotalProperties";
import HouseDetails from "./Components/HouseDetails";

// ⬇⬇⬇ React Toastify Add
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FindHomeHero from "./Pages/FindHomeHero";
import About4 from "./Components/About4";
import HomeCarousell from "./Components/HomeCarousell";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="overflow-hidden bg-white">
              <HeroSection />
              <PropertyDreamToReality />
              <HomeCarousell />
              <ModernCitySection />
              <PropertyShowcase />
              <WhyChooseVassa />
              <DreamHomeCTA />
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div className="overflow-hidden bg-white">
              <AboutUs />
              {/* <WhatMakeUsDiffernt /> */}
              <ProvidingExcellence />
              <VisionMission />
              <About4 />
            </div>
          }
        />

        <Route path="/find-home" element={<FindHome />} />
        {/* <Route path="/find-home" element={<FindHomeHero />} />  */}


        <Route path="/total-properties" element={<TotalProperties />} />
        <Route path="/house-details" element={<HouseDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/list" element={<ListProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />

      {/* 🔥 Toast Container (Required for Toasts to Show) */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="light"
      />
    </Router>
  );
};

export default App;
