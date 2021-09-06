<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .map_wrap {position:relative;width:500px;height:500px;}
        .title {font-weight:bold;display:block;}
        .hAddr {position:absolute;left:10px;top:10px;border-radius: 2px;background:#fff;background:rgba(255,255,255,0.8);z-index:1;padding:5px;}
        #centerAddr {display:block;margin-top:2px;font-weight: normal;}
        .bAddr {padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
    </style>
    <%@include file="/WEB-INF/views/include/header.jsp"%>
    <%@include file="/WEB-INF/views/ServiceKey/suggestionServiceKey.jsp"%>

    <link rel="stylesheet" href="/assets/css/suggestion/select.css">

    <script src="/assets/js/suggestion/select.js"></script>
</head>
<body>
    <main>
    <div id="suggestion_content">
        <div id="suggestion_area">
            <div id="suggestion_travel" style="width: 700px;">
                <div id="suggestion1">
                <h1>여기 어떠세요?</h1>
                    <table id="suggestion1_table">
                        <thead>
                            <th>카테고리</th>
                            <th>타이틀</th>
                            <th>조회수</th>
                            <th>최종수정일</th>
                        </thead>
                    </table>
                    <div class="suggestion1_pager_area">
                        <button id="suggestion1_prev">&lt;</button>
                        <span class="current">1</span> / <span class="suggestion1_total"></span>
                        <button id="suggestion1_next">&gt;</button>
                    </div>    
                </div>
                <div id="suggestion2">
                    <h1>조금 더 먼곳도 알아볼까요?</h1>
                    <table id="suggestion2_table">
                        <thead>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>리스트 2</td>                    
                            </tr>
                            <tr>
                                <td>리스트 2</td>                    
                            </tr>
                            <tr>
                                <td>리스트 2</td>                    
                            </tr>
                            <tr>
                                <td>리스트 2</td>                    
                            </tr>
                            <tr>
                                <td>리스트 2</td>                    
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="item_img_scroll_area">
                <div class="img_scroll">
                    
                </div>
                <div class="img_textInfo">

                </div>
                <div class="img_indicator_area">
                    <button id="prev">&lt;</button>
                    <span class="indicators">
                        <span class="indicator current"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                        <span class="indicator"></span>
                    </span>
                    <button id="next">&gt;</button>
                </div>
            </div>
        </div>
        <div class="map_wrap">
            <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
            <div class="hAddr">
                <span class="title">지도중심기준 행정동 주소정보</span>
                <span id="centerAddr"></span>
            </div>
        </div>
    </div>
    </main>
</body>
</html>