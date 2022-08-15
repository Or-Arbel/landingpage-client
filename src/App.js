import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import ScrollToTop from "./components/Assets/ScrollToTop";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/Assets/AnimatedRoutes";
import Snackbar from "./components/Assets/Snackbar";

export const SnackbarContext = createContext({});

function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState({
    open: false,
    message: undefined,
    isError: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    const expiration = userdata?.tokenExpiration - Date.now();

    //if no one is logged in
    if (!userdata) {
      return;
    } else {
      // there is a user that signed in and is saved in localStorage
      if (expiration <= 0) {
        // if token expired - auto log out
        localStorage.removeItem("userData");
        if (isLoggedIn) {
          setIsLoggedIn((prev) => false);
        }
      } else {
        // if token is valid (not expired) - auto log in
        if (!isLoggedIn) {
          setIsLoggedIn((prev) => true);
        } else {
          let timer = setInterval(() => {
            if (isLoggedIn && localStorage.getItem("userData")) {
              if (userdata?.tokenExpiration - Date.now() <= 0) {
                localStorage.removeItem("userData");
                setIsLoggedIn((prev) => false);
              }
            } else {
              clearInterval(timer);
            }
          }, 1000);
        }
      }
    }
  }, [isLoggedIn]);

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
            setIsLoggedIn={setIsLoggedIn}
          />
          <AnimatedRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <LoginModal
            openModal={openLoginModal}
            closeModal={() => setOpenLoginModal((prevValue) => false)}
            setIsLoggedIn={setIsLoggedIn}
          />
        </SnackbarContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
