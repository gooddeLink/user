import "./Check.css";
import {useState, useEffect} from "react";
import {useParams} from "react-router";//url 변수 저장 위함

function Check(){
    const {id} = useParams();//id,flag라는 url 변수를 저장

    var [style1, styleSet1]=useState({display:'block'});
    var [style2, styleSet2]=useState({display:'none'});

    useEffect(()=>{
        if(document.getElementsByClassName('c_group')) {//return이 로딩되었다면(html파일이 만들어져서 c_group이 로딩되면)
            
            styleSet1({display:'none'});
            styleSet2({display:'block'});
        }
    },[]);//뒤에 빈 배열 넣어 처음 한번만 실행

    //취약계층 위치신고 : a
    //재난위험 사진신고 : b

    function home(){//취약계층 위치신고
        window.location.href=`/loc/${id}/a`;//done.js로 이동
    }

    function camera(){//재난위험 사진신고
        window.location.href=`/camera/${id}/b`;//camera.js로 이동
    }

    return (
    <>
        <div className="loading" style={style1}>GOODDRIVE</div>
        <div className="home">
            &nbsp; 
            <img src="picture/anyang.jfif" className="home_img" alt="cam mark" />
            &nbsp;안양시</div>
        <hr className="line"/>
        <br /> <br />
        <div className="c_group" style={style2}>
            <div className="c_group_row">
            <img src="picture/subtitle.jfif" className="c_group_sub" />
            </div>
            <div className="c_group_row_first">
                <div className="buttonbox_first"> 
                    <img src="picture/home.png" className="c_first_img" alt="pin mark" />
                    <div className="c_button_first">홈페이지 방문</div>
                    {/* <img src="picture/anyang.jfif" className="c_cam" alt="cam mark" /> public 내에 picture 있으므로 picture만 작성 */}
                </div>
                <div className="buttonbox_first">
                    <img src="picture/phone-call.png" className="c_first_img" alt="pin mark" />
                    <div className="c_button_first">기관연락처 저장</div>
                    {/* <img src="picture/free-icon-address-book-1370974.png" className="c_pin" alt="pin mark" /> public 내에 picture 있으므로 picture만 작성 */}
                </div>
            </div>
            <div className="c_group_row">
                <div className="buttonbox c_button_loc" onClick={home}>
                    <div className="c_button">취약 이웃<br />위치 신고</div>
                    <img src="picture/old-man .png" className="c_pin" alt="pin mark" /> {/*public 내에 picture 있으므로 picture만 작성*/}
                </div>
                <div className="buttonbox c_button_cam" onClick={camera}> 
                    <div className="c_button">재난 위험<br />사진 신고</div>
                    <img src="picture/그룹 151.png" className="c_cam" alt="cam mark" /> {/*public 내에 picture 있으므로 picture만 작성*/}
                </div>
            </div>
            <div className="c_group_row">
                <div className="buttonbox">
                    <div className="c_button">설문조사</div>
                    <img src="picture/to-do-list.png" className="c_search" alt="pin mark" /> {/*public 내에 picture 있으므로 picture만 작성*/}
                </div>
                <div className="buttonbox"> 
                    <div className="c_button">민생 경제<br />재난지원금<br />신청</div>
                    <img src="picture/balance_wallet_payment_cash.png" className="c_money" alt="cam mark" /> {/*public 내에 picture 있으므로 picture만 작성*/}
                </div>
            </div>
        </div>
    </>
    );
}

export default Check;
