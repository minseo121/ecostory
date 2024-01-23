import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
import './App.css';
import Map from './components/Kmap'

function App() {

  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/map' element={<Map/>} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
