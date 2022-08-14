import { useContext, useEffect, useState } from 'react';
import { DiaryDataContext } from '../App';
import MyBtn from './../Components/MyBtn';
import MyHeader from './../Components/MyHeader';
import DiaryList from './../Components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryDataContext);
  const [curData, setCurData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
    const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1).getTime();
    const newDiaryList = diaryList.filter((item) => firstDay <= item.date && item.date < lastDay);
    setCurData(newDiaryList);
  }, [diaryList, curDate]);

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
        leftChild={<MyBtn onClick={decreaseDate} />}
        rightChild={<MyBtn onClick={increaseDate} />}
      />
      <DiaryList data={curData} />
    </>
  );
};
export default Home;
