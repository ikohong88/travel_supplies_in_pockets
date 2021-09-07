$(function() {
    let index_data = JSON.parse(localStorage.getItem("index_data"));
    let travel_weather = JSON.parse(localStorage.getItem("travel_weather"));
    let Select_travel_info =  JSON.parse(localStorage.getItem("UserSelectInfo"));
    console.log(index_data);
    console.log(travel_weather);
    console.log(Select_travel_info);

    let nowDate = new Date();
    let region_tag;

    let chart_TMP = new Array(); let chart_UUU = new Array();
    let chart_VVV = new Array(); let chart_VEC = new Array();
    let chart_WSD = new Array(); let chart_SKY = new Array();
    let chart_PTY = new Array(); let chart_POP = new Array();
    let chart_PCP = new Array(); let chart_REH = new Array();
    let chart_SNO = new Array(); let chart_hour = new Array();
    let chart_FullDate = new Array();
    let TMP; let UUU; let VVV; let VEC; let WSD; let SKY; let PTY; let POP; let PCP; let REH; let SNO;
   
    // let search_time = Math.ceil((travel_weather.data.length/11));
    if (index_data.select == "nonselect") {
        searchWeather(60,127);
        AdiffusionIndex('서울특별시');
    }
    else if (travel_weather == null) {
        searchNxNy(index_data.sido, index_data.gubun);
        region_tag = index_data.sido+" "+index_data.gubun;
        $("#Weather_region").append(region_tag);
        AdiffusionIndex(index_data.sido);
    }
    else if(travel_weather.select == "nonselect") {
        searchNxNy(index_data.sido, index_data.gubun);
        region_tag = index_data.sido+" "+index_data.gubun;
        $("#Weather_region").append(region_tag);
        AdiffusionIndex(index_data.sido);
    } 
    else {
        let search_time = Math.ceil((travel_weather.data.length/11));
        region_tag = Select_travel_info.addr1+" "+Select_travel_info.addr2+" "+Select_travel_info.addr3+" [ "+Select_travel_info.title+" ]";
        $("#Weather_region").append(region_tag);
        travel_weatherInfo(search_time);
        AdiffusionIndex(Select_travel_info.addr1);
    }
    Weater_RDR();

    function Weater_RDR() {
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth()+1;
        var nowDay = nowDate.getDate();
        var nowHour = nowDate.getHours();
        var nowMin = nowDate.getMinutes();
        if(nowMin > 55) {
            nowMin = 50;
        }
        else if(nowMin > 50) {
            nowMin = 45;
        }
        else if(nowMin > 45) {
            nowMin = 40;
        }
        else if(nowMin > 40) {
            nowMin = 35;
        }
        else if(nowMin > 35) {
            nowMin = 30;
        }
        else if(nowMin > 30) {
            nowMin = 25;
        }
        else if(nowMin > 25) {
            nowMin = 20;
        }
        else if(nowMin > 20) {
            nowMin = 15;
        }
        else if(nowMin > 15) {
            nowMin = 10;
        }
        else if(nowMin > 10) {
            nowMin = 5;
        }
        else if(nowMin > 5) {
            nowMin = 0;
        }
        else if(nowMin > 0) {
            nowHour = nowHour-1;
            nowMin = 55;
        }
        var _setDate = new Date();
        var setDate = new Date(_setDate.setHours(_setDate.getHours()-12));
        var setYear = setDate.getFullYear();
        var setMonth = setDate.getMonth()+1;
        var setDay = setDate.getDate();
        var setHour = setDate.getHours();
        var setMin = setDate.getMinutes();
        if(setMin > 55) {
            setMin = 55;
        }
        else if(setMin > 50) {
            setMin = 50;
        }
        else if(setMin > 45) {
            setMin = 45;
        }
        else if(setMin > 40) {
            setMin = 40;
        }
        else if(setMin > 35) {
            setMin = 35;
        }
        else if(setMin > 30) {
            setMin = 30;
        }
        else if(setMin > 25) {
            setMin = 25;
        }
        else if(setMin > 20) {
            setMin = 20;
        }
        else if(setMin > 15) {
            setMin = 15;
        }
        else if(setMin > 10) {
            setMin = 10;
        }
        else if(setMin > 5) {
            setMin = 5;
        }
        else if(setMin > 0) {
            setMin = 0;
        }
        let RDRInterval = setInterval(function(){
            let format_setDate = (`${setYear}${setMonth >= 10 ? setMonth : '0' + setMonth}${setDay >= 10 ? setDay : '0' + setDay}`);
            var format_setTime = (`${setHour >= 10 ? setHour : '0' + setHour}${setMin >= 10 ? setMin : '0' + setMin}`);
            var search_Date = format_setDate+format_setTime;
            // console.log(search_Date);
            // $("#RDR").css(
            //     "background-image",
            //     'url("https://www.kma.go.kr/repositary/image/rdr/img/RDR_CMP_WRC_'+search_Date+'.png")'
            // )
            document.getElementById("RDR_img").src = 'https://www.kma.go.kr/repositary/image/rdr/img/RDR_CMP_WRC_'+search_Date+'.png';
            setMin+=5;
            if(setHour != nowHour){
                if(setMin > 55) {
                    setHour++;
                    setMin = 0;
                }
            }
            if(setHour == 24) {
                setDay++;
                setHour = 0;
                setMin = 0;
            }
            if(nowYear == setYear && nowMonth == setMonth && nowDay == setDay && nowHour == setHour && nowMin == setMin) {
                setYear = setDate.getFullYear();
                setMonth = setDate.getMonth()+1;
                setDay = setDate.getDate();
                setHour = setDate.getHours();
                setMin = setDate.getMinutes();
                if(setMin > 55) {
                    setMin = 55;
                }
                else if(setMin > 50) {
                    setMin = 50;
                }
                else if(setMin > 45) {
                    setMin = 45;
                }
                else if(setMin > 40) {
                    setMin = 40;
                }
                else if(setMin > 35) {
                    setMin = 35;
                }
                else if(setMin > 30) {
                    setMin = 30;
                }
                else if(setMin > 25) {
                    setMin = 25;
                }
                else if(setMin > 20) {
                    setMin = 20;
                }
                else if(setMin > 15) {
                    setMin = 15;
                }
                else if(setMin > 10) {
                    setMin = 10;
                }
                else if(setMin > 5) {
                    setMin = 5;
                }
                else if(setMin > 0) {
                    setMin = 0;
                }
            }
        }, 100);
    }

    function travel_weatherInfo(search_time) {
        for (let i = 0; i < search_time; i++) {
            let setDate = new Date();
            if (i != 0) {
                setDate = new Date(nowDate.setHours(nowDate.getHours()+1));
            }                   
            // setTime.setHours(now.getHours()+i); // << 이전 코드 / local -- let now = new Data() == 에러코드
            let set_hour = setDate.getHours();
            let set_year = setDate.getFullYear();
            let set_month = setDate.getMonth() + 1; 
            let set_date = setDate.getDate();
            let format_setDate = (`${set_year}${set_month >= 10 ? set_month : '0' + set_month}${set_date >= 10 ? set_date : '0' + set_date}`);
            let format_setFullDate = (`${set_year}-${set_month >= 10 ? set_month : '0' + set_month}-${set_date >= 10 ? set_date : '0' + set_date}`);
            let format_sethour= (`${set_hour >= 10 ? set_hour : '0' + set_hour}`);
            chart_FullDate.push(format_setFullDate);
            chart_hour.push(format_sethour+" 시");
            let hour = (format_sethour)+"00";
            // console.log(format_setDate+" | "+hour);
            for(let j=0; j < travel_weather.data.length; j++) {
                let fcstTime = travel_weather.data[j].fcstTime;
                let fcstDate = travel_weather.data[j].fcstDate;
                if (fcstTime == hour && fcstDate == format_setDate) {
                    let cat = travel_weather.data[j].category;
                    if(cat == "TMP") {
                        TMP = travel_weather.data[j].fcstValue;
                        chart_TMP.push(TMP);
                    }
                    else if(cat == "UUU") {
                        UUU = travel_weather.data[j].fcstValue;
                        chart_UUU.push(UUU);                                
                    }
                    else if(cat == "VVV") {
                        VVV = travel_weather.data[j].fcstValue;
                        chart_VVV.push(VVV);                                
                    }
                    else if(cat == "VEC") {
                        VEC = travel_weather.data[j].fcstValue;
                        chart_VEC.push(VEC);                                
                    }
                    else if(cat == "WSD") {
                        WSD = travel_weather.data[j].fcstValue;
                        chart_WSD.push(WSD);                                
                    }
                    else if(cat == "SKY") {
                        SKY = travel_weather.data[j].fcstValue;
                        chart_SKY.push(SKY);                               
                    }
                    else if(cat == "PTY") {
                        PTY = travel_weather.data[j].fcstValue;
                        chart_PTY.push(PTY);                                
                    }
                    else if(cat == "POP") {
                        POP = travel_weather.data[j].fcstValue;
                        chart_POP.push(POP);                                
                    }
                    else if(cat == "PCP") {
                        PCP = travel_weather.data[j].fcstValue;
                        chart_PCP.push(PCP);                                
                    }
                    else if(cat == "REH") {
                        REH = travel_weather.data[j].fcstValue;
                        chart_REH.push(REH);                                
                    }
                    else if(cat == "SNO") {
                        SNO = travel_weather.data[j].fcstValue;
                        chart_SNO.push(SNO);                            
                    }
                }
            };
        }
        makeWeatherInfo();
    }

    // 날씨 조회를 위한 nx,ny값 찾기
    function searchNxNy(sido,gubun) {
        console.log(sido,gubun);
        let url = "/api/weather/SearchNxNy?sido="+sido+"&gubun="+gubun;
        $.ajax({
            type:"get",
            url:url,
            success:function(Readdr) {
                console.log(Readdr);
                searchWeather(Readdr.data.nx, Readdr.data.ny);
            }, 
            error:function() {
                console.log("error");
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
                let search_time = Math.ceil((weather.data.length/11));
                let TMP; let UUU; let VVV; let VEC; let WSD; let SKY; let PTY; let POP; let PCP; let REH; let SNO;
                for (let i = 0; i < search_time; i++) {
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
                    let format_setFullDate = (`${set_year}-${set_month >= 10 ? set_month : '0' + set_month}-${set_date >= 10 ? set_date : '0' + set_date}`);
                    let format_sethour= (`${set_hour >= 10 ? set_hour : '0' + set_hour}`);
                    chart_FullDate.push(format_setFullDate);
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
                makeWeatherInfo();
            }
        })
    }

    function makeWeatherInfo() {
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
        let FullDate_tag;
        let set_FullDate = new Set(chart_FullDate);
        let _set_FullDate = [...set_FullDate];
        for(let f = 0; f < _set_FullDate.length; f++) {
            FullDate_tag = '['+_set_FullDate[f]+']';
            $("#SKY_FullDate").append(FullDate_tag);
        }
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
            if(i < chart_SKY.length/2) {
                $("#SKYNowHour1").append(Time_tag);
                $("#SKY_Info1").append(SKY_tag);
            } else {
                $("#SKYNowHour2").append(Time_tag);
                $("#SKY_Info2").append(SKY_tag);
            }
        }
        // window.weather_Chart.destroy();
    }

    function AdiffusionIndex(sido) {
        $.ajax({
            type:"get",
            url:"/api/weather/AdiffusionIndex?sido="+sido,
            success:function(ADI) {
                console.log(ADI);
                weather_UVIdx(ADI.data.areaNo);
                var date = ADI.data.date
                var ADI_year = date.substring(0,4);
                var ADI_Month = date.substring(4,6);
                var ADI_day = date.substring(6,8);
                var ADI_Hour = date.substring(8,10);
                $("#ADI_FullDate").append(ADI_year+"-"+ADI_Month+"-"+ADI_day+"-"+ADI_Hour+"시 기준");
                var ADI_tag1 = 
                    '<td>'+ADI.data.h3+'</td>'+
                    '<td>'+ADI.data.h6+'</td>'+
                    '<td>'+ADI.data.h9+'</td>'+
                    '<td>'+ADI.data.h12+'</td>'+
                    '<td>'+ADI.data.h15+'</td>'+
                    '<td>'+ADI.data.h18+'</td>'+
                    '<td>'+ADI.data.h21+'</td>'+
                    '<td>'+ADI.data.h24+'</td>'+
                    '<td>'+ADI.data.h27+'</td>'+
                    '<td>'+ADI.data.h30+'</td>'+
                    '<td>'+ADI.data.h33+'</td>'+
                    '<td>'+ADI.data.h36+'</td>'+
                    '<td>'+ADI.data.h39+'</td>'
                $("#ADI_Info1").append(ADI_tag1);
                var ADI_tag2 = 
                    '<td>'+ADI.data.h42+'</td>'+
                    '<td>'+ADI.data.h45+'</td>'+
                    '<td>'+ADI.data.h48+'</td>'+
                    '<td>'+ADI.data.h51+'</td>'+
                    '<td>'+ADI.data.h54+'</td>'+
                    '<td>'+ADI.data.h57+'</td>'+
                    '<td>'+ADI.data.h60+'</td>'+
                    '<td>'+ADI.data.h63+'</td>'+
                    '<td>'+ADI.data.h66+'</td>'+
                    '<td>'+ADI.data.h69+'</td>'+
                    '<td>'+ADI.data.h72+'</td>'+
                    '<td>'+ADI.data.h75+'</td>'+
                    '<td>'+ADI.data.h78+'</td>'
                $("#ADI_Info2").append(ADI_tag2);
            }
        })
    }

    function weather_UVIdx(areaNo) {
        $.ajax({
            type:"get",
            url:"/openapi/weather/UVIdx?areaNo="+areaNo,
            success:function(UV) {
                console.log(UV);
            }
        })
    }
})