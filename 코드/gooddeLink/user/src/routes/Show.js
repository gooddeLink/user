import "./Camera.css";
import axios from 'axios';//axios 사용하기 위함
import {useParams} from "react-router";//url 변수 저장 위함

function Show(){
    const {id, flag} = useParams();//id라는 url 변수를 저장

    function textCheck(){//글자수 제한
        var text=document.getElementById('text').value;
        var textLen=text.length;

        if(textLen>500){
            alert('500자 이상 작성할 수 없습니다.');
            text=text.substr(0, 500);//0에서 500자까지만 인식
            document.getElementById('text').value=text;
            document.getElementById('text').focus();
        }
    }

    return (
    <>
        <div className="picture" style={style4}>
            <img src="../../picture/camera.png" className="cam" alt="pin" /> {/*img 주소가 /done/a(b)/picture 로 인식되므로 ../ 삽입*/}
            &nbsp;현재 이미지를 전송할까요?
            <br /><br />
            <div className="boxgroup">
                <img className="show" alt="error" />
                <br /> <br />
                <div className="write">
                    불편내용 적어주세요  <span className="choose">*(선택)</span>
                </div>
                <textarea rows="10" id="text" name="text" onKeyUp={textCheck}></textarea>
                <br /><br />
                <button className="mb-2 mr-2 btn-transition btn btn-outline-secondary checkbox camsend" onClick={blobToDataUrl_axios}>
                    등록</button>
                <button className="mb-2 mr-2 btn-transition btn btn-outline-secondary checkbox camsend" onClick={check}>
                    취소</button>
            </div>
        </div>
    </>
    );
}

export default Show;