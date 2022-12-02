# user

## 1. 메인 (/:id)<br/>
&nbsp;&nbsp;&nbsp;-1. 취약 이웃 위치 신고 -> 현 위치 정보, webRTC 사진 전송 기능 가능<br/>
&nbsp;&nbsp;&nbsp;-2. 재난 위험 사진 신고 -> 현 위치 정보, webRTC 사진 전송 기능 및 재난 유형 사용 가능<br/>
<img src="https://user-images.githubusercontent.com/101400650/205231365-8f0b0301-93b3-4f95-bde8-85bc14b8e0ea.png"  width="500" >
<br/>

## 2. 취약 이웃 위치 신고 (/loc_cam/:id/a)<br/>
&nbsp;&nbsp;&nbsp;-1. 현 위치 정보 확인 가능<br/>
&nbsp;&nbsp;&nbsp;-2. webRTC 사진 전송 기능 가능<br/>
&nbsp;&nbsp;&nbsp;-3. 서버로 위도, 경도, 위치 및 사진 전송<br/>

## 3. 재난 위험 사진 신고 (/call_cam/:id/b)<br/>
&nbsp;&nbsp;&nbsp;-1. 현 위치 정보 확인 가능<br/>
&nbsp;&nbsp;&nbsp;-2. webRTC 사진 전송 기능 가능<br/>
&nbsp;&nbsp;&nbsp;-3. 재난 유형 선택 가능<br/>
&nbsp;&nbsp;&nbsp;-4. 서버로 위도, 경도, 위치 및 사진 전송<br/>
      
## 4. 서버로 전송 <br/>
&nbsp;&nbsp;&nbsp;: 위도, 경도, 위치 및 사진 전송<br/>
&nbsp;&nbsp;&nbsp;: 재난 위험 사진 신고의 경우 재난 유형 전송<br/>
