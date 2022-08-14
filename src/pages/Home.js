import { useContext, useEffect, useState } from 'react';
import { DiaryDataContext } from '../App';
import MyBtn from './../Components/MyBtn';
import MyHeader from './../Components/MyHeader';
import DiaryList from './../Components/DiaryList';

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());

  const increaseDate = () => {
    const newDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1);
    setCurDate(newDate);
  };
  const decreaseDate = () => {
    const newDate = new Date(curDate.getFullYear(), curDate.getMonth() - 1);
    setCurDate(newDate);
  };

  return (
    <>
      <MyHeader
        headerContent={`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`}
        leftChild={<MyBtn onClick={decreaseDate}/>}
        rightChild={<MyBtn onClick={increaseDate} />}
      />
      <DiaryList />
    </>
  );
};
export default Home;
