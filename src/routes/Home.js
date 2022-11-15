import "./Home.css";
import {useState, useEffect, useRef} from "react";
import axios from 'axios';//axios 사용하기 위함
import {useParams} from "react-router";//url 변수 저장 위함

function Home(){
    const {id, flag} = useParams();//id라는 url 변수를 저장
    const google=window.google;//react에서 google 사용하기 위함

    var [lat, setLat]=useState();//useEffect 안에서도 사용하기 위하여 useState 이용해서 변수 선언
    var [lon, setLon]=useState();
    var [loc, setLoc]=useState();
    var [map, setMap]=useState();
    var [marker, setMarker]=useState();
    var [geocoder, setGeocoder]=useState(); 
    var [msg, setMsg]=useState();
    var [type, setType]=useState();

    var latestLat=useRef(lat);//useEffect 밖에서도 바뀐 값 사용하기 위함
    var latestLon=useRef(lon);
    var latestLoc=useRef(loc);
    var latestMap=useRef(map);
    var latestMarker=useRef(marker);
    var latestGeocoder=useRef(geocoder);
    var latestMsg=useRef(msg);
    var latestType=useRef(type);

    var [styleLoading, styleSetLoading]=useState({display:'block'});
    var [styleCamHead, styleSetCamHead]=useState({display:'none'});
    var [styleMap, styleSetMap]=useState({display:'none'});
    var [styleModal, styleSetModal]=useState({display:'none'});
    var [styleCamImg1, styleSetCamImg1]=useState({display:'block'});
    var [styleImgShow1, styleSetImgShow1]=useState({display:'none'});
    var [styleCamImg2, styleSetCamImg2]=useState({display:'block'});
    var [styleImgShow2, styleSetImgShow2]=useState({display:'none'});
    var [styleColor, styleSetColor]=useState({color:'#001CB5'});
    var [styleBackColor, styleSetBackColor]=useState({backgroundColor:'#001CB5'});
    var [styleBorder, styleSetBorder]=useState({borderColor:'#001CB5'});
    var [styleLoc, styleSetLoc]=useState({display:'block'});
    var [styleSearchLoc, styleSetSearchLoc]=useState({display:'none'});
    var [styleSearchPic, styleSetSearchPic]=useState({display:'none'});
    var [styleCam1, styleSetCam1]=useState({display:'none'});
    var [styleCam2, styleSetCam2]=useState({display:'none'});

    var [file, setFile]=useState();//react 내에서 값 바꾸기 위하여 useState 이용해서 변수 선언
    var [imgBlob, setImgBlob]=useState();
    var [dataUrl, setDataUrl]=useState();
    var [selectedValue, setSelectedValue]=useState();

    var latestFile=useRef(file);//바뀐 값 사용하기 위함
    var latestImgBlob=useRef(imgBlob);
    var latestDataUrl=useRef(dataUrl);
    var latestSelectedValue=useRef(selectedValue);

    //취약계층 위치신고 : a
    //재난위험 사진신고 : b

    useEffect(()=>{//로딩시간동안 wait a minutes 뜨도록 하기 위함

        //접속 위치를 얻기
        if (navigator.geolocation && google.maps) {//구글지도가 로딩되고, geolocation 기능이 동작한다면

            navigator.geolocation.getCurrentPosition(function(position) {
                setLat = position.coords.latitude; // 위도
                setLon = position.coords.longitude; // 경도
                latestLat.current=setLat;//useEffect 밖에서도 사용할 수 있도록
                latestLon.current=setLon;

                var mapOptions = { 
                    center:new google.maps.LatLng(setLat, setLon),
                    zoom:19
                };
                setMap = new google.maps.Map(document.getElementById("googleMap"), mapOptions );
                latestMap.current=setMap;

                setGeocoder=new google.maps.Geocoder();//주소를 위도 경도로 변환
                latestGeocoder.current=setGeocoder;

                //주소 자동완성기능
                if(flag==='a'){
                    var myIcon = new google.maps.MarkerImage("../../picture/pin.png", null, null, null, new google.maps.Size(66,88));
                    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('loadaddrLoc'), {
                        types: ['geocode']
                    });
                }
                else{
                    var myIcon = new google.maps.MarkerImage("../../picture/orangepin.png", null, null, null, new google.maps.Size(66,88));
                    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('loadaddrPic'), {
                        types: ['geocode']
                    });
                }
                autocomplete.addListener('place_changed');

                setMarker = new google.maps.Marker({position: {lat: setLat, lng: setLon}, map: latestMap.current, icon: myIcon});
                //icon 항목은 기존의 marker 이미지 변경
                latestMarker.current=setMarker;

                styleSetLoading({display:'none'});//지도가 로딩되면 가리기
                styleSetMap({display:'block'});//지도가 로딩되면 홈페이지 나타나도록

                if(flag==='a'){
                    styleSetMap({marginTop:'200px'});//margin-top 대신 marginTop
                    styleSetCam2({display:'block'});//카메라기능 지도 뒤에 나타나도록
                    styleSetBackColor({backgroundColor:'#001CB5'});
                }

                if(flag==='b'){
                    styleSetColor({color:'#FF5900'});
                    styleSetCamHead({display:'block', marginTop:'200px'});//b이면 style2 보이게
                    styleSetCam1({display:'block'});//카메라기능 지도 앞에 나타나도록
                    styleSetBackColor({backgroundColor:'#FF5900'});
                    styleSetBorder({borderColor:'#FF5900'});
                }

                latlon2addr(setLat, setLon);//위도경도를 주소로 변환

                //클릭하면 마커 변화
                google.maps.event.addListener(latestMap.current, 'click', function(event){
                    latestMarker.current.setMap(null);//마커 하나만 뜨도록 기존것 없애주기
                    latestMarker.current=new google.maps.Marker({position: {lat: event.latLng.lat(), lng: event.latLng.lng()}, map: latestMap.current, icon: myIcon});
                    latlon2addr(event.latLng.lat(),event.latLng.lng(),latestMarker.current);//위도경도를 주소로 변환
                    latestMap.current.setCenter(latestMarker.current.getPosition());//마커가 가운데 위치하도록
                    latestMarker.current.setMap(latestMap.current);
                })
            });
        }
    },[]);//빈 배열을 넣어 처음 한번만 실행

    //위도 경도를 주소로 변환
    function latlon2addr(lat, lon){
        // var geocoder=new google.maps.Geocoder();//주소를 위도 경도로 변환
        latestGeocoder.current.geocode({'location':{lat: lat, lng: lon}},function(results,status){
            if (status==='OK') {
                setLoc=results[0].formatted_address;
                latestLoc.current=setLoc;
                showAddr(latestLoc.current);//주소창에 주소표시
            }
            else alert('error address');
        });
    }

    //현재 주소 표시하기
    function showAddr(loc){
        if(flag==='a'){
            var print=document.getElementById('print');
            print.innerHTML='<img src="../../picture/pin.png" class="pin" alt="loc mark" />'+loc;
        }
        else{
            var print=document.getElementById('print');
            print.innerHTML='<img src="../../picture/orangepin.png" class="pin" alt="loc mark" />'+loc;
        }
        //className말고 class로 설정
    }

    function textCheck(){//글자수 제한
        var text=document.getElementById('text').value;
        var textLen=text.length;

        if(textLen>500){
            alert('500자 이상 작성할 수 없습니다.');
            text=text.substr(0, 500);//0에서 500자까지만 인식
            document.getElementById('text').value=text;
            document.getElementById('text').focus();
        }

        setMsg=text;
        latestMsg.current=setMsg;
    }

    //재난유형 select 사용하기
    function Select(event) {
        var isActive = event.currentTarget.className.indexOf("active") !== -1;
        if (isActive) {
            event.currentTarget.className = "typeGroup";
        } 
        else {
            event.currentTarget.className = "typeGroup active";//선택된 항목은 className에 active가 추가됨
        }
    }

    //재난유형 select option 선택하기
    function optionSelect(event){
        setSelectedValue = event.currentTarget.innerHTML;//선택한 항목 글자
        latestSelectedValue.current=setSelectedValue;

        setType=event.currentTarget.value;//재난유형 번호
        latestType.current=setType;
        document.querySelector(".base").innerHTML = latestSelectedValue.current;//선택한 항목 글자가 나타나게 함
    }

    //카메라 실행
    function Show(){
        var picture=document.getElementById('takePicture');
        picture.onchange=function(event){
            var files=event.target.files;
            if (files && files.length>0) {
                setFile=files[0];//사진
                latestFile.current=setFile;//useEffect 밖에서도 사용하기 위함
                
                try{//오류있을수도 있는 문장
                    var link=window.URL||window.webkitURL;//window.URL 객체 얻기
                    setImgBlob=link.createObjectURL(latestFile.current);//objectURL 생성
                    latestImgBlob.current=setImgBlob;//useEffect 밖에서도 사용하기 위함

                    //dataurl로 변환
                    var reader=new FileReader();
                    reader.readAsDataURL(latestFile.current);
                    reader.onload=function(event){
                        setDataUrl=event.target.result;
                        latestDataUrl.current=setDataUrl;
                    }

                    if(flag==='a'){
                        var show2=document.getElementById('show2');
                        show2.src=latestImgBlob.current;//사진 주소 설정
                        styleSetCamImg2({display:'none'});//사진 선택할 이미지로고 안보이게
                        styleSetImgShow2({display:'block'});//선택한 사진 보이게
                    }
                    if(flag==='b'){
                        var show1=document.getElementById('show1');
                        show1.src=latestImgBlob.current;//사진 주소 설정
                        styleSetCamImg1({display:'none'});//사진 선택할 이미지로고 안보이게
                        styleSetImgShow1({display:'block'});//선택한 사진 보이게
                    }

                    var revoke=document.querySelector('.boxgroup');
                    revoke.onload=function(){link.revokeObjectURL(imgBlob);}//이미지 띄우고 url 취소하기(메모리 절약 위함)
                }
                catch(e){//에러 있다면
                    console.log('error');
                    try{
                        var fileReader=new FileReader();//createObject가 안되는 경우
                        fileReader.onload=function(event){
                            setImgBlob=event.target.result;//useEffect 밖에서도 사용하기 위함
                            latestImgBlob.current=setImgBlob;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch(e){
                        var error=document.getElementById('error');
                        if(error) error.innerHTML="Neither createObjectURL or FileReader are supported";
                    }
                }
            }
        }
    }

    //메인 페이지로 이동
    function Home(){
        window.location.href=`/${id}`;
    }

    //주소를 위도 경도로 변환
    function addrsearch(){
        geocodeAddress(latestGeocoder.current, latestMap.current);
    }
    function geocodeAddress(geocoder, resultMap){
        if(flag==='a') var address=document.getElementById('loadaddrLoc').value;//입력한 주소
        else var address=document.getElementById('loadaddrPic').value;//입력한 주소
        geocoder.geocode({'address':address},function(result, status){
            if (status==='OK'){//geocode 오류없이 수행

                resultMap.setCenter(result[0].geometry.location);//맵 중심좌표 설정
                resultMap.setZoom(18);
                latestMarker.current=new google.maps.Marker({
                    map:resultMap,
                    position:result[0].geometry.location
                });

                setLat=result[0].geometry.location.lat();
                setLon=result[0].geometry.location.lng();
                setLoc=address;
                latestLat.current=setLat;
                latestLon.current=setLon;
                latestLoc.current=setLoc;

                //infowindow에 위치 뜨도록 하기
                // var detail='<div>'+address+'</div>';
                // var content='<div class="detailAddr">'+detail+'</div>';
                // var infowindow=new google.maps.InfoWindow();
                // infowindow.setContent(content);
                // infowindow.open(latestMap.current, marker);

                showAddr(latestLoc.current);//주소창에 주소 표시

                if(flag==='a'){
                    styleSetSearchLoc({display:'none'});//주소검색창 숨기기
                    styleSetColor({color:'#001CB5'});
                    styleSetLoc({display:'block'});//주소창 뜨게
                }
                else{
                    styleSetSearchPic({display:'none'});
                    styleSetColor({color:'#FF5900'});
                    styleSetLoc({display:'block'});//주소창 뜨게
                }
            }
            else alert('geocode error'+status);
        });
    }

    //주소검색 실행
    function Search(){
        // window.location.href=`/search/${id}/${flag}`;
        styleSetColor({color:'#484848'});
        styleSetLoc({display:'none'});
        if(flag==='a') styleSetSearchLoc({display:'block'});
        else styleSetSearchPic({display:'block'});
    }

    //서비스 이용완료
    function Finish(){
        if(flag==='b'){//재난 유형, 현장 사진 접수 입력 안했다면 alert
            if(!latestSelectedValue.current || !latestDataUrl.current) {
                alert('필수 항목이 누락되었습니다.');
                return;
            }
        }
        styleSetModal({display:'flex'});//가운데 오도록

        if(flag==='a'){
            axios.post(`${process.env.REACT_APP_goodde}/call_loc/${id}/submit`, {//정보 전달할 페이지-admin
                text:latestMsg.current,//불편내용
                lat:latestLat.current,
                lon:latestLon.current,
                loc:latestLoc.current
            })
            .then((res)=>{//axios.post 성공하면
                console.log(res);
            })
            .catch((err)=> {//axios.post 에러나면
                console.log(err);
                alert(`오류가 발생했습니다.\n${err.message}`);
                return;
            });
        }
        else{
            axios.post(`${process.env.REACT_APP_goodde}/call_loc/${id}/submit`, {//정보 전달할 페이지-admin
                type:latestType.current,//유형번호
                text:latestMsg.current,//불편내용
                lat:latestLat.current,
                lon:latestLon.current,
                loc:latestLoc.current
            })
            .then((res)=>{//axios.post 성공하면
                console.log(res);
            })
            .catch((err)=> {//axios.post 에러나면
                console.log(err);
                alert(`오류가 발생했습니다.\n${err.message}`);
                return;
            });
        }

        axios.post(`http://127.0.0.1:5000/${id}/locimgsubmit`, {//정보 전달할 페이지-ai
            img:latestDataUrl.current
        })
        .then((res)=>{//axios.post 성공하면
            console.log(res);
        })
        .catch((err)=> {//axios.post 에러나면
            console.log(err);
            alert(`오류가 발생했습니다.\n${err.message}`);
            return;
        });
    }

    return (
    <>
        <div className="loadingBox" style={styleLoading}> {/*로딩중*/}
            <div className="loading">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>  
        </div> 

        <div className="boxgroup" style={styleCamHead}> {/*재난유형 사진신고*/}
            <div className="write" style={styleColor}>
                재난 유형<span className="chooseType" style={{color:'#3ac47d'}}>(*필수)</span>
            </div>
            <div className="typeGroup" onClick={Select}>
                <div className="base">
                    선택
                    <img src="../../picture/select.png" className="triangle" />
                </div>
                <ul className="select">
                    <li className="option" onClick={optionSelect} value="0">수해</li>
                    <li className="option" onClick={optionSelect} value="1">산불</li>
                    <li className="option" onClick={optionSelect} value="2">교통사고</li>
                    <li className="option" onClick={optionSelect} value="3">지진</li>
                    <li className="option" onClick={optionSelect} value="4">기타</li>
                </ul>
            </div>

            <br /><br /><br /><br />

            {/* 취약 이웃 위치 신고 - camera1 */}
            <div style={styleCam1}>
                <div className="write" style={styleColor}>
                    현장 사진 접수<span className="choose" style={{color:'#3ac47d'}}>(*필수)</span>
                </div>
                <input type="file" id="takePicture" name="picture" accept="image/*" style={{display:'none'}}/>
                <label htmlFor="takePicture"> {/*input태그 이미지로 받기 위함*/}
                    <img src="../../picture/orangecam.png" id="cam" alt="cam picture" onClick={Show} style={styleCamImg1}/>
                </label>
                <div style={styleImgShow1}>
                    <img id="show1" />
                    <br /> <br />
                    <div className="adjust">*얼굴은 모자이크 처리됩니다.</div>
                </div>
            </div>
            <br /><br /><br />
        </div>

        <div className="box" style={styleMap}> {/*위치, 지도, 불편내용 접수, 등록버튼*/}
            <div className="check" style={styleColor}>
                현재 고객님의 위치는
                <div id="print" onClick={Search} style={styleLoc}/>
                <div id="search" style={styleSearchLoc}>
                    <img src="../../picture/pin.png" className="pin" alt="loc mark" />
                    <input type="text" id="loadaddrLoc" placeholder="도로명주소" />
                </div>
                <div id="search" style={styleSearchPic}>
                    <img src="../../picture/orangepin.png" className="pin" alt="loc mark" />
                    <input type="text" id="loadaddrPic" placeholder="도로명주소" />
                </div>
                <button className="addrconfirm" onClick={addrsearch} style={styleSearchLoc}>완료</button>
                <button className="addrconfirm" onClick={addrsearch} style={styleSearchPic}>완료</button>
            </div>
            
            <br />
            <div id="googleMap"></div>
            <br /><br />
            <div className="adjust">
                &nbsp;&nbsp;&nbsp;&nbsp;*위치가 틀릴 경우 주소를 입력 또는 지도에서 위치를 조정해주세요.
            </div>
            <br /><br /><br /><br />
            <div className="boxgroup">
                <span style={styleCam2}>
                    <div className="write" style={styleColor}>
                        불편 내용 접수<span className="chooseReport" style={{color:'#3ac47d'}}>(*필수)</span>
                    </div>
                </span>
                <span style={styleCam1}>
                    <div className="write" style={styleColor}>
                        불편 내용 접수<span className="choose">(선택)</span>
                    </div>
                </span>
                <textarea rows="10" id="text" name="text" onKeyUp={textCheck} placeholder="불편 내용을 입력해주세요." style={styleBorder}></textarea>
                <br /><br /><br /><br /><br />

                {/* 재난 위험 사진 신고 - camera2 */}
                <div style={styleCam2}>
                    <div className="write" style={styleColor}>
                        현장 사진 접수<span className="choose">(선택)</span>
                    </div>
                    <input type="file" id="takePicture" name="picture" accept="image/*" style={{display:'none'}}/>
                    <label htmlFor="takePicture"> {/*input태그 이미지로 받기 위함*/}
                        <img src="../../picture/cam.png" id="cam" alt="cam picture" onClick={Show} style={styleCamImg2}/>
                    </label>
                    <div style={styleImgShow2}>
                        <img id="show2" />
                        <br /> <br />
                        <div className="adjust">*얼굴은 모자이크 처리됩니다.</div>
                    </div>
                    <br /><br /><br />
                </div>

                <div className="alert" style={styleColor}>등록 이후 수정 및 취소/확인이 불가합니다.</div>
                <button className="send submit" onClick={Finish} style={styleBackColor}>
                    등록하기</button>
                <button className="send cancel" onClick={Home}>
                    취소하기</button>
            </div>
            <br /><br /><br /><br /><br />

            <div className="modalWrapper" style={styleModal}> {/*등록확인모달*/}
                <div id="modal" style={styleBackColor}> {/*className 말고 id로 하기*/}
                    <div className="modalText">신고 접수가 등록되었습니다!</div>
                    <div className="closeWrapper">
                        <button className="closeModal" onClick={Home} style={styleBackColor}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    </>//react는 항상 한 태그 안에 전체가 감싸져있어야함
    );
}

export default Home;