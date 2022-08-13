import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import MyBtn from './Components/MyBtn';
import MyHeader from './Components/MyHeader';
import {Reset} from 'styled-reset'

function App() {
  return (
    <BrowserRouter>
    <Reset />
      <div className='App'>
    <MyHeader leftChild={<MyBtn text={'<'} />} headerContent={'감정 일기장'} rightChild={<MyBtn text={'>'}/>}/>
        {/* <MyBtn text={'버튼'}  type={'psfsdfsd'} onClick={() => alert('버튼클릭!')} /> */}
        <h1>여기는 app</h1>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
          <Route path='/diary' element={<Diary />}></Route>
          <Route path='/diary/:id' element={<Diary />}></Route>
          <Route path='/new' element={<New />}></Route>
        </Routes>
        {/* <img src={process.env.PUBLIC_URL +'/assets/emotion1.png'}></img> */}
        {/* <img src={process.env.PUBLIC_URL +'/assets/emotion5.png'}></img> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
