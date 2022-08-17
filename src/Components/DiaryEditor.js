import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import MyHeader from './MyHeader';
import MyBtn from './MyBtn';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotion_description: '아주 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotion_description: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotion_description: '그럭저럭',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotion_description: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotion_description: '아주 나쁨',
  },
];

const defaultDateFunc = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(defaultDateFunc(new Date()));
  const [emotion, setEmotion] = useState(3);

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headerContent={'새 일기 쓰기'}
        leftChild={<MyBtn text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
      />
      <section className='select-date'>
        <h2>오늘은 언제인가요?</h2>
        <label htmlFor='input-date' className='sr-only'>
          오늘 날짜를 골라주세요
        </label>
        <input
          id='input-date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}></input>
      </section>
      <section className='select-emotion'>
        <h2>오늘의 감정</h2>
        <div className='emotion-wrapper'>
          {emotionList.map((item) => (
            <div
              className={[
                'emotion-col',
                `emotion-${item.emotion_id}-${emotion === item.emotion_id ? true : false}`,
              ].join(' ')}
              key={item.emotion_id}
              onClick={() => setEmotion(item.emotion_id)}>
              <img src={item.emotion_img} />
              <span>{item.emotion_description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
