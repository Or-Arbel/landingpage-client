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
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState({
    open: false,
    message: undefined,
    isError: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* scroll to top on route change */}
        <SnackbarContext.Provider
          value={{
            snackbarDetails,
            setSnackbarDetails,
          }}
        >
          {snackbarDetails.open && snackbarDetails.message && <Snackbar />}
          <Navbar
            setOpenModal={setOpenLoginModal}
            isLoggedIn={isLoggedIn}
            logOutFunc={() => setIsLoggedIn((prevValue) => false)}
          />
          <AnimatedRoutes isLoggedIn={isLoggedIn} />
        </SnackbarContext.Provider>
        <LoginModal
          openModal={openLoginModal}
          closeModal={() => setOpenLoginModal((prevValue) => false)}
          loginFunc={() => setIsLoggedIn((prevValue) => true)}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
