import { useContext, useState } from 'react';
import { DiaryDataContext } from '../App';

// 정렬 셀렉트 박스
//state 종류를 list로 저장
const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

// select 박스에서 선택했을 때, 그 값으로 sortType을 변화
// 선택된 value를 새로운 sortType로 변화시킬 것
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

const DiaryList = () => {
  // 정렬 => 변하는 값이니까 state로 저장
  const [sortType, setSortType] = useState('latest');
  const diaryList = useContext(DiaryDataContext);

  const sortedDiaryList = () => {
    // 배열에 담긴 객체끼리 정렬할 때는 비교함수를 만들어서 전달해야함.
    const compareFunc = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date); //date값이 숫자가 아니면 에러가 날 수도 있으니
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
