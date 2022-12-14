import React from 'react';
import MyBtn from './MyBtn';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ emotion, content, date, id }) => {
  const navigate = useNavigate();

  const goDiary = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const diaryDate = new Date(date).toLocaleDateString();

  return (
    <article className='DiaryItem'>
      <div
        className={['emotion-image-wrapper', `emotion-image-wrapper-${emotion}`].join(' ')}
        onClick={goDiary}>
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} alt='기분 이미지' />
      </div>
      <div className='diary-info' onClick={goDiary}>
        <div>{diaryDate}</div>
        <div>{content.slice(0, 15)}</div>
      </div>
      <div className='btn-wrapper' onClick={goEdit}>
        <MyBtn text={'수정하기'} />
      </div>
    </article>
  );
};
export default React.memo(DiaryItem);
