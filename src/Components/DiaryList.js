import { useState } from 'react';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const SortMenu = ({ value, onChange, sortOptionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {sortOptionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState('latest');
  const diaryList = data;


  const sortedDiaryList = () => {
    const compareFunc = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compareFunc);

    return sortedList;
  };

  return (
    <>
      <SortMenu value={sortType} onChange={setSortType} sortOptionList={sortOptionList} />
      {sortedDiaryList().map((it, idx) => (
        <div key={idx}>{it.content}</div>
      ))}
    </>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
