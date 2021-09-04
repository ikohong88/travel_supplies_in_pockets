<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@include file="/WEB-INF/views/include/header.jsp"%>

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
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>리스트 1</td>                    
                            </tr>
                            <tr>
                                <td>리스트 1</td>                    
                            </tr>
                            <tr>
                                <td>리스트 1</td>                    
                            </tr>
                            <tr>
                                <td>리스트 1</td>                    
                            </tr>
                            <tr>
                                <td>리스트 1</td>                    
                            </tr>
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
            <div id="suggestion_gallery_area">
                <!-- <img src="http://placehold.it/500x350">
                <h2>해쉬태그</h2>
                <p>해쉬</p>
                <h2>사진 작가/스튜디오 정보</h2>
                <p>설명</p>
                <h2>촬영일</h2>
                <p>설명</p>
                <h2>장소</h2>
                <p>설명</p> -->
            </div>
        </div>
        <div id="map_area">
            <div class="map_wrap">
                <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
                <div class="hAddr">
                    <span class="title">지도중심기준 행정동 주소정보</span>
                    <span id="centerAddr"></span>
                </div>
            </div>
        </div>
    </div>
    </main>
</body>
</html>