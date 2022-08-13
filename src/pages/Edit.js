import {useSearchParams, useNavigate} from 'react-router-dom';
const Edit = () => {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams();
    const id = params.get("id");
    console.log(id) // 

    return <>
    <h1>Edit</h1>
    <button onClick={()=> setParams({author: 'cho'})}>QS 변경!</button>
    <button onClick={()=> navigate('/')}>Home으로 이동</button>
    </>
}
export default Edit;