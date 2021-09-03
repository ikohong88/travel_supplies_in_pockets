<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .map_wrap {position:relative;width:600px;height:710px;}
        .title {font-weight:bold;display:block;}
        .hAddr {position:absolute;left:10px;top:10px;border-radius: 2px;background:#fff;background:rgba(255,255,255,0.8);z-index:1;padding:5px;}
        #centerAddr {display:block;margin-top:2px;font-weight: normal;}
        .bAddr {padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
    </style>
    <%@include file="/WEB-INF/views/include/header.jsp"%>
    <link rel="stylesheet" href="/assets/css/detailBoard/detailBoard.css">

    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.0/dist/chart.min.js"></script>
    <script src="/assets/js/detailBoard/detailBoard.js"></script>
</head>
<body>
    <main>
        <div class="container">
            <div class="sitemap">
                <!-- <a href="#">cat1</a>
                <span>&gt;</span>
                <a href="#">cat2</a>
                <span>&gt;</span>
                <a href="#">cat3 (카테고리)</a> -->
            </div>
            <div class="contents_area">
                <div class="item_details">
                    <div class="item_left">
                        <div class="item_title">
                            <!-- <h1>Title</h1> -->
                            <div class="item_time_info">
                                <p class="item_reg_dt">
                                    <!-- <span>등록일</span>
                                    <span class="reg_dt">2014-04-01</span> -->
                                </p>
                                <p class="item_mod_dt">
                                    <!-- <span>수정일</span>
                                    <span class="reg_dt">2021-04-01</span> -->
                                </p>
                            </div>
                        </div>
                        <div class="item_img_scroll_area">
                            <div class="img_scroll">
                                <!-- <img src="http://placehold.it/600x630/fab">
                                <img src="http://placehold.it/600x630/afb">
                                <img src="http://placehold.it/600x630/abf">
                                <img src="http://placehold.it/600x630/ccc">
                                <img src="http://placehold.it/600x630/000"> -->
                            </div>
                            <!-- <div class="img_indicator_area">
                                <button id="prev">&lt;</button>
                                <span class="indicators">
                                    <span class="indicator current"></span>
                                    <span class="indicator"></span>
                                    <span class="indicator"></span>
                                    <span class="indicator"></span>
                                    <span class="indicator"></span>
                                </span>
                                <button id="next">&gt;</button>
                            </div> -->
                        </div>
                    </div>
                    <div class="item_right">
                        <button id="explt_btn">상세정보</button>
                        <button id="transpt_btn">교통편</button>
                        <button id="weather_btn">날씨</button>
                        <div id="explanation">
                            <h2>상세설명</h2>
                            <p id="description_text"></p>
                            <h2>주소</h2>
                            <p id="address_text"></p>
                            <!-- <select id="detail_info_sel">
                                <option value="0">상세정보 선택</option>
                                <option value="1">상세정보1</option>
                                <option value="2">상세정보2</option>
                                <option value="3">상세정보3</option>
                                <option value="4">상세정보4</option>
                                <option value="5">상세정보5</option>
                            </select> -->
                            <p id="detail_text"></p>
                        </div>
                        <div id="transportation">
                            <h2 id="Train_Title">기차 정보 : </h2>
                            <table id="train_info_table" class="info_table">
                                <thead id="train_info_table">
                                    <tr>
                                        <th>출발역</th>
                                        <th>출발시간</th>
                                        <th>도착역</th>
                                        <th>도착시간</th>
                                        <th>열차종류</th>
                                        <th>운임</th>
                                    </tr>
                                </thead>
                                <tbody id="Search_Train_info">
                                    <!-- 
                                    <tr>
                                        <td>09:00</td>
                                        <td>10:00</td>
                                        <td>12,300</td>
                                    </tr> -->
                                </tbody>
                            </table>
                            <h2 id="Bus_Title">버스 정보 : </h2>
                            <table id="bus_info_table" class="info_table">
                                <thead>
                                    <tr>
                                        <th>출발터미널</th>
                                        <th>출발시간</th>
                                        <th>도착터미널</th>
                                        <th>도착시간</th>
                                        <th>등급</th>
                                        <th>운임</th>
                                    </tr>
                                </thead>
                                <tbody id="Search_Bus_info">
                                    <!-- <tr>
                                        <td>09:00</td>
                                        <td>10:00</td>
                                        <td>12,300</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                        <div id="weatherInfo" hidden="hidden">
                            <h2 id="weather_addr"></h2>
                            
                            <div class="weatherChartArea">
                                <div class="weather_chart">
                                    <canvas id="REH_Chart"></canvas>
                                </div>
                                <div class="text_info">
                                    <h2>12시간 평균 습도</h2>
                                    <h1 id="REH_average"></h1>
                                </div>
                            </div>
                            <div class="weatherChartArea">
                                <div class="weather_chart">
                                    <canvas id="TMP_Chart"></canvas>
                                </div>
                                <div class="text_info">
                                    <h2>12시간 평균 기온</h2>
                                    <h1 id="TMP_average"></h1>
                                </div>
                            </div>
                            <div class="weatherChartArea">
                                <div class="weather_chart">
                                    <canvas id="WSD_Chart"></canvas>
                                </div>
                                <div class="text_info">
                                    <h2>12시간 평균 풍속</h2>
                                    <h1 id="WSD_average"></h1>
                                </div>
                            </div>   
                            <div class="weatherPCP_POPArea">
                                <h2>강수 정보</h2>
                                <div id="PCP_Table">
                                    <table>
                                        <thead>
                                            <th>강수 예정 시간</th>
                                            <th>강수 예정</th>
                                        </thead>
                                        <tbody id="PCP_POPInfo">
                                        
                                        </tbody>
                                    </table>
                                </div>
                                <div id="POP_TextInfo">
                                    <h2>12시간 평균 강수확률</h2>
                                    <h1 id="POP_Info"></h1>
                                </div>
                            </div>               
                            <div class="weatherTableArea">
                                <h2>하늘상태</h2>
                                <table>
                                    <tr id="SKYNowHour1">
                                        
                                    </tr>
                                    <tr id="SKY_Info1">

                                    </tr>
                                    <tr id="SKYNowHour2">

                                    </tr>
                                    <tr id="SKY_Info2">

                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map_area">
                    <div class="map_wrap">
                        <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
                        <div class="hAddr">
                            <span class="title">지도중심기준 행정동 주소정보</span>
                            <span id="centerAddr"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <form name="form" id="search_jusoform" method="post" hidden = hidden>
        <input type="text" name="currentPage" value="1"/> <!-- 요청 변수 설정 (현재 페이지. currentPage : n > 0) -->
        <input type="text" name="countPerPage" value="10"/><!-- 요청 변수 설정 (페이지당 출력 개수. countPerPage 범위 : 0 < n <= 100) -->
        <input type="text" name="resultType" value="json"/> <!-- 요청 변수 설정 (검색결과형식 설정, json) --> 
    </form>
</body>
</html>