import { useState } from 'react';
import MyBtn from './MyBtn';
import { useNavigate } from 'react-router-dom';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const emotionList = [
  { value: 'all', name: '모두' },
  { value: 'good', name: '기분 좋은 날' },
  { value: 'bad', name: '기분 안좋은 날' },
];

const SortMenu = ({ value, onChange, sortOptionList }) => {
  return (
    <select className="SortMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {sortOptionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};


const DiaryList = ({ data }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState('latest');
  const [emotionType, setEmotionType] = useState('all');
  const diaryList = data;

  const sortedDiaryList = () => {
    const compareFunc = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const filterFunc = (item) => {
      if (emotionType === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      emotionType === 'all' ? copyList : copyList.filter((item) => filterFunc(item));
    const sortedList = filteredList.sort(compareFunc);
    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <article class="menu-wrapper">
        <SortMenu value={sortType} onChange={setSortType} sortOptionList={sortOptionList} />
        <SortMenu value={emotionType} onChange={setEmotionType} sortOptionList={emotionList} />
        <MyBtn text={'새 일기 쓰기'} type={'positive'} onClick={() => navigate('/edit')} />
      </article>

      {sortedDiaryList().map((it, idx) => (
        <div key={idx}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
