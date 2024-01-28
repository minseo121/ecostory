import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
import './App.css';
import Map from './components/Kmap'
import Main_1 from './pages/Main_1';
import Main_2 from './pages/Main_2';

function App() {

  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/Main1' element={<Main_1/>} />
          <Route path='/Main2' element={<Main_2/>} />
          <Route path='/map' element={<Map/>} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
