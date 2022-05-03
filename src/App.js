import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/Assets/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import Shual from './Pages/Shual';
import Shob from './Pages/Shob';
import Report from './Pages/Report';
import ErrorPage from './Pages/ErrorPage';
import UpdateData from './Pages/UpdateData';
import LoginModal from './components/LoginModal/LoginModal';
import Footer from './components/Footer/Footer';

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* scroll to top on route change */}
        <Navbar setOpenModal={setOpenModal} />
        <Routes>
          <Route path="/" element={<Shual />} />
          <Route path="/shob" element={<Shob />} />
          <Route path="/report" element={<Report />} />
          <Route path="/update" element={<UpdateData />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
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
