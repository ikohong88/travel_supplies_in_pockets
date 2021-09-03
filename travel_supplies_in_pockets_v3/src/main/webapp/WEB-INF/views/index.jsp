<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>:: 주머니속 여행 준비물 ::</title>
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/fonts.css">
    <link rel="stylesheet" href="/assets/css/index/index.css">
    <link rel="stylesheet" href="/assets/css/index/index@responsive.css">
    <script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="/assets/js/index.js"></script>
</head>
<body>
    <div class="container">
        <div class="left">
            <div class="left_contents">
                <h1>TRAVEL SUPPLIES IN POCKETS</h1>
                <h2>주머니 속 여행준비물</h2>
                <h3>여행을 떠나볼까요?</h3>
                <div class="select_box_region">
                    <div class="square"></div>
                    <select id="start_sido">
                        <option value="none">시도를 선택해주세요.</option>
                    </select>
                    <select id="start_gubun">
                        <option class="gubun" value="none">시도를 먼저 선택해주세요.</option>
                    </select>
                </div>
                <div class="select_box">
                    <div class="square"></div>
                    <select id="category">
                        <option value="none">어딜 보고싶으세요?</option>
                    </select>
                </div>
                <div class="select_box">
                    <div class="square"></div>
                    <select id="range">
                        <option value="none">거리는?</option>
                    </select>
                </div>
                <button id="ready">준비하러 가기</button>
                <div id="noplan">
                    <a href="http://localhost:8090/travel/nonselect/suggestion">출발지 없이 여행준비하기</a>
                </div>
            </div>
        </div>
        <div class="right">

        </div>
    </div>
</body>
</html>