import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
import './App.css';
import Map from './components/Kmap'
import Main from './pages/Main';

function App() {

  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/Main' element={<Main/>} />
          <Route path='/map' element={<Map/>} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
