import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
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

function App() {

  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/main1' element={<Main_BeforeLogin/>} />
          <Route path='/main2' element={<Main_AfterLogin/>} />
          <Route path='/map' element={<Map/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/modal' element={<Modal/>}/>
          <Route path='/checkliststate' element={<ChecklistState/>}/>
          <Route path='/guide' element={<Guide/>}/>
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
