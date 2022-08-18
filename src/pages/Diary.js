import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MyHeader from '../Components/MyHeader';
import MyBtn from '../Components/MyBtn';
import { defaultDateFunc } from '../utils/date';
import { emotionList } from '../utils/emotionList';
import { DiaryDataContext } from '../App';

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataList = useContext(DiaryDataContext);
  const [curData, setCurData] = useState();
  useEffect(() => {
    if (dataList.length >= 1) {
      const targetData = dataList.find((item) => parseInt(item.id) === parseInt(id));
      if (targetData) {
        setCurData(targetData);
      } else {
        alert('해당 일기가 없습니다');
        navigate('/', { replace: true });
      }
    }
  }, [id, dataList]);


  if (!curData) {
    return <div>로딩중입니다</div>;
  } else {
    const curEmotion = emotionList.find((item) => parseInt(item.emotion_id) === parseInt(id))
    return (
      <div>
        <MyHeader
          headerContent={defaultDateFunc(new Date(parseInt(curData.date)))}
          leftChild={<MyBtn text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
          rightChild={<MyBtn text={'수정하기'} onClick={() => navigate(`/edit/${id}`)} />}
        />
        <article>
          <section>
            <h2>오늘의 감정</h2>
            <div>
            <img src={curEmotion.emotion_img} />
            <span>{curEmotion.emotion_description}</span>
            </div>
          </section>
        </article>
      </div>
    );
  }
};
export default Diary;
