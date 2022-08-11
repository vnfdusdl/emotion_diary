import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import LinkTest from './Components/LinkTest';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        여기는 app
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
          <Route path='/diary' element={<Diary />}></Route>
          <Route path='/new' element={<New />}></Route>
        </Routes>
      </div>
      <LinkTest/>
    </BrowserRouter>
  );
}

export default App;
