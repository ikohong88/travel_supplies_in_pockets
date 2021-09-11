<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@include file="/WEB-INF/views/include/header.jsp"%>
    <%@include file="/WEB-INF/views/ServiceKey/detailBoardServiceKey.jsp"%>

    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script src="/assets/js/transport/transport.js"></script>
</head>
<body>
    <button id="reset">주소 리셋하기</button>
    <button id="downloadCSV">CSV파일 생성</button>
</body>
</html>