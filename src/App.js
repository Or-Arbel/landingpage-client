import React, { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import ScrollToTop from "./components/Assets/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/LoginModal/LoginModal";
import Footer from "./components/Footer/Footer";
import AnimatedRoutes from "./components/Assets/AnimatedRoutes/AnimatedRoutes";
import Snackbar from "./components/Assets/Snackbar/Snackbar";

export const SnackbarContext = createContext({});
function App() {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* scroll to top on route change */}
        <SnackbarContext.Provider
          value={{
            openSnackbar,
            setOpenSnackbar,
            snackbarMessage,
            setSnackbarMessage,
          }}
        >
          <Snackbar />
          <Navbar setOpenModal={setOpenModal} />
          <AnimatedRoutes />
        </SnackbarContext.Provider>
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
