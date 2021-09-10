<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>:: 주머니속 여행준비물 ::</title>
    
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <link rel="stylesheet" href="/assets/css/fonts.css">
    <link rel="stylesheet" href="/assets/css/header/header.css">

    <script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.0/dist/chart.min.js"></script>

    <script src="/assets/js/header/header.js"></script>
</head>
<body>
    <div class="left_menu">
        <a href="#" id="logo">
            <img src="http://placehold.it/80x80">
        </a>
        <ul class="main_menu">
            <li>
                <a href="/travel/select/suggestion">
                    <i class="fas fa-home"></i>
                    <span>여행 추천지 보기</span>
                </a>
            </li>
            <li>
                <a href="/travel/List">
                    <i class="fas fa-home"></i>
                    <span>여행 리스트 보기</span>
                </a>
            </li>
            <li>
                <a href="/travel/Weather">
                    <i class="fas fa-home"></i>
                    <span>여행 날씨/여행지수 보기</span>
                </a>
            </li>
            <li>
                <a href="/travel/transport">
                    <i class="fas fa-home"></i>
                    <span>여행 교통 보기</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-home"></i>
                    <span>취향에 맞는 준비물은?</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="menu_btn">
        <i class="fas fa-chevron-right"></i>
    </div>
    <div class="top_area">
        <h1>
            <a href="#" id="Go_index">
                <i class="fas fa-map-marked-alt"></i>
                <span>주머니속 여행준비물</span>
                <br>
                <span>TRAVEL SUPPLIES IN POCKETS</span>
            </a>
        </h1>
        <div class="settings">
            <div class="setting_row">
                <span>출발지역 : </span>
                <select id="header_sido" disabled>
                    
                </select>
                <select id="header_gubun" disabled>
                    <!-- <option class="gubun" value="none">시도를 먼저 선택해주세요.</option> -->
                </select>
            </div>
            <div class="setting_row">
                <span>거리 : 반경 </span>
                <input type="number" id="area" disabled>
                <span>Km 이내</span>
            </div>
            <div class="setting_row">
                <span>취향 : </span>
                <select id="category" disabled>
                    
                </select>
            </div>
        </div>
        <div class="setting_btns">
            <button id="change_option">변경하기</button>
            <button id="no_option">옵션없이 준비하기</button>
        </div>
    </div>
</body>
</html>