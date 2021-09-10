window.onload = $(function() {
    // 리스트 화면에서 정보 불러오기
    let Select_travel_info =  JSON.parse(localStorage.getItem("UserSelectInfo"));
    let Index_info = JSON.parse(localStorage.getItem("index_data"));
    let Select_img = localStorage.getItem("Select_img");
    console.log(Select_travel_info);
    introduce_info(Select_travel_info.contentid, Select_travel_info.contenttypeid);
    // 버스
    let StartLat = Index_info.lat;
    let StartLng = Index_info.lng;
    let EndLat = Select_travel_info.lat
    let EndLng = Select_travel_info.lng

    let b_distance_End_List = new Array();
    let b_distance_start_List = new Array();
    let _b_distance_End_List = [];
    let _b_distance_start_List = [];
    let BusTml_result = new Array();
    let end_Busstts;
    let start_Busstts;
    let b_check_Null_cnt = 0;
    // 기차
    let t_distance_end_List = new Array();
    let t_distance_start_list = new Array();
    let _t_distance_end_List = [];
    let _t_distance_start_list = [];
    let Trainstts_result = new Array();
    let end_Trainstts;
    let start_Trainstts;
    let t_check_Null_cnt = 0;

    let chart_TMP = new Array(); let chart_UUU = new Array();
    let chart_VVV = new Array(); let chart_VEC = new Array();
    let chart_WSD = new Array(); let chart_SKY = new Array();
    let chart_PTY = new Array(); let chart_POP = new Array();
    let chart_PCP = new Array(); let chart_REH = new Array();
    let chart_SNO = new Array(); let chart_hour = new Array();

    // 카테고리 화면 추가
    let category_tag = 
        '<a href="#">'+Select_travel_info.mainCategory+'</a>'+
        '<span>&gt;</span>'+
        '<a href="#">'+Select_travel_info.middleCategory+'</a>'+
        '<span>&gt;</span>'+
        '<a href="#">'+Select_travel_info.subCategory+'</a>';
    $(".sitemap").append(category_tag);
    
    // 타이틀 입력
    let title_tag = '<h1 id="detail_title">'+Select_travel_info.title+'</h1>'
    $(".item_title").append(title_tag);

    // js monent 사용한 modifiedtime 포멧
    let _modifiedtime = new Date(Select_travel_info.modifiedtime);
    let mod_year = _modifiedtime.getFullYear();
    let mod_month = _modifiedtime.getMonth() + 1; 
    let mod_date = _modifiedtime.getDate();
    let format_mod = (`${mod_year}-${mod_month >= 10 ? mod_month : '0' + mod_month}-${mod_date >= 10 ? mod_date : '0' + mod_date}`);
    let mod_tag = 
        '<span>수정일 </span>'+
        '<span class="reg_dt">'+format_mod+'</span>';
    $(".item_mod_dt").append(mod_tag);

    // js monent 사용한 createdtime 포멧
    let _createtime = new Date(Select_travel_info.createdtime);
    let create_year = _createtime.getFullYear();
    let create_month = _createtime.getMonth() + 1; 
    let create_date = _createtime.getDate();
    let format_create = (`${create_year}-${create_month >= 10 ? create_month : '0' + create_month}-${create_date >= 10 ? create_date : '0' + create_date}`);
    let create_tag = 
        '<span>등록일 </span>'+
        '<span class="reg_dt">'+format_create+'</span>';
    $(".item_reg_dt").append(create_tag);
    // div 순서 변경
    $(".item_time_info").insertAfter("#detail_title");

    // 선택된 이미지 삽입
    let img_tag;
    if (Select_img == "none") {
        img_tag = '<img src="http://placehold.it/600x630/afb"></img>'
    } else {
        img_tag = '<img src="'+Select_img+'"></img>'
    }
    $(".img_scroll").append(img_tag);

    // 상세설명 추가
    $("#description_text").append(Select_travel_info.overview);
    // 주소 추가
    let addr = Select_travel_info.addr1+" "+Select_travel_info.addr2+" "+Select_travel_info.addr3;
    $("#address_text").append(addr);

    // 카카오맵 생성
    KakaoMap(Select_travel_info.lat, Select_travel_info.lng, Select_travel_info.title);
    // 가까운 버스터미널 검색
    Search_NearBustml();
    Search_NearTrainStts();

    // 도로명 변경을 위한 데이터 입력
    let addr_tag = 
        '<input type="text" name="keyword" value="'+
        Select_travel_info.addr1+' '+Select_travel_info.addr2+' '+Select_travel_info.addr3+'"></input>';
    $("#search_jusoform").append(addr_tag);
    
    getAddr();
    // let weather = document.getElementById('');

    $("#transportation").hide();
    // 설명 화면전환 클릭
    $("#explt_btn").click(function() {
        $("#explanation").show();;
        $("#transportation").hide();
        $("#weatherInfo").hide();
    })
    $("#transpt_btn").click(function() {
        $("#explanation").hide();
        $("#transportation").show();
        $("#weatherInfo").hide();
    })
    $("#weather_btn").click(function() {
        $("#explanation").hide();
        $("#transportation").hide();
        $("#weatherInfo").show();
    })

    $("#Weather_detail").click(function() {
        location.href = "http://localhost:8090/travel/Weather";
    })
    $("#train_info_table").click(function() {
        location.href = "http://localhost:8090/travel/transport";
    })

    // openapi 소개정보 조회
    function introduce_info(contentid, contenttypeid) {
        $.ajax({
            type:"get",
            url:"/openapi/kto/introduceData?contentid="+contentid+"&contenttypeid="+contenttypeid,
            success:function(introduce){
                let tag;
                let contenttypeid = introduce.introduce_data.contenttypeid;
                console.log(introduce);
                if (contenttypeid = 12) {
                    let chkpet = introduce.introduce_data.chkpet;
                    let expguide = introduce.introduce_data.expguide;
                    let infocenter = introduce.introduce_data.infocenter;
                    let opendate = introduce.introduce_data.opendate;
                    let parking = introduce.introduce_data.parking;
                    let restdate = introduce.introduce_data.restdate;
                    let usetime = introduce.introduce_data.usetime;
                    if(infocenter != null) {
                        tag = 
                        '<h2>전화번호</h2>'+
                        '<p>'+infocenter+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(chkpet != null) {
                        tag = 
                        '<h2>애완동물동반가능여부</h2>'+
                        '<p>'+chkpet+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(expguide != null) {
                        tag = 
                        '<h2>체험안내</h2>'+
                        '<p>'+expguide+'</p>';
                        $("#explanation").append(tag);

                    }
                    if(opendate != null) {
                        tag = 
                        '<h2>개장일</h2>'+
                        '<p>'+opendate+'</p>';
                        $("#explanation").append(tag);

                    }
                    if(parking != null) {
                        tag = 
                        '<h2>주차시설</h2>'+
                        '<p>'+parking+'</p>';
                        $("#explanation").append(tag);

                    }
                    if(restdate != null) {
                        tag = 
                        '<h2>쉬는날</h2>'+
                        '<p>'+restdate+'</p>';
                        $("#explanation").append(tag);

                    }
                    if(usetime != null) {
                        tag = 
                        '<h2>이용시간</h2>'+
                        '<p>'+usetime+'</p>';
                        $("#explanation").append(tag);

                    }
                }
                // 14 문화시설    
                if (contenttypeid = 14) {
                    let chkpetculture = introduce.introduce_data.chkpetculture;
                    let infocenterculture = introduce.introduce_data.infocenterculture;
                    let parkingculture = introduce.introduce_data.parkingculture;
                    let restdateculture = introduce.introduce_data.restdateculture;
                    let usefee = introduce.introduce_data.usefee;
                    let usetimeculture = introduce.introduce_data.usetimeculture;
                    let spendtime = introduce.introduce_data.spendtime;
                    if(infocenterculture != null) {
                        tag = 
                        '<h2>문의 및 안내</h2>'+
                        '<p>'+infocenterculture+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(chkpetculture != null) {
                        tag = 
                        '<h2>애완동물동반가능 정보</h2>'+
                        '<p>'+chkpetculture+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(parkingculture != null) {
                        tag = 
                        '<h2>주차시설</h2>'+
                        '<p>'+parkingculture+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(restdateculture != null) {
                        tag = 
                        '<h2>쉬는날</h2>'+
                        '<p>'+restdateculture+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(usefee != null) {
                        tag = 
                        '<h2>이용요금</h2>'+
                        '<p>'+usefee+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(usetimeculture != null) {
                        tag = 
                        '<h2>이용시간</h2>'+
                        '<p>'+usetimeculture+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(spendtime != null) {
                        tag = 
                        '<h2>관람 소요시간</h2>'+
                        '<p>'+spendtime+'</p>';
                        $("#explanation").append(tag);
                    }
                }             
                // 15 행사/공연
                if (contenttypeid = 15) {
                    let agelimit = introduce.introduce_data.agelimit;
                    let bookingplace = introduce.introduce_data.bookingplace;
                    let eventstartdate = introduce.introduce_data.eventstartdate;
                    let eventenddate = introduce.introduce_data.eventenddate;
                    let eventhomepage = introduce.introduce_data.eventhomepage;
                    let eventplace = introduce.introduce_data.eventplace;
                    let placeinfo = introduce.introduce_data.placeinfo;
                    let playtime = introduce.introduce_data.playtime;
                    let program = introduce.introduce_data.program;
                    let spendtimefestival = introduce.introduce_data.spendtimefestival;
                    let sponsor1 = introduce.introduce_data.sponsor1;
                    let sponsor1tel = introduce.introduce_data.sponsor1tel;
                    let sponsor2 = introduce.introduce_data.sponsor2;
                    let sponsor2tel = introduce.introduce_data.sponsor2tel;
                    let usetimefestival = introduce.introduce_data.usetimefestival;
                    if(agelimit != null) {
                        tag = 
                        '<h2>관람 가능연령</h2>'+
                        '<p>'+agelimit+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(bookingplace != null) {
                        tag = 
                        '<h2>예매처</h2>'+
                        '<p>'+bookingplace+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(eventstartdate != null) {
                        tag = 
                        '<h2>행사 시작일</h2>'+
                        '<p>'+eventstartdate+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(eventenddate != null) {
                        tag = 
                        '<h2>행사 종료일</h2>'+
                        '<p>'+eventenddate+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(eventhomepage != null) {
                        tag = 
                        '<h2>행사 홈페이지</h2>'+
                        '<p>'+eventhomepage+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(eventplace != null) {
                        tag = 
                        '<h2>행사 장소</h2>'+
                        '<p>'+eventplace+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(placeinfo != null) {
                        tag = 
                        '<h2>행사장 위치안내</h2>'+
                        '<p>'+placeinfo+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(playtime != null) {
                        tag = 
                        '<h2>공연시간</h2>'+
                        '<p>'+playtime+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(program != null) {
                        tag = 
                        '<h2>행사 프로그램</h2>'+
                        '<p>'+program+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(spendtimefestival != null) {
                        tag = 
                        '<h2>관람 소요시간</h2>'+
                        '<p>'+spendtimefestival+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(sponsor1 != null) {
                        tag = 
                        '<h2>주최자 정보</h2>'+
                        '<p>'+sponsor1+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(sponsor1tel != null) {
                        tag = 
                        '<h2>주최자 연락처</h2>'+
                        '<p>'+sponsor1tel+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(sponsor2 != null) {
                        tag = 
                        '<h2>주관사 정보</h2>'+
                        '<p>'+sponsor2+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(sponsor2tel != null) {
                        tag = 
                        '<h2>주관사 연락처</h2>'+
                        '<p>'+sponsor2tel+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(usetimefestival != null) {
                        tag = 
                        '<h2>이용요금</h2>'+
                        '<p>'+usetimefestival+'</p>';
                        $("#explanation").append(tag);
                    }
                }
                // 25 여행코스                
                if (contenttypeid = 25) {
                    let distance = introduce.introduce_data.distance;
                    let infocentertourcourse = introduce.introduce_data.infocentertourcourse;
                    let schedule = introduce.introduce_data.schedule;
                    let taketime = introduce.introduce_data.taketime;
                    let theme = introduce.introduce_data.theme;
                    if(infocentertourcourse != null) {
                        tag = 
                        '<h2>문의 및 안내</h2>'+
                        '<p>'+infocentertourcourse+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(distance != null) {
                        tag = 
                        '<h2>코스 총거리</h2>'+
                        '<p>'+distance+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(schedule != null) {
                        tag = 
                        '<h2>코스 일정</h2>'+
                        '<p>'+schedule+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(taketime != null) {
                        tag = 
                        '<h2>코스 총 소요시간</h2>'+
                        '<p>'+taketime+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(theme != null) {
                        tag = 
                        '<h2>코스 테마</h2>'+
                        '<p>'+theme+'</p>';
                        $("#explanation").append(tag);
                    }
                }
                // 28 레포츠                
                if (contenttypeid = 28) {
                    let chkpetleports = introduce.introduce_data.chkpetleports;
                    let expagerangeleports = introduce.introduce_data.expagerangeleports;
                    let infocenterleports = introduce.introduce_data.infocenterleports;
                    let openperiod = introduce.introduce_data.openperiod;
                    let parkingleports = introduce.introduce_data.parkingleports;
                    let reservation = introduce.introduce_data.reservation;
                    let restdateleports = introduce.introduce_data.restdateleports;
                    let usefeeleports = introduce.introduce_data.usefeeleports;
                    let usetimeleports = introduce.introduce_data.usetimeleports;
                    if(infocenterleports != null) {
                        tag = 
                        '<h2>문의 및 안내</h2>'+
                        '<p>'+infocenterleports+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(chkpetleports != null) {
                        tag = 
                        '<h2>애완동물동반가능 정보</h2>'+
                        '<p>'+chkpetleports+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(expagerangeleports != null) {
                        tag = 
                        '<h2>체험 가능연령</h2>'+
                        '<p>'+expagerangeleports+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(openperiod != null) {
                        tag = 
                        '<h2>개장기간</h2>'+
                        '<p>'+openperiod+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(parkingleports != null) {
                        tag = 
                        '<h2>주차시설</h2>'+
                        '<p>'+parkingleports+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(reservation != null) {
                        tag = 
                        '<h2>예약안내</h2>'+
                        '<p>'+reservation+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(restdateleports != null) {
                        tag = 
                        '<h2>쉬는날</h2>'+
                        '<p>'+restdateleports+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(usefeeleports != null) {
                        tag = 
                        '<h2>입장료</h2>'+
                        '<p>'+usefeeleports+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(usetimeleports != null) {
                        tag = 
                        '<h2>이용시간</h2>'+
                        '<p>'+usetimeleports+'</p>';
                        $("#explanation").append(tag);
                    }
                }
                // 32 숙박                
                if (contenttypeid = 32) {
                    let accomcountlodging = introduce.introduce_data.accomcountlodging;
                    let checkintime = introduce.introduce_data.checkintime;
                    let checkouttime = introduce.introduce_data.checkouttime;
                    let chkcooking = introduce.introduce_data.chkcooking;
                    let infocenterlodging = introduce.introduce_data.infocenterlodging;
                    let parkinglodging = introduce.introduce_data.parkinglodging;
                    let roomcount = introduce.introduce_data.roomcount;
                    let reservationlodging = introduce.introduce_data.reservationlodging;
                    let reservationurl = introduce.introduce_data.reservationurl;
                    let roomtype = introduce.introduce_data.roomtype;
                    let refundregulation = introduce.introduce_data.refundregulation;

                    if(infocenterlodging != null) {
                        tag = 
                        '<h2>문의 및 안내</h2>'+
                        '<p>'+infocenterlodging+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(reservationlodging != null) {
                        tag = 
                        '<h2>예약안내</h2>'+
                        '<p>'+reservationlodging+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(reservationurl != null) {
                        tag = 
                        '<h2>예약안내 홈페이지</h2>'+
                        '<p>'+reservationurl+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(accomcountlodging != null) {
                        tag = 
                        '<h2>수용 가능인원</h2>'+
                        '<p>'+accomcountlodging+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(checkintime != null) {
                        tag = 
                        '<h2>입실 시간</h2>'+
                        '<p>'+checkintime+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(checkouttime != null) {
                        tag = 
                        '<h2>퇴실 시간</h2>'+
                        '<p>'+checkouttime+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(chkcooking != null) {
                        tag = 
                        '<h2>객실내 취사 여부</h2>'+
                        '<p>'+chkcooking+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(parkinglodging != null) {
                        tag = 
                        '<h2>주차시설</h2>'+
                        '<p>'+parkinglodging+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(roomcount != null) {
                        tag = 
                        '<h2>객실수</h2>'+
                        '<p>'+roomcount+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(roomtype != null) {
                        tag = 
                        '<h2>객실유형</h2>'+
                        '<p>'+roomtype+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(refundregulation != null) {
                        tag = 
                        '<h2>환불규정</h2>'+
                        '<p>'+refundregulation+'</p>';
                        $("#explanation").append(tag);
                    }
                }
                // 38 쇼핑                
                if (contenttypeid = 38) {
                    let chkpetshopping = introduce.introduce_data.chkpetshopping;
                    let culturecenter = introduce.introduce_data.culturecenter;
                    let fairday = introduce.introduce_data.fairday;
                    let infocentershopping = introduce.introduce_data.infocentershopping;
                    let opendateshopping = introduce.introduce_data.opendateshopping;
                    let opentime = introduce.introduce_data.opentime;
                    let parkingshopping = introduce.introduce_data.parkingshopping;
                    let restdateshopping = introduce.introduce_data.restdateshopping;
                    let saleitem = introduce.introduce_data.saleitem;
                    let shopguide = introduce.introduce_data.shopguide;
                    
                    if(infocentershopping != null) {
                        tag = 
                        '<h2>문의 및 안내</h2>'+
                        '<p>'+infocentershopping+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(shopguide != null) {
                        tag = 
                        '<h2>매장안내</h2>'+
                        '<p>'+shopguide+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(chkpetshopping != null) {
                        tag = 
                        '<h2>애완동물동반가능 정보</h2>'+
                        '<p>'+chkpetshopping+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(culturecenter != null) {
                        tag = 
                        '<h2>문화센터 바로가기</h2>'+
                        '<p>'+culturecenter+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(fairday != null) {
                        tag = 
                        '<h2>장서는 날</h2>'+
                        '<p>'+fairday+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(opendateshopping != null) {
                        tag = 
                        '<h2>개장일</h2>'+
                        '<p>'+opendateshopping+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(opentime != null) {
                        tag = 
                        '<h2>영업시간</h2>'+
                        '<p>'+opentime+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(restdateshopping != null) {
                        tag = 
                        '<h2>쉬는날</h2>'+
                        '<p>'+restdateshopping+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(parkingshopping != null) {
                        tag = 
                        '<h2>주차시설</h2>'+
                        '<p>'+parkingshopping+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(saleitem != null) {
                        tag = 
                        '<h2>판매 품목</h2>'+
                        '<p>'+saleitem+'</p>';
                        $("#explanation").append(tag);
                    }
                }
                // 39 음식점                
                if (contenttypeid = 39) {
                    let firstmenu = introduce.introduce_data.firstmenu;
                    let infocenterfood = introduce.introduce_data.infocenterfood;
                    let opendatefood = introduce.introduce_data.opendatefood;
                    let opentimefood = introduce.introduce_data.opentimefood;
                    let packing = introduce.introduce_data.packing;
                    let parkingfood = introduce.introduce_data.parkingfood;
                    let reservationfood = introduce.introduce_data.reservationfood;
                    let restdatefood = introduce.introduce_data.restdatefood;
                    let seat = introduce.introduce_data.seat;
                    let treatmenu = introduce.introduce_data.treatmenu;

                    if(firstmenu != null) {
                        tag = 
                        '<h2>대표 메뉴</h2>'+
                        '<p>'+firstmenu+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(treatmenu != null) {
                        tag = 
                        '<h2>취급 메뉴</h2>'+
                        '<p>'+treatmenu+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(infocenterfood != null) {
                        tag = 
                        '<h2>문의 및 안내</h2>'+
                        '<p>'+infocenterfood+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(reservationfood != null) {
                        tag = 
                        '<h2>예약안내</h2>'+
                        '<p>'+reservationfood+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(opendatefood != null) {
                        tag = 
                        '<h2>개업일</h2>'+
                        '<p>'+opendatefood+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(opentimefood != null) {
                        tag = 
                        '<h2>영업시간</h2>'+
                        '<p>'+opentimefood+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(restdatefood != null) {
                        tag = 
                        '<h2>쉬는날</h2>'+
                        '<p>'+restdatefood+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(packing != null) {
                        tag = 
                        '<h2>포장 가능</h2>'+
                        '<p>'+packing+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(parkingfood != null) {
                        tag = 
                        '<h2>주차시설</h2>'+
                        '<p>'+parkingfood+'</p>';
                        $("#explanation").append(tag);
                    }
                    if(seat != null) {
                        tag = 
                        '<h2>좌석수</h2>'+
                        '<p>'+seat+'</p>';
                        $("#explanation").append(tag);
                    }
                }
            }
        })
    }

    // 카카오맵 선택된 장소 지도 표시
    function KakaoMap(Lat, Lng, title) {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(Lat, Lng), // 지도의 중심좌표
            level: 1, // 지도의 확대 레벨
        };  
        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 
        var markerPosition  = new kakao.maps.LatLng(Lat, Lng); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        var iwContent = '<div style="padding:5px;">'+title+
            '<br><a href="https://www.google.co.kr/maps/search/'+title+'?hl=ko" style="color:blue" target="_blank">큰지도보기</a> <a href="https://www.google.co.kr/maps/dir//'+title+'" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwPosition = new kakao.maps.LatLng(Lat, Lng); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            position : iwPosition, 
            content : iwContent 
        });
  
        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker); 
        
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        
        var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
            infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        
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
    // 출발지점, 도착지점과 가장 가까운 버스터미널 검색
    function Search_NearBustml() {
        $.ajax({
            type:"get",
            url:"/api/bus/TmlList",
            success:function(DBBusTml) {
                b_distance_List = [];
                b_distance_start_stts_list = [];

                BusTml_result.push(DBBusTml.ButTml_List);
                for(let i = 0; i<DBBusTml.ButTml_List.length; i++) {
                    let StartDistance = KaKaoMapDistance(DBBusTml.ButTml_List[i].lat,DBBusTml.ButTml_List[i].lng,StartLat,StartLng);
                    let EndDistance = KaKaoMapDistance(DBBusTml.ButTml_List[i].lat,DBBusTml.ButTml_List[i].lng,EndLat,EndLng);
                    
                    b_distance_start_List.push(StartDistance);
                    b_distance_End_List.push(EndDistance);
                    
                    _b_distance_start_List.push({
                        BusTml:DBBusTml.ButTml_List[i].name,
                        distance:StartDistance,
                        terminalId:DBBusTml.ButTml_List[i].terminalId
                    });
                    _b_distance_End_List.push({
                        BusTml:DBBusTml.ButTml_List[i].name,
                        distance:EndDistance,
                        terminalId:DBBusTml.ButTml_List[i].terminalId
                    })
                }
                let _min_start_value = Math.min(...b_distance_start_List);
                let _min_end_value = Math.min(...b_distance_End_List);
                for(let j = 0; j<b_distance_start_List.length; j++) {
                    // 시작 버스터미널
                    if(_min_start_value == b_distance_start_List[j]) {
                        start_Busstts = BusTml_result[0][j];
                    }
                    // 도착 버스터미널
                    if(_min_end_value == b_distance_End_List[j]) {
                        end_Busstts = BusTml_result[0][j];
                        let TmlName = "[도착터미널 : "+BusTml_result[0][j].name+"]";
                        $("#Bus_Title").append(TmlName);
                    }
                }
                // 배열안의 가장 작은값 제외
                for(let a = 0; a < b_distance_start_List.length; a++) {
                    if(_min_start_value == b_distance_start_List[a]) {
                        b_distance_start_List.splice(a, 1);
                        a--;
                    }
                }
                let terminalId = start_Busstts.terminalId;
                Check_NearBustml(terminalId);
            }
        });
    }
    // 버스경로 탐색
    function Check_NearBustml(terminalId) {
        let _now = new Date();
        let year = _now.getFullYear();
        let month = _now.getMonth() + 1; 
        let date = _now.getDate(); 
        let format_now = (`${year}${month >= 10 ? month : '0' + month}${date >= 10 ? date : '0' + date}`);

        let url = 
            "/openapi/bus/searchNearTml?depTerminalId="+terminalId+
            "&arrTerminalId="+end_Busstts.terminalId+
            "&depPlandTime="+format_now;
        $.ajax({
            type:"get",
            url:url,
            success:function(chk_route) {
                // console.log(chk_route);
                if(chk_route.data == 99) {
                    let tag = 
                    '<tr>'+
                        '<td colspan="6"><h1>LIMITED NUMBER OF SERVICE REQUESTS EXCEEDS ERROR.</h1></td>'+
                    '</tr>';
                    $("#Search_Bus_info").append(tag);
                    return;
                }
                if(chk_route.data.length === 0) {
                    b_check_Null_cnt++;
                    Research_BusTml(0);
                    return;
                }
                for(let i = 0; i<chk_route.data.length;i++) {
                    let tag = 
                        '<tr>'+
                            '<td>'+chk_route.data[i].depPlaceNm+'</td>'+
                            '<td>'+chk_route.data[i].depPlandTime+'</td>'+
                            '<td>'+chk_route.data[i].arrPlaceNm+'</td>'+
                            '<td>'+chk_route.data[i].arrPlandTime+'</td>'+
                            '<td>'+chk_route.data[i].gradeNm+'</td>'+
                            '<td>'+chk_route.data[i].charge+'</td>'+
                        '</tr>';
                    $("#Search_Bus_info").append(tag);
                }
            }
        })
    }

    // 버스경로 재탐색
    function Research_BusTml(_chkCnt) {
        console.log(b_check_Null_cnt+"번째 버스노선 경로를 재탐색합니다.");
        let New_start_Busstts;
        // bus_min_value_sort = b_distance_List.sort();
        let Re_min_value =  Math.min(...b_distance_start_List);
        // console.log("다음 측정 거리 : "+Re_min_value+" | 배열 길이 : "+b_distance_start_stts_list.length);
        
        let check_reg_stts = JSON.stringify(_b_distance_start_List);
        let _check_reg_stts = JSON.parse(check_reg_stts);
        if(_chkCnt === 0) {
            for(let j = 0; j < b_distance_start_List.length; j++) {
                if(b_distance_start_List.length == 207) {
                    let tag = 
                    '<tr>'+
                        '<td colspan="6"><h1>직통경로가 없습니다. 환승경로를 확인해주세요.</h1></td>'+
                    '</tr>';
                    $("#Search_Bus_info").append(tag);
                    console.log("버스노선 경로탐색을 종료합니다.");
                    return 0;
                }
                if(Re_min_value == _check_reg_stts[j].distance) {
                    // console.log(_check_reg_stts[j]); 
                    // console.log(j+"번째");
                    // console.log(_check_reg_stts[j].nodeid);
                    New_start_Busstts = _check_reg_stts[j].terminalId;
                }
            }
            for(let a = 0; a < b_distance_start_List.length; a++) {
                if(Re_min_value == b_distance_start_List[a]) {
                    b_distance_start_List.splice(a, 1);
                    a--;
                }
            }
        }

        let NewterminalId = New_start_Busstts;
        Check_NearBustml(NewterminalId);
    }
    // 출발지점, 도착지점과 가장 가까운 철도역 검색
    function Search_NearTrainStts() {
        $.ajax({
            type:"get",
            url:"/api/publicTpt/selectTrainsttsCode",
            success:function(DBTrainStts) {
                t_distance_start_list = [];
                t_distance_end_List = [];
                Trainstts_result.push(DBTrainStts.data);
                for(let i = 0; i<DBTrainStts.data.length; i++) {
                    let StartDistance = KaKaoMapDistance(DBTrainStts.data[i].lat,DBTrainStts.data[i].lng,StartLat,StartLng);
                    let EndDistance = KaKaoMapDistance(DBTrainStts.data[i].lat,DBTrainStts.data[i].lng,EndLat,EndLng);
                    
                    t_distance_start_list.push(StartDistance);
                    t_distance_end_List.push(EndDistance);
                    
                    _t_distance_start_list.push({
                        Trainstts:DBTrainStts.data[i].trainstts,
                        distance:StartDistance,
                        nodeid:DBTrainStts.data[i].nodeid
                    });                
                    _t_distance_end_List.push({
                        Trainstts:DBTrainStts.data[i].trainstts,
                        distance:EndDistance,
                        nodeid:DBTrainStts.data[i].nodeid
                    })
                }
                let _min_start_value = Math.min(...t_distance_start_list);
                // console.log("시작점 가까운 거리 : " + _min_start_value);
                let _min_end_value = Math.min(...t_distance_end_List);
                // console.log("도착점 가까운 거리 : " + _min_end_value);
                for(let j = 0; j<t_distance_start_list.length; j++) {
                    if(_min_start_value == t_distance_start_list[j]) {
                        // console.log(j+"번째");
                        // console.log(Trainstts_result[0][j]);
                        start_Trainstts = Trainstts_result[0][j];
                    }
                    if(_min_end_value == t_distance_end_List[j]) {
                        // console.log(j+"번째");
                        // console.log(Trainstts_result[0][j]);
                        end_Trainstts = Trainstts_result[0][j];
                        let SttsName = "[도착역 : "+Trainstts_result[0][j].trainstts+"]";
                        $("#Train_Title").append(SttsName);
                    }
                }
                for(let a = 0; a < t_distance_start_list.length; a++) {
                    if(_min_start_value == t_distance_start_list[a]) {
                        t_distance_start_list.splice(a, 1);
                        a--;
                    }
                }
                let nodeid = start_Trainstts.nodeid;
                Check_NearTrainStts(nodeid); 
            }
        });
    }
    // 철도경로 탐색
    function Check_NearTrainStts(nodeid) {
        let _now = new Date();
        let year = _now.getFullYear();
        let month = _now.getMonth() + 1; 
        let date = _now.getDate(); 
        let format_now = (`${year}${month >= 10 ? month : '0' + month}${date >= 10 ? date : '0' + date}`);
        let url = 
            "/openapi/publicTpt/searchNearStts?Startstts="+nodeid+
            "&Endstts="+end_Trainstts.nodeid+
            "&Date="+format_now;
        $.ajax({
            type:"get",
            url:url,
            success:function(chk_route) {
                // console.log(chk_route);
                if(chk_route.data == 99) {
                    let tag = 
                    '<tr>'+
                        '<td colspan="6"><h1>LIMITED NUMBER OF SERVICE REQUESTS EXCEEDS ERROR.</h1></td>'+
                    '</tr>';
                    $("#Search_Bus_info").append(tag);
                    return;
                }
                if(chk_route.data.length === 0) {
                    t_check_Null_cnt++;
                    Research_TrainStts(0);
                    return;
                }
                for(let i = 0; i<chk_route.data.length;i++) {
                    let dep_date_format = moment(chk_route.data[i].depplandtime).format('YYYY-MM-DD HH:mm');
                    let arr_date_format = moment(chk_route.data[i].arrplandtime).format('YYYY-MM-DD HH:mm');
                    let tag = 
                        '<tr>'+
                            '<td>'+chk_route.data[i].depplacename+'</td>'+
                            '<td class="Train_Date">'+dep_date_format+'</td>'+
                            '<td>'+chk_route.data[i].arrplacename+'</td>'+
                            '<td class="Train_Date">'+arr_date_format+'</td>'+
                            '<td>'+chk_route.data[i].traingradename+'</td>'+
                            '<td>'+chk_route.data[i].adultcharge+'</td>'+
                        '</tr>';
                    $("#Search_Train_info").append(tag);
                }
            }
        })
    }
    // 철도경로 재탐색
    function Research_TrainStts(_chkCnt) {
        console.log(t_check_Null_cnt+"번째 철도노선 경로를 재탐색합니다.");
        let New_start_Trainstts;
        // min_value_sort = t_distance_List.sort();
        let Re_min_value =  Math.min(...t_distance_start_list);
        // console.log("다음 측정 거리 : "+Re_min_value+" | 배열 길이 : "+t_distance_start_stts_list.length);

        // 경로 재탐색을 위한 터미널 id, 터미널 이름, 터미널 거리 json값 파싱
        let check_reg_stts = JSON.stringify(_t_distance_start_list);
        let _check_reg_stts = JSON.parse(check_reg_stts);
        if(_chkCnt === 0) {
            for(let j = 0; j < t_distance_start_list.length; j++) {
                // console.log(min_startDis_sort[t_check_Null_cnt]);
                // console.log(_check_reg_stts[j].distance);
                if(t_distance_start_list.length == 170) {
                    let tag = 
                    '<tr>'+
                        '<td colspan="6"><h1>직통경로가 없습니다. 환승경로를 확인해주세요.</h1></td>'+
                    '</tr>';
                    $("#Search_Train_info").append(tag);
                    console.log("철도노선 경로탐색을 종료합니다.");
                    return 0;
                }
                if((Re_min_value) === (_check_reg_stts[j].distance)) {
                    // console.log(_check_reg_stts[j]); 
                    // console.log(j+"번째");
                    // console.log(_check_reg_stts[j].nodeid);
                    New_start_Trainstts = _check_reg_stts[j].nodeid;
                    break;
                }
            }
            for(let a = 0; a < t_distance_start_list.length; a++) {
                if(Re_min_value == t_distance_start_list[a]) {
                    t_distance_start_list.splice(a, 1);
                    a--;
                }
            }
        }
        Check_NearTrainStts(New_start_Trainstts);
    }
    // 주소 변환
    function getAddr(){
        // 적용예 (api 호출 전에 검색어 체크) 	
        if (!checkSearchedWord(document.form.keyword)) {
            return ;
        }
        $.ajax({
             url :"https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do?confmKey=devU01TX0FVVEgyMDIxMDgzMTA5NTA0MDExMTYwMTk=&returnUrl=http://localhost:8077"  //인터넷망
            ,type:"post"
            ,data:$("#search_jusoform").serialize()
            ,dataType:"jsonp"
            ,crossDomain:true
            ,success:function(jsonStr){
                // console.log(jsonStr);
                // console.log(jsonStr.results.juso[0].emdNm+" | "+jsonStr.results.juso[0].sggNm + " | "+jsonStr.results.juso[0].siNm);
                let sido = jsonStr.results.juso[0].siNm;
                let gubun = jsonStr.results.juso[0].sggNm;
                let dong = jsonStr.results.juso[0].emdNm;
                let new_addr = '날씨 정보 장소 : [ '+sido+" "+gubun+" "+dong+' ]'
                $("#weather_addr").append(new_addr);
                searchNxNy(sido, gubun, dong);
                // $("#list").html("");
                var errCode = jsonStr.results.common.errorCode;
                var errDesc = jsonStr.results.common.errorMessage;
                if(errCode != "0"){
                    alert(errCode+"="+errDesc);
                }else{
                    if(jsonStr != null){
                        // makeListJson(jsonStr);
                    }
                }
            }
            ,error: function(xhr,status, error){
                alert("에러발생");
            }
        });
    }
    
    //특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
    function checkSearchedWord(obj){
        if(obj.value.length >0){
            //특수문자 제거
            var expText = /[%=><]/ ;
            if(expText.test(obj.value) == true){
                alert("특수문자를 입력 할수 없습니다.") ;
                obj.value = obj.value.split(expText).join(""); 
                return false;
            }
            
            //특정문자열(sql예약어의 앞뒤공백포함) 제거
            var sqlArray = new Array(
                //sql 예약어
                "OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
                          "UNION",  "FETCH", "DECLARE", "TRUNCATE" 
            );
            
            var regex;
            for(var i=0; i<sqlArray.length; i++){
                regex = new RegExp( sqlArray[i] ,"gi") ;
                
                if (regex.test(obj.value) ) {
                    alert("\"" + sqlArray[i]+"\"와(과) 같은 특정문자로 검색할 수 없습니다.");
                    obj.value =obj.value.replace(regex, "");
                    return false;
                }
            }
        }
        return true ;
    }
    // 날씨 조회를 위한 nx,ny값 찾기
    function searchNxNy(sido,gubun,dong) {
        console.log(sido,gubun,dong);
        let url = "/api/weather/SearchNxNy?sido="+sido+"&gubun="+gubun+"&dong="+dong;
        $.ajax({
            type:"get",
            url:url,
            success:function(Readdr) {
                // console.log(Readdr);
                searchWeather(Readdr.data.nx, Readdr.data.ny);
            }
        });
    }

    // nx,ny에 따르는 날씨 조회
    function searchWeather(nx,ny) {
        // api - Weather_DetailBoard
        // let now = new Date();
        let setTime = new Date();        
        $.ajax({
            type:"get",
            url:"/openapi/weather/Weather?nx="+nx+"&ny="+ny,
            success:function(weather) {
                console.log(weather);
                localStorage.setItem("travel_weather",JSON.stringify(weather));
                // let chart_TMP = new Array(); let chart_UUU = new Array();
                // let chart_VVV = new Array(); let chart_VEC = new Array();
                // let chart_WSD = new Array(); let chart_SKY = new Array();
                // let chart_PTY = new Array(); let chart_POP = new Array();
                // let chart_PCP = new Array(); let chart_REH = new Array();
                // let chart_SNO = new Array(); let chart_hour = new Array();
                let TMP; let UUU; let VVV; let VEC; let WSD; let SKY; let PTY; let POP; let PCP; let REH; let SNO;
                for (let i = 0; i < 12; i++) {
                    let setDate = new Date();
                    if (i != 0) {
                        setDate = new Date(setTime.setHours(setTime.getHours()+1));
                    }                   
                    // setTime.setHours(now.getHours()+i); // << 이전 코드 / local -- let now = new Data() == 에러코드
                    let set_hour = setDate.getHours();
                    let set_year = setDate.getFullYear();
                    let set_month = setDate.getMonth() + 1; 
                    let set_date = setDate.getDate();
                    let format_setDate = (`${set_year}${set_month >= 10 ? set_month : '0' + set_month}${set_date >= 10 ? set_date : '0' + set_date}`);
                    let format_sethour= (`${set_hour >= 10 ? set_hour : '0' + set_hour}`);
                    chart_hour.push(format_sethour+" 시");
                    let hour = (format_sethour)+"00";
                    // console.log(format_setDate+" | "+hour);
                    for(let j=0; j < weather.data.length; j++) {
                        let fcstTime = weather.data[j].fcstTime;
                        let fcstDate = weather.data[j].fcstDate;
                        if (fcstTime == hour && fcstDate == format_setDate) {
                            let cat = weather.data[j].category;
                            if(cat == "TMP") {
                                TMP = weather.data[j].fcstValue;
                                chart_TMP.push(TMP);
                            }
                            else if(cat == "UUU") {
                                UUU = weather.data[j].fcstValue;
                                chart_UUU.push(UUU);                                
                            }
                            else if(cat == "VVV") {
                                VVV = weather.data[j].fcstValue;
                                chart_VVV.push(VVV);                                
                            }
                            else if(cat == "VEC") {
                                VEC = weather.data[j].fcstValue;
                                chart_VEC.push(VEC);                                
                            }
                            else if(cat == "WSD") {
                                WSD = weather.data[j].fcstValue;
                                chart_WSD.push(WSD);                                
                            }
                            else if(cat == "SKY") {
                                SKY = weather.data[j].fcstValue;
                                chart_SKY.push(SKY);                               
                            }
                            else if(cat == "PTY") {
                                PTY = weather.data[j].fcstValue;
                                chart_PTY.push(PTY);                                
                            }
                            else if(cat == "POP") {
                                POP = weather.data[j].fcstValue;
                                chart_POP.push(POP);                                
                            }
                            else if(cat == "PCP") {
                                PCP = weather.data[j].fcstValue;
                                chart_PCP.push(PCP);                                
                            }
                            else if(cat == "REH") {
                                REH = weather.data[j].fcstValue;
                                chart_REH.push(REH);                                
                            }
                            else if(cat == "SNO") {
                                SNO = weather.data[j].fcstValue;
                                chart_SNO.push(SNO);                            
                            }
                        }
                    };
                }
                let average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
                let ctx = $("#REH_Chart");
                window.REH_Chart = new Chart (ctx, {
                    type:"line",
                    options:{
                        responsive:false
                    },
                    data:{
                        labels:chart_hour,
                        datasets:[{
                            label:"습도 [%]",
                            data:chart_REH,
                            borderColor: ['rgba(0,30,0,0.7)'],
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4                                                                                                               
                        }]
                    }
                });
                // 배열안의 값을 number로 변환
                let chart_REH_parseInt = chart_REH.map(function (x) { 
                    return parseInt(x, 10); 
                });
                let REH_average =average(chart_REH_parseInt).toFixed(1);
                $("#REH_average").append(REH_average+" %");

                let ctx2 = $("#TMP_Chart");
                window.TMP_Chart = new Chart (ctx2, {
                    type:"line",
                    options:{
                        responsive:false,
                    },
                    data:{
                        labels:chart_hour,
                        datasets:[{
                            label:"1시간 기온 [섭씨(C)]",
                            data:chart_TMP,
                            borderColor: ['rgba(90,30,0,0.7)'],
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4                                                                                                               
                        }]
                    }
                })
                let chart_TMP_parseInt = chart_TMP.map(function (x) { 
                    return parseInt(x, 10); 
                });
                let TMP_average =average(chart_TMP_parseInt).toFixed(1);
                $("#TMP_average").append(TMP_average+" C");

                let ctx3 = $("#WSD_Chart");
                window.WSD_Chart = new Chart (ctx3, {
                    type:"line",
                    options:{
                        responsive:false
                    },
                    data:{
                        labels:chart_hour,
                        datasets:[{
                            label:"풍속 [m/s]",
                            data:chart_WSD,
                            borderColor: ['rgba(0,30,0,0.7)'],
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4                                                                                                               
                        }]
                    }
                })
                let chart_WSD_parseInt = chart_WSD.map(function (x) { 
                    return parseInt(x, 10); 
                });
                let WSD_average =average(chart_WSD_parseInt).toFixed(1);
                $("#WSD_average").append(WSD_average+" m/s");

                let chart_POP_parseInt = chart_POP.map(function (x) { 
                    return parseInt(x, 10); 
                });
                let POP_average =average(chart_POP_parseInt).toFixed(1);
                $("#POP_Info").append(POP_average+" %");

                let PCP_tag;
                for(let j = 0; j<chart_PCP.length; j++) {
                    if(chart_PCP[j] != "강수없음") {
                        PCP_tag = 
                        '<tr>'+
                            '<td class="PCP_Time">'+chart_hour[j]+'</td>'+
                            '<td class="PCP_Info">'+chart_PCP[j]+'</td>'+
                        '</tr>'
                        $("#PCP_POPInfo").append(PCP_tag);
                    }
                    if($(".PCP_Time").length == 0) {
                        if(j = (chart_PCP.length-1)) {
                            if(chart_PCP[j] == "강수없음") {
                            PCP_tag = 
                            '<td id="PCP_Info" colspan="2">12시간동안 강수 예정 없음</td>'
                            $("#PCP_POPInfo").append(PCP_tag);
                            } 
                        }
                    }
                }

                let SKY_tag;
                let Time_tag;
                for(let i = 0; i<chart_SKY.length; i++) {
                    Time_tag = '<th>'+chart_hour[i]+'</th>';
                    if(chart_SKY[i] == "1") {
                        SKY_tag = "<td>맑음</td>";
                    }
                    if(chart_SKY[i] == "3") {
                        SKY_tag = "<td>구름많음</td>";
                    }
                    if(chart_SKY[i] == "4") {
                        SKY_tag = "<td>흐림</td>";
                    }
                    if(i < 6) {
                        $("#SKYNowHour1").append(Time_tag);
                        $("#SKY_Info1").append(SKY_tag);
                    } else {
                        $("#SKYNowHour2").append(Time_tag);
                        $("#SKY_Info2").append(SKY_tag);
                    }
                }
                // window.weather_Chart.destroy();
            }
        })
    }
})