import MyBtn from './MyBtn';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ emotion, content, date, id }) => {
  const navigate = useNavigate();
  
  const goDetail = () => {
    navigate(`/detail/${id}`)
  }
  const goEdit = () => {
    navigate(`/edit/${id}`)
  }

  const diaryDate = new Date(date).toLocaleDateString();

  return (
    <article className='DiaryItem'>
      <div className={['emotion-image-wrapper', `emotion-image-wrapper-${emotion}`].join(' ')} onClick={goDetail}>
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} alt='기분 이미지' />
      </div>
      <div className='diary-info' onClick={goDetail}>
        <div>{diaryDate}</div>
        <div>{content}</div>
      </div>
      <div className='btn-wrapper' onClick={goEdit}>
        <MyBtn text={'수정하기'} />
      </div>
    </article>
  );
};
export default DiaryItem;
