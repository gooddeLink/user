# ✨user
&nbsp;&nbsp;&nbsp;&nbsp; ~https://u.goodde.kr/:id~ <br /><br />

## 1. 메인 (/:id)<br/>
&nbsp;&nbsp;&nbsp;<strong>📌 취약 이웃 위치 신고</strong> : 취약이웃(극빈층, 우울증 환자가족 등)을 인지한 주민들이 현재 위치와 사연 메시지를 쉽게 등록 <br/>
&nbsp;&nbsp;&nbsp;<strong>📌 재난 위험 사진 신고</strong> : 이웃 주변의 재난상황(수해, 산불 등)을 인지한 주민들이 사진과 긴급 상황 메시지를 쉽게 등록<br/>
<div align="center">
      <img src="https://user-images.githubusercontent.com/96722691/205233542-1217caa8-d3ae-444b-ac18-47785995518a.png"  width="300" >
</div>

## 2. 🏴 취약 이웃 위치 신고 (/loc_cam/:id/a)<br/>
&nbsp;&nbsp;&nbsp; ✔️현 위치 확인 후 오류 있을 경우 핀 선택 및 주소 입력 ➡️ ✔️불편 내용 접수 ➡️ 현장 사진 접수 ➡️ 등록하기 <br/><br/>
&nbsp;&nbsp;&nbsp;1. <strong>현 위치 정보</strong> 확인<br/>
&nbsp;&nbsp;&nbsp;2. webRTC <strong>사진 전송</strong> 기능<br/>
&nbsp;&nbsp;&nbsp;3. 서버로 위도, 경도, 위치 및 사진 전송<br/>
<div align="center">
      <img src="https://user-images.githubusercontent.com/96722691/205235046-0e25a792-298c-47f9-b919-9f2c21db395d.png"  width="300" >
</div> <br />

&nbsp;&nbsp;&nbsp; 💦<strong>위치가 올바르지 않을 경우</strong> <br/>
&nbsp;&nbsp;&nbsp;1. 핀 위치 조정<br/>
&nbsp;&nbsp;&nbsp;2. 주소 검색 : 자동완성 기능 사용<br/>
<div align="center">
      <img src="https://user-images.githubusercontent.com/96722691/205240237-6ea9f95f-7818-4e8a-9a71-2d5d8622d0c6.png"  width="300" >
</div>

## 3. 🚩 재난 위험 사진 신고 (/call_cam/:id/b)<br/>
&nbsp;&nbsp;&nbsp; ✔️재난 유형 선택 ➡️ ✔️현 위치 확인 후 오류 있을 경우 핀 선택 및 주소 입력 ➡️ ✔️현장 사진 접수 ➡️ 불편 내용 접수  ➡️ 등록하기 <br/><br/>
&nbsp;&nbsp;&nbsp;1. <strong>현 위치 정보</strong> 확인<br/>
&nbsp;&nbsp;&nbsp;2. webRTC <strong>사진 전송</strong> 기능<br/>
&nbsp;&nbsp;&nbsp;3. <strong>재난 유형</strong> 선택 ▶ 수해, 산불, 교통사고, 지진, 자연재난, 사회재난<br/>
&nbsp;&nbsp;&nbsp;4. 서버로 위도, 경도, 위치 및 사진 전송<br/>
<div align="center">
      <img src="https://user-images.githubusercontent.com/96722691/205234069-b9a79c72-26a8-4f3d-a319-3ba479ae9436.png"  width="300" >
</div>
      
## 4. 🚀 서버로 전송 <br/>
&nbsp;&nbsp;&nbsp;: 위도, 경도, 위치 및 사진 전송<br/>
&nbsp;&nbsp;&nbsp;: 재난 위험 사진 신고의 경우 재난 유형 전송<br/>
