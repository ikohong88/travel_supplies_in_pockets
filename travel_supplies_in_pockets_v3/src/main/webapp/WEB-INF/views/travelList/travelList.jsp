<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/travelList/travelList.css">

    <%@include file="/WEB-INF/views/include/header.jsp"%>
    <script src="/assets/js/travelList/travelList.js"></script>
</head>
<body>
    <h1>여행 리스트 화면</h1>
    <div class="main_area">
        <div class="main_left">
            <div class="select_area">
                <div class="select_wrap">
                    <div class="select_grp">
                        <select id="sido">

                        </select>
                        <select id="gubun">
                            <option class="gubun" value="none">시도를 먼저 선택해주세요.</option>
                        </select>
                    </div>
                    <div class="select_grp">
                        <select id="category1">
                            
                        </select>
                        <select id="category2">
                            <option class="cat2" value="">카테고리2</option>
                        </select>
                        <select id="category3">
                            <option value="">카테고리3</option>
                        </select>
                    </div>
                </div>
                <button id="lookup_btn">조회</button>
                <p class="warn">※ 조회 시 지역선택은 필수입니다.</p>
            </div>
            <div class="list_header">
                <div class="sort_area">
                    <input type="radio" name="sort" id="recent" checked>
                    <label for="recent"><i class="fas fa-check"></i> 최신데이터 순</label>
                    <input type="radio" name="sort" id="view_cnt">
                    <label for="view_cnt"><i class="fas fa-check"></i> 조회수 순</label>
                </div>
                <div class="pager_area">
                    <button id="prev_page"><i class="fas fa-chevron-left"></i></button>
                    <div class="pagers">
                        <a href="#" class="pager current">1</a>
                        <a href="#" class="pager">2</a>
                        <a href="#" class="pager">3</a>
                        <a href="#" class="pager">4</a>
                    </div>
                    <button id="next_page"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="list_area">
                <table>
                    <thead>
                        <tr>
                            <th>지역</th>
                            <th>카테고리</th>
                            <th>타이틀</th>
                            <th>조회수</th>
                            <th>수정일</th>
                        </tr>
                    </thead>
                    <tbody id="resultBaseBD_list">
                        <tr id="search_remove">
                            <td colspan="5" style="height: 500px; text-align:center;">
                                <h1 style="margin-top: 240px; font-size: 30px;">데이터 조회를 먼저 해주세요.</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="search_area">
                <div class="search_box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="keyword">
                </div>
                <button id="search_btn">검색</button>
            </div>
        </div>
        <div class="main_right">
            <div class="detail_box">
                <div class="img_box">
                    <img id="first_img" src="http://placehold.it/500x350" alt="">
                </div>
                <div class="description_box">
                    <h2 id="description_title">그린컴퓨터디자인학원</h2>
                    <p id="description_addr">대구광역시 중구 국채보상로 586 16층</p>
                    <p id="description">별이 벌레는 어머님, 이국 나는 다 언덕 불러 까닭입니다. 쓸쓸함과 봄이 다 가득 까닭입니다. 하나에 하나 가난한 흙으로 까닭입니다. 라이너 너무나 오면 이름과, 하나에 책상을 써 패, 까닭입니다. 별들을 지나가는 된 부끄러운 마디씩 하나에 헤는 다하지 동경과 거외다.</p>
                    <div class="link_area">
                        <a href="#" id="detail_link">상세정보 확인하기</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>