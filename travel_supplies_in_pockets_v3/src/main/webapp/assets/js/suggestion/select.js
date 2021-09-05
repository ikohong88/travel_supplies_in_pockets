window.onload = $(function() {
    let index_data = JSON.parse(localStorage.getItem("index_data"));
    console.log(index_data);

    select_rand_gallery(index_data.sido);
    select_suggestion_info(index_data.sido_code, index_data.gubun_code, index_data.cat1_code);
    var suggestion_Kakaomap = new Array();

    KakaoMap(index_data.lat, index_data.lng, suggestion_Kakaomap);
    
    let scr_pos = 0;
    $("#next").click(function(){
        $(".img_scroll div").eq(scr_pos).stop().animate({"left":"-100%"}, 300);
        scr_pos++;
        if(scr_pos >= $(".img_scroll div").length) scr_pos = 0;
        $(".img_scroll div").eq(scr_pos).css("left", "100%").stop().animate({"left":"0%"}, 300);
        $(".indicator").removeClass("current");
        $(".indicator").eq(scr_pos).addClass("current");
    })

    $("#prev").click(function(){
        $(".img_scroll div").eq(scr_pos).stop().animate({"left":"100%"}, 300);
        scr_pos--;
        if(scr_pos < 0) scr_pos = $(".img_scroll div").length-1;
        $(".img_scroll div").eq(scr_pos).css("left", "-100%").stop().animate({"left":"0%"}, 300);
        $(".indicator").removeClass("current");
        $(".indicator").eq(scr_pos).addClass("current");
    })

    // 조건에 따르는 여행 정보 출력 (20개 제한, 수정일 올해 기준);
    function select_suggestion_info(sido,gubun,cat1) {
        let url;
        if(cat1 == "none") {
            url = "/api/kto/suggestionTableInfo?sido="+sido+"&gubun="+gubun;
        } else {
            url = "/api/kto/suggestionTableInfo?sido="+sido+"&gubun="+gubun+"&cat1="+cat1;
        }
        $.ajax({
            type:"get",
            url:url,
            success:function(suggestion) {
                console.log(suggestion);
                let page_maxNum = Math.ceil(suggestion.data.length/5);
                $(".suggestion1_total").append(page_maxNum);
                for(let i=0; i<page_maxNum; i++) {
                    let _tag = "<tbody class='suggestion1_tbody'></tbody>";
                    $("#suggestion1_table").append(_tag);
                }
                for(let i = 0; i<suggestion.data.length; i++) {
                    suggestion_Kakaomap.push({
                        title: suggestion.data[i].title, 
                        latlng: new kakao.maps.LatLng(suggestion.data[i].mapy,suggestion.data[i].mapx)
                    });
                    let category = suggestion.data[i].mainCategory+" > "+suggestion.data[i].middleCategory+" > "+suggestion.data[i].subCategory;
                    let _modifiedtime = new Date(suggestion.data[i].modifiedtime);
                    _modifiedtime.setHours(_modifiedtime.getHours()+9);
                    let mod_year = _modifiedtime.getFullYear();
                    let mod_month = _modifiedtime.getMonth() + 1; 
                    let mod_date = _modifiedtime.getDate();
                    let format_mod = (`${mod_year}-${mod_month >= 10 ? mod_month : '0' + mod_month}-${mod_date >= 10 ? mod_date : '0' + mod_date}`);
                    
                    let page = Math.floor(i/5);                  
                    let rand20_tag = 
                    '<tr>'+
                        '<td>'+category+'</td>'+                    
                        '<td>'+suggestion.data[i].title+'</td>'+                    
                        '<td>'+suggestion.data[i].readcount+'</td>'+                    
                        '<td>'+format_mod+'</td>'+                    
                    '</tr>'
                    $(".suggestion1_tbody").eq(page).append(rand20_tag); 
                }
                $(".suggestion1_tbody").eq(0).addClass("active");
        
                $("#suggestion1_next").click(function() {
                    let currentPage = Number($(".current").html());
                    currentPage++;
                    if(currentPage > page_maxNum) currentPage = page_maxNum;
                    $(".current").html(currentPage);
                    $(".suggestion1_tbody").removeClass("active");
                    $(".suggestion1_tbody").eq(currentPage-1).addClass("active");
                })
                $("#suggestion1_prev").click(function() {
                    let currentPage = Number($(".current").html());
                    currentPage--;
                    if(currentPage <= 0) currentPage = 1;
                    $(".current").html(currentPage);
                    $(".suggestion1_tbody").removeClass("active");
                    $(".suggestion1_tbody").eq(currentPage-1).addClass("active");
                })
            }
        })
    }

    // 사진 조건에 따르는 랜덤 적용
    function select_rand_gallery(sido) {
        $.ajax({
            type:"get",
            url:"/api/TG/RandTG?sido="+sido,
            success:function(RandTG) {
                console.log(RandTG);
                for(let i = 0; i<RandTG.data.length; i++) {
                    let img_tag = 
                    '<div class="RandTG_detail">'+
                        '<img src="'+RandTG.data[i].galWebImageUrl+'" style="height:450px; width:600px;">'+
                        '<h2>작품 타이틀</h2>'+
                        '<p>'+RandTG.data[i].galTitle+'</p>'+
                        '<h2>해쉬태그</h2>'+
                        '<p class="HashTag">'+RandTG.data[i].galHashTag+'</p>'+
                        '<h2>사진 작가/스튜디오 정보</h2>'+
                        '<p>'+RandTG.data[i].galPhotographer+'</p>'+
                        '<h2>촬영일</h2>'+
                        '<p>'+RandTG.data[i].galPhotographyYear+'년 '+RandTG.data[i].galPhotographyMonth+'월</p>'+
                        '<h2>장소</h2>'+
                        '<p>'+RandTG.data[i].galPhotographyLocation+'</p>'+
                    '</div>'
                    $(".img_scroll").append(img_tag);

                }
            }
        })
    }

    // 카카오맵 선택된 장소 지도 표시
    function KakaoMap(lat,lng, setPosition) {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
            level: 8 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
        // 마커를 표시할 위치와 title 객체 배열입니다 
        var positions = [
            setPosition
        ];
        console.log(setPosition);

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            
        for (var i = 0; i < positions.length; i ++) {
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
        }
    }
    // 카카오맵 api 거리 구하기
    function KaKaoMapDistance(TBsttsLat, TBsttsLng, StartEndLat, StartEndLng) {
        var polyline = new kakao.maps.Polyline({
            // map: map,
            path: [
                new kakao.maps.LatLng(TBsttsLat, TBsttsLng),
                new kakao.maps.LatLng(StartEndLat, StartEndLng)
            ]
        });
        var length = polyline.getLength(); 
        return length;
    }
})