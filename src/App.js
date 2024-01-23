import {BrowserRouter, Router, Routes, Route, Switch} from 'react-router-dom';
import './App.css';
import Map from './page/Kmap'

function App() {

  return (
  <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Map/>} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
