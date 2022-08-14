import { useParams, useSearchParams } from 'react-router-dom';
const Diary = () => {
//   const { id } = useParams();
  const [searchParams, setSerchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log('id : ',id);
  return (
    <>
      <h1>Diary</h1>
    </>
  );
};
export default Diary;
