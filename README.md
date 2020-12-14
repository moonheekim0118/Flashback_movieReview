# 영화 리뷰 플랫폼 '플래쉬백(flashback)'

- 간단한 영화 리뷰 작성을 위한 플랫폼을 만들어보았습니다.
- 영화 데이터는 [네이버 영화 검색 API](https://developers.naver.com/docs/search/movie/)를 이용했습니다.

### [프론트엔드 기능 상세](https://docs.google.com/presentation/d/1HHop_FlpbisOevYbjCy-2-14AxqBFLILVA44KGhbI80/edit?usp=sharing)

<br/>

# 데모

<br/>

### 로그인 <br/>

<img src="./demo/login.gif?raw=true"/>

### 영화 검색 <br/>

<img src="./demo/searchMovie.gif?raw=true"/>

### 리뷰 작성 <br/>

<img src="./demo/creatReview.gif?raw=true"/>

### 리뷰 수정 <br/>

<img src="./demo/updateReview.gif?raw=true"/>

### 내 리뷰 관리 <br/>

<img src="./demo/myReviews.gif?raw=true"/>

### 내 프로필 관리 <br/>

<img src="./demo/profile.gif?raw=true"/>
<img src="./demo/updateAvatar.gif?raw=true"/>
<img src="./demo/updateNickname.gif?raw=true"/>

<br/>

# 환경설정 및 실행 방법

### 1. 깃 클론, 모듈 설치

```javascript
git clone https://github.com/moonheekim0118/Flashback_movieReview
cd /front
npm install
cd /back
npm install
```

### 2. DB 설정 및 API 설정

```javascript
cd /back
vim .env
COOKIE_SECRET=쿠키 시크릿 입력
DB_PASSWORD=디비 패스워드 입력
API_URI=https://openapi.naver.com/v1/search/movie.json
CLIENT_ID=발급받은 클라이언트 아이디 입력
CLIENT_SECRET= 발급받은 클라이언트 시크릿 입력
```

### 3. 실행 명령어

```javascript
프론트엔드
npm run test  // 테스트
npm run dev // 실행 localhost:3000에서 확인 가능
npm run start // 빌드

백엔드
npm run dev // 실행 localhost:3060에서 확인 가능
```

# 사용한 기술

### 공통

- ![](https://img.shields.io/badge/-NPM-red?logo=NPM)

#### 프론트엔드

- ![](https://img.shields.io/badge/-React-informational?logo=React&logoColor=white)

- ![](https://img.shields.io/badge/-Typescript-blue?logo=typescript&logoColor=white)
- ![](https://img.shields.io/badge/-Next.js-lightgrey?logo=next.js)
- ![](https://img.shields.io/badge/-styled--components-ff69b4?logo=styled-components&logoColor=white)
- ![](https://img.shields.io/badge/-webpack-blue?logo=webpack)
- ![](https://img.shields.io/badge/-babel-yellow?logo=babel&logoColor=white)
- ![](https://img.shields.io/badge/-Jest-orange?logo=jest&logoColor=white)

- ![](https://img.shields.io/badge/-enzyme-green)

- ![](https://img.shields.io/badge/-ESLint-yellow)

#### 백엔드

- ![](https://img.shields.io/badge/-JavaScript-yellow?logo=javascript&logoColor=white)
- ![](https://img.shields.io/badge/-Node.Js-green?logo=Node.Js&logoColor=white)
- ![](https://img.shields.io/badge/-Express-blueviolet?logo=Node.js&logoColor=white)
- ![](https://img.shields.io/badge/-Sequelize-orange?logo=Node.js&logoColor=white)

- ![](https://img.shields.io/badge/-passport-yellowgreen?logo=node.js&logoColor=white)
- ![](https://img.shields.io/badge/-MySQL-inactive?logo=mysql&logoColor=white)

#### 배포

- ![](https://img.shields.io/badge/-EC2-black?logo=Amazon-AWS)
