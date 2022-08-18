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
  let newState = [];
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
      break
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryDataContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content : '1번째 일기',
    date : 1660462724132,
  },
  {
    id: 2,
    emotion: 2,
    content : '2번째 일기',
    date : 1660462724133,
  },
  {
    id: 3,
    emotion: 3,
    content : '3번째 일기',
    date : 1660462724134,
  },
  {
    id: 4,
    emotion: 4,
    content : '4번째 일기',
    date : 1660462724135,
  },
  {
    id: 5,
    emotion: 5,
    content : '5번째 일기 31일 12시',
    date : 1661914800000,
  },
  {
    id: 6,
    emotion: 5,
    content : '6번째 일기 1일 0시',
    date : 1661958000000
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

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
