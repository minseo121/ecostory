import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Map from './components/Kmap'
import Main_BeforeLogin from './pages/Main_BeforeLogin';
import Main_AfterLogin from './pages/Main_AfterLogin';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Modal from './components/Modal';
import ChecklistState from './pages/ChecklistState';
import Guide from './pages/Guide';
import PlanMain from './pages/PlanMain';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Main_AfterLogin /> : <Main_BeforeLogin />} />
          <Route path='/loginnot' element={<Main_BeforeLogin />} />
          <Route path='/map' element={<Map/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/modal' element={<Modal/>}/>
          <Route path='/checkliststate' element={<ChecklistState/>}/>
          <Route path='/guide' element={<Guide/>}/>
          <Route path='/plan' element={<PlanMain/>}/>
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
