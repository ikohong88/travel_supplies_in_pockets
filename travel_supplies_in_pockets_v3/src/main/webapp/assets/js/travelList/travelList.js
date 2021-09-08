$(function(){
    let currentPage = 1;
    let page_maxNum = 1;

    let local_sido;
    let local_sido_code;
    let local_gubun;
    let local_gubun_code;
    let local_lat;
    let local_lng;

    let local_cat1;
    let local_cat1_code;
    let local_cat2;
    let local_cat2_code;
    let local_cat3;
    let local_cat3_code;

    let local_img;

    kto_sido_code();
    kto_cat1_code();

    $("#sido").change(function() {
        local_sido = $("#sido").find("option:selected").val();
        local_sido_code = $("#sido").find("option:selected").attr("SidoCode");
        // console.log(local_sido_code);
        if($(".gubun").length != 0) {
            $(".gubun").remove();
        }
        local_gubun_code = undefined;
        local_gubun = null;
        kto_gubun_code(local_sido);
    });
    $("#gubun").change(function() {
        local_sido = $("#gubun").find("option:selected").val();
        local_sido_code = $("#gubun").find("option:selected").attr("SidoCode");
        local_gubun_code = $("#gubun").find("option:selected").attr("GubunCode");
        local_gubun = $("#gubun").find("option:selected").attr("GubunName");
        local_lat = $("#gubun").find("option:selected").attr("lat");
        local_lng = $("#gubun").find("option:selected").attr("lng");
    })
    
    $("#category1").change(function() {
        local_cat1_code = $("#category1").find("option:selected").val();
        local_cat1 = $("#category1").find("option:selected").attr("cat1_name");
        if($(".cat2").length != 0) {
            $(".cat2").remove();
        }
        if($(".cat3").length != 0) {
            $(".cat3").remove();
        }
        local_cat2 = null;
        local_cat2_code = undefined;
        local_cat3 = null;
        local_cat3_code = undefined;
        kto_cat2_code(local_cat1_code);   
    })
    $("#category2").change(function() {
        local_cat2_code = $("#category2").find("option:selected").val();
        local_cat2 = $("#category2").find("option:selected").attr("cat2_name");
        if($(".cat3").length != 0) {
            $(".cat3").remove();
        }
        local_cat3 = null;
        local_cat3_code = undefined;
        kto_cat3_code(local_cat2_code);  
    })
    $("#category3").change(function() {
        local_cat3_code = $("#category3").find("option:selected").val();
        local_cat3 = $("#category3").find("option:selected").attr("cat3_name");
    })

    // 조회버튼
    $("#lookup_btn").click(function() {
        if(local_sido_code == undefined) {
            alert("시도를 먼저 선택해주세요!");
            return;
        }
        $("#search_remove").remove();
        $(".resultBaseBD_total").empty();
        currentPage = 1;
        $(".current").html(currentPage);
        if($(".BaseBD_list").length != 0) {
            $(".BaseBD_list").remove();
        }
        if(document.getElementById("recent").checked) {
            kto_baseDB_search(1,local_sido_code,local_gubun_code,local_cat1_code,local_cat2_code,local_cat3_code);
        } else if(document.getElementById("view_cnt").checked) {
            kto_baseDB_search(2,local_sido_code,local_gubun_code,local_cat1_code,local_cat2_code,local_cat3_code);
        }
    })


    function kto_sido_code() {
        // api - KTO_IndexAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/select_sido_code",
            success:function(sido) {
                let choice_tag = '<option selected="selected" value="none">시도를 선택해주세요.</option>';
                $("#sido").append(choice_tag);
                for(let i = 0; i<sido.kto_sido_code.length; i++) {
                    let tag = 
                        '<option value="'+sido.kto_sido_code[i].areaCodeName+
                        '" SidoCode="'+sido.kto_sido_code[i].areaCode+'">'+
                        sido.kto_sido_code[i].areaCodeName+'</option>';                   
                    $("#sido").append(tag);
                }
            }
        })
    }

    function kto_gubun_code(sido) {
        // api - KTO_IndexAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/select_gubun_code?sido="+sido,
            success:function(gubun) {
                // console.log(gubun);
                let New_tag = '<option class="gubun" value=undefined>구군을 선택해주세요.</option>'
                $("#gubun").append(New_tag);
                for(let i = 0; i<gubun.kto_gubun_code.length; i++) {
                    let tag = 
                        '<option class="gubun" value="'+gubun.kto_gubun_code[i].areaCodeName+
                        '" SidoCode="'+gubun.kto_gubun_code[i].areaCode+
                        '" GubunCode="'+gubun.kto_gubun_code[i].code+
                        '" GubunName="'+gubun.kto_gubun_code[i].name+
                        '" lat="'+gubun.kto_gubun_code[i].lat+
                        '" lng="'+gubun.kto_gubun_code[i].lng+
                        '">'+
                        gubun.kto_gubun_code[i].name+'</option>';                                
                    $("#gubun").append(tag);
                }
            }
        })
    }

    function kto_cat1_code() {
        // api - KTO_IndexAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/select_category_code",
            success:function(cat) {
                // console.log(cat);
                let choice_tag = '<option selected="selected" value="none">메인 카테고리를 선택해주세요.</option>';
                $("#category1").append(choice_tag);
                for(let i = 0; i<cat.kto_cate_code.length; i++) {
                    let tag = 
                        '<option value="'+cat.kto_cate_code[i].cat1+
                        '" cat1_name="'+cat.kto_cate_code[i].mainCategory+
                        '">'+
                        cat.kto_cate_code[i].mainCategory+'</option>';                   
                    $("#category1").append(tag);
                }
            }
        })
    }

    function kto_cat2_code(cat1) {
        // api - KTO_TravelListAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/selectCategory/1?cat1="+cat1,
            success:function(cat2) {
                console.log(cat2);
                let New_tag = '<option class="cat2" value="none">카테고리2 선택!</option>'
                $("#category2").append(New_tag);
                for(let i = 0; i<cat2.kto_cate2_code.length; i++) {
                    let tag = 
                        '<option class="cat2" value="'+cat2.kto_cate2_code[i].cat2+
                        '" cat2_name="'+cat2.kto_cate2_code[i].middleCategory+
                        '">'+
                        cat2.kto_cate2_code[i].middleCategory+'</option>';                              
                    $("#category2").append(tag);
                }
            }
        })
    }

    function kto_cat3_code(cat2) {
        $.ajax({
            type:"get",
            url:"/api/kto/selectCategory/2?cat2="+cat2,
            success:function(cat3) {
                console.log(cat3);
                let New_tag = '<option class="cat2" value="none">카테고리3 선택!</option>'
                $("#category2").append(New_tag);
                for(let i = 0; i<cat3.kto_cate3_code.length; i++) {
                    let tag = 
                        '<option class="cat3" value="'+cat3.kto_cate3_code[i].cat3+
                        '" cat3_name="'+cat3.kto_cate3_code[i].subCategory+
                        '">'+
                        cat3.kto_cate3_code[i].subCategory+'</option>';                              
                    $("#category3").append(tag);
                }
            }
        })
    }

    function kto_baseDB_search(check_radio, sidocode, gubuncode, cat1, cat2, cat3) {
        let url = 
            "/api/kto/searchBaseDB/"+check_radio+"?sidocode="+sidocode+
            "&gubuncode="+gubuncode+
            "&cat1="+cat1+
            "&cat2="+cat2+
            "&cat3="+cat3;
        $.ajax({
            type:"get",
            url:url,
            success:function(BaseDBResult) {
                // console.log(BaseDBResult.baseDB_Result.length);
                if(BaseDBResult.baseDB_Result.length == 0) {
                    let tag = 
                        '<tr class="BaseBD_list" colspan="5" style="height: 500px; text-align:center;">'+
                            '<td colspan="5"><h1 style="margin-top: 240px; font-size: 30px;">데이터가 없습니다. 다시 검색해주세요.</h1></td>'+
                            '</tr>';
                    $("#resultBaseBD_list").append(tag);
                    return;
                }
                page_maxNum = Math.ceil(BaseDBResult.baseDB_Result.length/7);
                $(".resultBaseBD_total").append(page_maxNum);
                for(let i=0; i<page_maxNum; i++) {
                    let _tag = "<tbody class='resultBaseBD_tbody'></tbody>";
                    $("#resultBaseBD_table").append(_tag);
                }
                for(let i=0;i<BaseDBResult.baseDB_Result.length;i++) {
                    let page = Math.floor(i/7); 
                    let addr = BaseDBResult.baseDB_Result[i].areaCodeName+" "+BaseDBResult.baseDB_Result[i].name;
                    let cat = BaseDBResult.baseDB_Result[i].mainCategory+" > "+BaseDBResult.baseDB_Result[i].middleCategory;
                    let tag = 
                        '<tr class="BaseBD_list">'+
                            '<td>'+addr+'</td>'+
                            '<td>'+cat+'</td>'+
                            '<td class="select_baseDB"><a class="baseDB_val" href="#"><input class="baseDB_input_val" type="hidden" value="'+
                            BaseDBResult.baseDB_Result[i].contenttypeid+'" contentid="'+
                            BaseDBResult.baseDB_Result[i].contentid+'" f_image="'+
                            BaseDBResult.baseDB_Result[i].firstimage+'" f_image2="'+
                            BaseDBResult.baseDB_Result[i].firstimage2+'" MainCat="'+
                            BaseDBResult.baseDB_Result[i].firstimage+'" MiddleCat="'+
                            BaseDBResult.baseDB_Result[i].firstimage+'" SubCat="'+
                            BaseDBResult.baseDB_Result[i].firstimage2+'">'+
                            BaseDBResult.baseDB_Result[i].title+'</a></td>'+
                            '<td class="readCnt">'+BaseDBResult.baseDB_Result[i].readcount+'</td>'+
                            '<td class="mod_date">'+BaseDBResult.baseDB_Result[i].format_mod+'</td>'+
                        '</tr>';
                    $(".resultBaseBD_tbody").eq(page).append(tag);
                }
                $(".resultBaseBD_tbody").eq(0).addClass("active");
                
                aTag_clickEvent();
            }
        })
    }
    // 좌우 페이징 버튼
    $("#next_page").click(function() {
        currentPage = Number($(".current").html());
        currentPage++;
        if(currentPage > page_maxNum) currentPage = page_maxNum;
        $(".current").html(currentPage);
        $(".resultBaseBD_tbody").removeClass("active");
        $(".resultBaseBD_tbody").eq(currentPage-1).addClass("active");
    })
    $("#prev_page").click(function() {
        currentPage = Number($(".current").html());
        currentPage--;
        if(currentPage <= 0) currentPage = 1;
        $(".current").html(currentPage);
        $(".resultBaseBD_tbody").removeClass("active");
        $(".resultBaseBD_tbody").eq(currentPage-1).addClass("active");
    })
    function OPANAPI_DetailCom(ctid,cTypeId) {
        $.ajax({
            type:"get",
            url:"/openapi/kto/detailCommon?contentid="+ctid+"&contentTypeId="+cTypeId,
            success:function(r) {
                console.log(r);
                localStorage.setItem("UserSelectInfo",JSON.stringify(r.detailCom_Info));
                let addr = r.detailCom_Info.addr1 + " " + r.detailCom_Info.addr2 + " " + r.detailCom_Info.addr3;
                if(r.detailCom_Info.addr1 == null) {
                    addr = '주소 데이터 정보 없음'
                }
                let overview = r.detailCom_Info.overview 
                if(r.detailCom_Info.overview == null) {
                    overview = "정보 없음"
                }
                let description_tag = 
                    '<h2 id="description_title">'+r.detailCom_Info.title+'</h2>'+
                    '<p id="description_addr">'+addr+'</p>'+
                    '<p id="description">'+overview+'</p>'+
                    '<div class="link_area">'+
                        '<a href="/travel/detailBoard" id="detail_link">상세정보 확인하기</a>'+
                    '</div>';
                $(".description_box").append(description_tag);               
            }
        });
    }

     // a Tag class click Event
     function aTag_clickEvent() {
        var val_function = function() {
            $("#description_title").remove();
            $("#description_addr").remove();
            $("#description").remove();
            $("#first_img").remove();
            $("#detail_link").remove();
            let cTypeId = ($(this).children().eq(0).val());
            let cTid = ($(this).children().attr("contentid"));
            let Fimg = ($(this).children().attr("f_image"));
            // let Fimg2 = ($(this).children().attr("f_image2"));
            // console.log(cTypeId);
            // console.log(cTid);
            let img_tag;
            if(Fimg == "null") { 
                    '<img id="first_img" src="http://placehold.it/500x350">';
                $(".img_box").append(img_tag);
                localStorage.setItem("Select_img",'none'); 
            } else {
                img_tag = 
                    '<img id="first_img" src="'+Fimg+'">';
                $(".img_box").append(img_tag);
                localStorage.setItem("Select_img",Fimg);
            }
            OPANAPI_DetailCom(cTid, cTypeId);
        }
        let element = document.getElementsByClassName("baseDB_val");
        // console.log("================ aTagLength : "+element.length);
        for(v=0; v < element.length; v++) {
            element[v].addEventListener('click', val_function, false);
        }
    }
})