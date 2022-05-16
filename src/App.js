import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import ScrollToTop from "./components/Assets/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/LoginModal/LoginModal";
import Footer from "./components/Footer/Footer";
import AnimatedRoutes from "./components/Assets/AnimatedRoutes/AnimatedRoutes";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* scroll to top on route change */}
        <Navbar setOpenModal={setOpenModal} />
        <AnimatedRoutes />
        <LoginModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
