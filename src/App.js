
import './App.css';
import React,{useEffect} from 'react';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import {Routes,Route} from "react-router-dom";
import ErrorPage from './components/ErrorPage.js';
import Profile from './components/Profile';
import AllData from './components/AllData';
import DataAnalysis from './components/DataAnalysis';

function App() {
  
  return (
    <>

    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/alldata" element={<AllData/>}/>
          <Route path="/dataanalysis" element={<DataAnalysis/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="*" element={<ErrorPage/>} />
    </Routes>

  
    </>
  );
}

export default App;
