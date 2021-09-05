<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@include file="/WEB-INF/views/include/header.jsp"%>
    <%@include file="/WEB-INF/views/ServiceKey/suggestionServiceKey.jsp"%>

    <link rel="stylesheet" href="/assets/css/suggestion/select.css">

    <script src="/assets/js/suggestion/select.js"></script>
</head>
<body>
    <main>
    <div id="suggestion_content">
        <div id="suggestion_area">
            <div id="suggestion_travel">
                <div id="suggestion1">
                <h1>여기 어떠세요?</h1>
                    <table>
                        <thead>
                            <th>카테고리</th>
                            <th>타이틀</th>
                            <th>조회수</th>
                            <th>최종수정일</th>
                        </thead>
                        <tbody id="rand20_info">
                            
                        </tbody>
                    </table>
                </div>
                <div id="suggestion2">
                    <h1>조금 더 먼곳도 알아볼까요?</h1>
                    <table>
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
        <div id="map_area">
            <div id="map" style="width:100%;height:350px;"></div>
        </div>
    </div>
    </main>
</body>
</html>