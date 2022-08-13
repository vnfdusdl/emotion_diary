const MyHeader = ({ headerContent, leftChild, rightChild }) => {
  return (
    <header className='MyHeader'>
      <div className='header_btn_left'>{leftChild}</div>
      <div className='header_text'>{headerContent}</div>
      <div className='header_btn_right'>{rightChild}</div>
    </header>
  );
};

export default MyHeader;
