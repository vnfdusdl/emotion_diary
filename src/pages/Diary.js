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

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장- 일기 상세 보기`
  },[])

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
    const curEmotion = emotionList.find(
      (item) => parseInt(item.emotion_id) === parseInt(curData.emotion)
    );
    return (
      <div className='Diary'>
        <MyHeader
          headerContent={defaultDateFunc(new Date(parseInt(curData.date)))}
          leftChild={<MyBtn text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
          rightChild={<MyBtn text={'수정하기'} onClick={() => navigate(`/edit/${id}`)} />}
        />
        <article className='diary-content'>
          <section className='emotion-wrapper'>
            <h2>오늘의 감정</h2>
            <div
              className={[
                'emotion-image-wrapper',
                `emotion-image-wrapper-${curEmotion.emotion_id}`,
              ].join(' ')}>
              <img src={curEmotion.emotion_img} />
              <span>{curEmotion.emotion_description}</span>
            </div>
          </section>
          <section className='content-wrapper'>
            <h2>오늘의 일기</h2>
            <p className='diary-content'>{curData.content}</p>
          </section>
        </article>
      </div>
    );
  }
};
export default Diary;
