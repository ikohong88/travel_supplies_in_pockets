window.onload = $(function() {
    let index_data = JSON.parse(localStorage.getItem("index_data"));
    console.log(index_data);

    select_rand_gallery(index_data.sido);
    select_suggestion_info(index_data.sido_code, index_data.gubun_code, index_data.cat1_code);
    var suggestion_Kakaomap = new Array();

    // 데이터를 뽑아오기 전에 실행되므로,
    // 실행 시간에는 데이터가 없고,
    // 콘솔에 찍을 때는 데이터가 들어가는
    // 시간적 동기화문제 때문에 데이터가 있는것처럼 보이는것이었습니다..
    // 실제 코드 실행 흐름상에서는 이 타이밍에 suggestion_Kakaomap은 new Array() 상태입니다.
    // KakaoMap(index_data.lat, index_data.lng, suggestion_Kakaomap);
    
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
                    let category = suggestion.data[i].middleCategory+" > "+suggestion.data[i].subCategory;
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
                KakaoMap(index_data.lat, index_data.lng, suggestion_Kakaomap);
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
        
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            
        for (var i = 0; i < setPosition.length; i ++) {
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: setPosition[i].latlng, // 마커를 표시할 위치
                image : markerImage // 마커 이미지 
            });

            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: setPosition[i].title // 인포윈도우에 표시할 내용
                
            });

            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
         // 주소-좌표 변환 객체를 생성합니다
         var geocoder = new kakao.maps.services.Geocoder();
        
         // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
         searchAddrFromCoords(map.getCenter(), displayCenterInfo);
         
         // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
         kakao.maps.event.addListener(map, 'idle', function() {
             searchAddrFromCoords(map.getCenter(), displayCenterInfo);
         });
 
         // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
         var mapTypeControl = new kakao.maps.MapTypeControl();
         
         // 지도 타입 컨트롤을 지도에 표시합니다
         map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
 
         function searchAddrFromCoords(coords, callback) {
             // 좌표로 행정동 주소 정보를 요청합니다
             geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
         }
         
         function searchDetailAddrFromCoords(coords, callback) {
             // 좌표로 법정동 상세 주소 정보를 요청합니다
             geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
         }
         
         // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
         function displayCenterInfo(result, status) {
             if (status === kakao.maps.services.Status.OK) {
                 var infoDiv = document.getElementById('centerAddr');
         
                 for(var i = 0; i < result.length; i++) {
                     // 행정동의 region_type 값은 'H' 이므로
                     if (result[i].region_type === 'H') {
                         infoDiv.innerHTML = result[i].address_name;
                         break;
                     }
                 }
             }    
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