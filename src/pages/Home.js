import { useState } from 'react';
import MyBtn from './../Components/MyBtn';
import MyHeader from './../Components/MyHeader';

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
        leftChild={<MyBtn text={'<'} onClick={decreaseDate} />}
        rightChild={<MyBtn text={'>'} onClick={increaseDate} />}
      />
      <h1>홈입니다</h1>
    </>
  );
};
export default Home;
