# travel_supplies_in_pockets
## 주머니속 여행준비물

----------

- ### 서비스 개요
> 각 지역별 다양한 명소들이 있지만, 정보들이 흩어져 있을 뿐만 아니라, 그 명소에 대한, 정보와 날씨, 교통편 등 여행을 가기전 필요로하는 정보를 한곳에서 볼 수 있도록 도와주는 서비스 개발

- ### 필요한 openapi 데이터, 크롤링
  - 날씨 데이터
  - 관광 데이터
  - 철도 데이터
  - 버스 데이터
  - 네이버지도 조회 데이터
  - 관광지 주변 명소 및 숙박 데이터
  - (옵션) 네이버에서 추천하는 각 지역별 데이터 크롤링
  - 도로교통상황

- ### 벤치마킹
  - 기상청 날씨누리 
  - 대한민국 구석구석
  - 네이버지도
  - 구글지도
  
- ### OPEN API 주소 :
  - 기상청_단기예보 조회서비스 : http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0
  - 기상청_생활기상지수 조회서비스(3.0)  : http://apis.data.go.kr/1360000/LivingWthrIdxServiceV2
  - 기상청_레이더영상 조회서비스 : http://apis.data.go.kr/1360000/RadarImgInfoService
  - 한국관광공사 관광사진 정보 : http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService
  - 한국관광공사_국문 관광정보 서비스 : http://api.visitkorea.or.kr/openapi/service
  - 국토교통부_열차정보 : http://openapi.tago.go.kr/openapi/service
  - 국토교통부_고속버스정보 서비스 : http://openapi.tago.go.kr/openapi/service/
  - 국토교통부_고속버스도착정보 서비스 : http://openapi.tago.go.kr/openapi/service/ExpBusArrInfoService
  - 국토교통부_지하철정보서비스 : http://openapi.tago.go.kr/openapi/service
  - 국토교통부_버스정류소정보 : http://openapi.tago.go.kr/openapi/service/
  - 국토교통부_버스노선정보 : http://openapi.tago.go.kr/openapi/service/
  - 서울특별시_정류소정보조회 서비스 : http://ws.bus.go.kr/api/rest/stationinfo/
  - 부산광역시_부산버스정보시스템 : http://61.43.246.153/openapi-data/service/busanBIMS2
- ### 사용된 API
  - 다음 주소 API
  - 네이버, 카카오, 구글맵 API (위도, 경도를 이용한 주소데이터 수집 [Python])
  - 도로명주소 API (juso.go.kr)
- ### 서비스 환경 
  - PC, 모바일 (반응형 웹 개발 예정)

- ### 화면 구성

  - 인덱스화면
    - 출발지 (시도, 구군)
    - 취향(카테고리1)
    - 거리(최대 2Km)
    - '준비하러 가기' 버튼
    - '출발지 없이 여행준비하기' 버튼
  - 헤더
    - 출발지 (시도, 구군)
    - 취향(카테고리1)
    - 거리(최대 2Km)
    - 변경버튼
    - 저장버튼
    - 옵션없이 준비하기 버튼
  - 추천화면(출발지, 취향 선택)
    - 왼쪽상단 출발지 기준 20개의 여행지
    - 왼쪽하단 출발지 기준 거리 1 ~ 2Km 사이의 여행지 20곳
    - 가운데 출발지 기준 관광사진 10개
    - 오른쪽 : 왼쪽상단에 보여주는 여행지 20곳 카카오맵 마커
  - 메인 화면에 오늘의 날씨에 따른 여행지 메인에 추천 혹은 여행지수 보여주기
  - 출발지에 따른 조건별 추천 여행지 – 조건(날씨, 거리, 취향, 여행일정, 교통상황등에 따르는 추천
  - 지역별 조건에 맞는 추천 서비스
  - 최근 업데이트된 여행지
  - 크롤링을 통한 최근 사람들이 관심가지고 있는 여행지 (해쉬태그 이용)

- ### 기능
1. 메인화면 → 지도화면 & 다른 방법으로 현재 날씨를 확인하고, 출발지 기준으로 다양한 옵션을 통해, 여행지를 추천, 혹은 원하는 지역을 검색해, 그 지역의 관광지 소개
2. 추천 화면 →  
3. 한국관광공사 갤러리 -> 한국관광공사가 추천하는 지역별 추천 사진 개시 및 소개 글 작성
4. 
