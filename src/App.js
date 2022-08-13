import './App.css';
import React, { createContext, useContext, useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import MyBtn from './Components/MyBtn';
import MyHeader from './Components/MyHeader';

const reducer = (state, action) => {
  const newState = [];
  switch (action.type) {
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => (it.id === action.data.id ? action.data : it));
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryDataContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const onCreat = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        date: new Date(date).getTime(),
        content,
        emotion,
        id: dataId.current++,
      },
    });
  };

  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryDataContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreat,
          onRemove,
          onEdit,
        }}>
        <BrowserRouter>
          <Reset />
          <div className='App'>
            <h1>여기는 app</h1>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/edit' element={<Edit />}></Route>
              <Route path='/diary' element={<Diary />}></Route>
              <Route path='/diary/:id' element={<Diary />}></Route>
              <Route path='/new' element={<New />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryDataContext.Provider>
  );
}

export default App;
