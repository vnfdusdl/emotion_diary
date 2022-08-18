import './App.css';
import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
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
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryDataContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('diary'));
    if (storageData) {
      storageData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      if (storageData.length >= 1) {
        dataId.current = parseInt(storageData[0].id) + 1;
        dispatch({ type: 'INIT', data: storageData });
      }
    }
  }, []);

  const onCreate = (date, content, emotion) => {
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
          onCreate,
          onRemove,
          onEdit,
        }}>
        <BrowserRouter>
          <Reset />
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/edit/:id' element={<Edit />}></Route>
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
