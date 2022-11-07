import "./Thanks.css";
import {useEffect} from "react";
import {useParams} from "react-router";//url 변수 저장 위함

function Thanks(){
    const {id} = useParams();//id라는 url 변수를 저장
    useEffect(()=>{
        setTimeout(function(){window.location.href=`/${id}`;}, 5000);//5초 후에
    },[]);//뒤에 빈 배열 넣어 처음 한번만 실행

    return (
        <div className="t_group">
            {/* <strong className="title">"GOODDRIVE"</strong> 를 */}
            <br />
            이용해주셔서<br />
            감사합니다.
        </div>
    );
}

export default Thanks;