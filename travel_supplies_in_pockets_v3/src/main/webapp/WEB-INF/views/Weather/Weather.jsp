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
                <table style="width: 100%;">
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
            </div>
            <div id="RDR" style="width: 25%; height: 500px;">
                <h1>실황레이더 [12시간]</h1>
                <img id="RDR_img" style="width: 100%; height: 100%;">
            </div>
        </div>
    </main>
</body>
</html>