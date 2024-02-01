import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
import './App.css';
import Map from './components/Kmap'
import Main_BeforeLogin from './pages/Main_BeforeLogin';
import Main_AfterLogin from './pages/Main_AfterLogin';
import Login from './pages/Login';

function App() {

  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/main1' element={<Main_BeforeLogin/>} />
          <Route path='/main2' element={<Main_AfterLogin/>} />
          <Route path='/map' element={<Map/>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
