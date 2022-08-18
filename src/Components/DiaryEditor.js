import { useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { DiaryDispatchContext } from './../App';
import MyHeader from './MyHeader';
import MyBtn from './MyBtn';
import EmotionItem from './EmotionItem';
import { defaultDateFunc } from '../utils/date';
import { emotionList } from '../utils/emotionList';
// const env = process.env;
// env.PUBLIC_URL = env.PUBLIC_URL || "";

// console.log(process.env);

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState(defaultDateFunc(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const textareaRef = useRef();
  const handleEmotion = (emotion) => {
    setEmotion(emotion);
  };
  const handleQuit = () => {
    if (window.confirm('지금까지 작성한 내용은 모두 사라집니다.')) {
      navigate(-1);
    }
  };
  const handleSave = () => {
    if (content.length < 1) {
      textareaRef.current.focus();
      return;
    }
    if (isEdit) {
      onEdit(originData.id, date, content, emotion);
    } else {
      onCreate(date, content, emotion);
    }
    navigate('/', { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm('해당 일기를 삭제하시겠습니까?')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(defaultDateFunc(new Date(parseInt(originData.date))));
      setEmotion(parseInt(originData.emotion));
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headerContent={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
        leftChild={<MyBtn text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
        rightChild={isEdit && <MyBtn text={'삭제하기'} type={'negative'} onClick={handleRemove} />}
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
            <EmotionItem
              key={item.emotion_id}
              {...item}
              onClick={handleEmotion}
              isSelected={emotion === item.emotion_id ? true : false}
            />
          ))}
        </div>
      </section>
      <section className='text-wrapper'>
        <h2>오늘의 일기</h2>
        <textarea
          ref={textareaRef}
          placeholder='오늘은 어떤 일이 있었나요?'
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
      </section>
      <section className='btn-wrapper'>
        <MyBtn text={'취소하기'} onClick={handleQuit} />
        <MyBtn text={'작성완료'} type={'positive'} onClick={handleSave} />
      </section>
    </div>
  );
};

export default DiaryEditor;
