<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@include file="/WEB-INF/views/include/header.jsp"%>

    <script src="/assets/js/Weather/Weather.js"></script>
    <link rel="stylesheet" href="/assets/css/Weather/Weather.css">
</head>
<body>
    <main>
        <h1 id="Weather_region"></h1>
        <div id="content">
            <div class="weatherTableArea" style="width: 100%;">
                <h2>하늘상태</h2>
                <h3 id="SKY_FullDate">조회날짜 : </h3>
                <table class="info_table" style="width: 100%;">
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
            <div class="weatherTableArea" style="width: 100%;">
                <h2>대기확산지수조회</h2>
                <h3 id="ADI_FullDate">데이터날짜 : </h3>
                <table class="info_table" style="width: 100%;">
                    <tr id="ADINowHour1">
                        <th>3시간 후</th>
                        <th>6시간 후</th>
                        <th>9시간 후</th>
                        <th>12시간 후</th>
                        <th>15시간 후</th>
                        <th>18시간 후</th>
                        <th>21시간 후</th>
                        <th>24시간 후</th>
                        <th>27시간 후</th>
                        <th>30시간 후</th>
                        <th>33시간 후</th>
                        <th>36시간 후</th>
                        <th>39시간 후</th>    
                    </tr>
                    <tr id="ADI_Info1">

                    </tr>
                    <tr id="ADINowHour2">
                        <th>42시간 후</th>
                        <th>45시간 후</th>
                        <th>48시간 후</th>
                        <th>51시간 후</th>
                        <th>54시간 후</th>
                        <th>57시간 후</th>
                        <th>60시간 후</th>
                        <th>63시간 후</th>
                        <th>66시간 후</th>
                        <th>69시간 후</th>
                        <th>72시간 후</th>
                        <th>75시간 후</th>
                        <th>78시간 후</th>                     
                    </tr>
                    <tr id="ADI_Info2">

                    </tr>
                </table>
            </div>
            <div id="weatherInfo" style="width: 65%;">
                <h2 id="weather_addr"></h2>
                
                <div class="weatherChartArea">
                    <div class="weather_chart">
                        <canvas id="REH_Chart"style="width: 100%; height:200px"></canvas>
                    </div>
                    <div class="text_info">
                        <h2>평균 습도</h2>
                        <h1 id="REH_average"></h1>
                    </div>
                </div>
                <div class="weatherChartArea">
                    <div class="weather_chart">
                        <canvas id="TMP_Chart" style="width: 100%; height:200px"></canvas>
                    </div>
                    <div class="text_info">
                        <h2>평균 기온</h2>
                        <h1 id="TMP_average"></h1>
                    </div>
                </div>
                <div class="weatherChartArea">
                    <div class="weather_chart">
                        <canvas id="WSD_Chart" style="width: 100%; height:200px"></canvas>
                    </div>
                    <div class="text_info">
                        <h2>평균 풍속</h2>
                        <h1 id="WSD_average"></h1>
                    </div>
                </div>   
            </div>
            <div id="RDR" style="width: 25%; height: 500px;">
                <h1>실황레이더 [12시간]</h1>
                <img id="RDR_img" style="width: 100%; height: 100%;">
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
                        <h2>평균 강수확률</h2>
                        <h1 id="POP_Info"></h1>
                    </div>
                </div>               
            </div>
        </div>
    </main>
</body>
</html>