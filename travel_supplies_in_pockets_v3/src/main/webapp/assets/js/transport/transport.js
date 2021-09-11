$(function() {
    let Kakao_searchAddress = JSON.parse(localStorage.getItem("Kakao_searchAddr"));
    let Index_info = JSON.parse(localStorage.getItem("index_data"));
    let KakaoAddr = new Array();

    console.log(Index_info);
    // kakaosearchAddr()
    $("#downloadCSV").click(function() {
        kakaomakeCSV()
    })

    $("#reset").click(function() {
        let conf_reset = confirm("주소를 초기화 하시겠습니까?");
        if(conf_reset == true) {
            localStorage.removeItem("Kakao_searchAddr");
        }
    })

    if(Kakao_searchAddress == null) {
        let conf_select = confirm("정확한 검색을 위해 주소를 입력해주시는게 좋습니다.\n주소를 입력하시겠습니까?")
        if(conf_select == true) {
            Kakao_searchAddr();
        } else if(conf_select == false) {
            if(Index_info.select == "nonselect") {
                alert("출발지점이 지정되있지 않습니다.\n주소를 검색해주세요.");
                Kakao_searchAddr();
            } else {
                index_addr = Index_info.sido + " " + Index_info.gubun;
                KakaoSearchLatLng(index_addr);
            }
        }
    } else {
        console.log(Kakao_searchAddress);
        KakaoSearchLatLng(Kakao_searchAddress.address);
    } 
    // 주소 검색 api
    function Kakao_searchAddr() {
        new daum.Postcode({
            oncomplete: function(data) {
                let search_addr = JSON.stringify(data);
                localStorage.setItem("Kakao_searchAddr", search_addr);
                console.log(data)
                KakaoSearchLatLng(data.address);
            }
        }).open();
    }
    // kakao lat, lng에 따르는 주소조회
    function kakaosearchAddr() {
        var center = new kakao.maps.LatLng(37.566826, 126.9786567);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(center, CenterInfo);
        searchDetailAddrFromCoords(center, CenterInfo);

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }
        
        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
        
        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function CenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        let data = {
                            address:result[i].address_name,
                            addr1:result[i].region_1depth_name,
                            addr2:result[i].region_2depth_name,
                            addr3:result[i].region_3depth_name
                        }
                        KakaoAddr.push(data);
                        console.log(result[i]);
                        break;
                    }
                }
            }    
        }
        downloadCSV()
    }

    function downloadCSV(ResultAddr){
        console.log("파일 생성 시작")
        // console.log(KakaoAddr);
		var a = "";
		$.each(ResultAddr, function(i, item){
			a += item.nodenm + "," + item.addr1 + "," + item.addr2 + "," + item.addr3 + "\r\n";
		});

		var downloadLink = document.createElement("a");
		var blob = new Blob([a], { type: "text/csv;charset=utf-8" });
		var url = URL.createObjectURL(blob);
		downloadLink.href = url;
		downloadLink.download = "data.csv";

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
        console.log("파일 생성 종료")
	}

    // Kakao 주소에 따르는 lat,lng 조회
    function KakaoSearchLatLng(addr) {
        var geocoder = new kakao.maps.services.Geocoder();
        var coords;
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addr, function(result, status) {
        // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                // console.log(coords);
            };
        });
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

    // function kakaomakeCSV() {
    //     $.ajax({
    //         type:"get",
    //         url:"/api/citybus/selectlatlng",
    //         success:function(r) {
    //             // console.log(r.data[0]);
    //             console.log("작업 시작----------------------");
    //             for(let i = 0; i<r.data.length; i++) {                
    //                 var center = new kakao.maps.LatLng(r.data[i].lat, r.data[i].lng);

    //                 // 주소-좌표 변환 객체를 생성합니다
    //                 var geocoder = new kakao.maps.services.Geocoder();
            
    //                 // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    //                 searchAddrFromCoords(center, CenterInfo);
    //                 // searchDetailAddrFromCoords(center, CenterInfo);
            
    //                 function searchAddrFromCoords(coords, callback) {
    //                     // 좌표로 행정동 주소 정보를 요청합니다
    //                     geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    //                 }
                    
    //                 // function searchDetailAddrFromCoords(coords, callback) {
    //                 //     // 좌표로 법정동 상세 주소 정보를 요청합니다
    //                 //     geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    //                 // }
                    
    //                 // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    //                 function CenterInfo(result, status) {
    //                     if (status === kakao.maps.services.Status.OK) {
    //                         // 여기가 실행되기 전에
    //                         for(var j = 0; j < result.length; j++) {
    //                             // 행정동의 region_type 값은 'H' 이므로
    //                             if (result[j].region_type === 'H') {
    //                                 let data = {
    //                                     nodenm:r.data[i].nodenm,
    //                                     address:result[j].address_name,
    //                                     addr1:result[j].region_1depth_name,
    //                                     addr2:result[j].region_2depth_name,
    //                                     addr3:result[j].region_3depth_name
    //                                 }
    //                                 // 배열에 데이터값 삽입
    //                                 KakaoAddr.push(data);
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                     // 이쪽이 카카오 API를 통한 주소 알아내기의
    //                     // 콜백 함수이기 때문에, 
    //                     // 보니까 이게 콜백 실행될 때 마다 데이터가 1개씩 추가되는거 같은데요
    //                     // 하나의 lat,lng에 따르는 하나의 데이터만 추가가되는데 지금 약 15만개를 조회후
    //                     // csv파일로 추출을 해서 mysql에 추가를 할 예정입니다;;;
    //                     // 그럼 작업 감시 스레드를 하나 돌리셔서 완료시점을 봐야겠네요
    //                     if(i == (r.data.length-1)) {
    //                         console.log("작업완료! csv파일 생성");
    //                         downloadCSV(KakaoAddr);
    //                     }
    //                 }               
    //             // 이쪽이 먼저 실행되네요
    //             // 이 시점에서는 추가가 완료 안되어있을 가능성이 매우 높죠
    //             }        
    //         }
    //     })
    // }
})