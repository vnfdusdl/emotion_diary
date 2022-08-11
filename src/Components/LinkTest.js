import { Link } from 'react-router-dom';
const LinkTest = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/diary'>Diary</Link>
      <Link to='/new'>New</Link>
      <Link to='/edit'>Edit</Link>
    </>
  );
};

export default LinkTest;