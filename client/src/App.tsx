import React from 'react';
import logo from './logo.svg';
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateReview from './components/CreateReview';
import Header from './components/Header';
import StartPage from './components/StartPage'
import LoginPage from './components/LoginPage'
import Background from './components/Background';
import FormsStartPage from './components/FormsStartPage';
import PopulateForms from './components/PopulateForms';
import SignupPage from './components/SignUpPage';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        <Background>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/logIn" element={<LoginPage />} />
            <Route path="/signUp" element={<SignupPage />} />
            <Route path="/create" element={<CreateReview />} />
            <Route path="/myReviews" element={<div> <FormsStartPage ><PopulateForms /></FormsStartPage> </div>} />
          </Routes>
        </Background>
      </div>

    </Router>
  );
}

export default App;
