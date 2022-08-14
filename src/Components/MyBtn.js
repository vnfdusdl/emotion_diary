const MyBtn = ({ text, type, onClick }) => {
  const btn_type = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button className={['MyBtn', `MyBtn_${btn_type}`].join(' ')} onClick={onClick}>
      {text}
    </button>
  );
};

MyBtn.defaultProps = {
  text: '버튼',
  type: 'default',
};

export default MyBtn;
