$(function(){
    $(".menu_btn").click(function(){
        $(this).toggleClass("open");
        $(".left_menu").toggleClass("open");
        $("body").toggleClass("open");
    })
    $("#Go_index").click(function() {
        if(confirm("메인화면으로 이동하시겠습니까? \n [이동시 설정한 정보는 초기화됩니다.]")) {
            location.href = "http://localhost:8090";
        };
    })

    let h_index_data = JSON.parse(localStorage.getItem("index_data"));
    
    let h_local_sido;
    let h_local_sido_code;
    let h_local_gubun;
    let h_local_gubun_code;
    let h_local_lat;
    let h_local_lng;

    let h_local_cat1;
    let h_local_cat1_code = "none";

    kto_sido_code();
    kto_cat_code();
    let h_index_gubun = h_index_data.gubun;

    if(h_index_data.select == "nonselect") {
        $("#no_option").hide();
        let non_sido_tag = '<option class="header_gubun" value="none">시도를 선택해주세요.</option>';
        $("#header_sido").append(non_sido_tag);
        let non_gubun_tag = '<option class="header_gubun" value="none">시도를 먼저 선택해주세요.</option>';
        $("#header_gubun").append(non_gubun_tag);
        
    } else if (h_index_data.select == "select") {
        $("#no_option").click(function() {
            
        });
        console.log(h_index_data);
        
        kto_gubun_code(h_index_data.sido);
    }
    // 변경 버튼
    $("#change_option").click(function() {
        if($(this).html() == "변경하기"){
            $(this).html("저장하기");
            $("#area").prop("disabled", false);
            $(".settings select").prop("disabled", false);
            return;
        }
        else {
            $(this).html("변경하기");
            $("#area").prop("disabled", true);
            $(".settings select").prop("disabled", true);
        }
        h_local_sido = $("#header_gubun").find("option:selected").val();
        h_local_sido_code = $("#header_gubun").find("option:selected").attr("SidoCode");
        h_local_gubun_code = $("#header_gubun").find("option:selected").attr("GubunCode");
        h_local_gubun = $("#header_gubun").find("option:selected").attr("GubunName");
        if(h_local_sido == undefined) {
            alert("시도를 먼저 선택해주세요.");
            return;
        }
        if(h_local_gubun == undefined) {
            alert("구군을 먼저 선택해주세요.");
            return;
        }
        index_data = {
            select:"select",
            sido:h_local_sido,
            sido_code:h_local_sido_code,
            gubun:h_local_gubun,
            gubun_code:h_local_gubun_code,
            cat1:h_local_cat1,
            cat1_code:h_local_cat1_code,
            lat:h_local_lat,
            lng:h_local_lng
        };
        localStorage.setItem("index_data",JSON.stringify(index_data));
        $("#no_option").show();
        h_index_data = JSON.parse(localStorage.getItem("index_data"));
        location.href = "http://localhost:8090/travel/select/suggestion";
        // location.reload();
    });
    // 옵션없이 준비하기 버튼
    $("#no_option").click(function() {
        index_data = {
            select:"nonselect"
        };
        localStorage.setItem("index_data",JSON.stringify(index_data));
        $("#no_option").hide();
        location.href = "http://localhost:8090/travel/nonselect/suggestion";
    });

    $("#header_sido").change(function() {
        h_local_sido = $("#header_sido").find("option:selected").val();
        console.log(h_local_sido);
        if($(".header_gubun").length != 0) {
            $(".header_gubun").remove();
        }
        h_local_gubun_code = null;
        h_local_gubun = null;
        h_index_gubun = null;
        kto_gubun_code(h_local_sido);
    });
    $("#header_gubun").change(function() {
        h_local_sido = $("#header_gubun").find("option:selected").val();
        h_local_sido_code = $("#header_gubun").find("option:selected").attr("SidoCode");
        h_local_gubun_code = $("#header_gubun").find("option:selected").attr("GubunCode");
        h_local_gubun = $("#header_gubun").find("option:selected").attr("GubunName");
        h_local_lat = $("#header_gubun").find("option:selected").attr("lat");
        h_local_lng = $("#header_gubun").find("option:selected").attr("lng");
    })

    $("#category").change(function() {
        h_local_cat1_code = $("#category").find("option:selected").val();
        h_local_cat1 = $("#category").find("option:selected").attr("cat1_name");
    })

    function kto_sido_code() {
        // api - KTO_IndexAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/select_sido_code",
            success:function(sido) {
                for(let i = 0; i<sido.kto_sido_code.length; i++) {
                    let tag;
                    if(h_index_data.sido == sido.kto_sido_code[i].areaCodeName) {
                    tag = 
                        '<option class="header_sido" selected="selected" value="'+sido.kto_sido_code[i].areaCodeName+'" >'+
                        sido.kto_sido_code[i].areaCodeName+'</option>';  
                    } else {
                        tag = 
                            '<option class="header_sido" value="'+sido.kto_sido_code[i].areaCodeName+'">'+
                            sido.kto_sido_code[i].areaCodeName+'</option>';                   
                    }
                    $("#header_sido").append(tag);
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
                let header_gubun_tag = '<option class="header_gubun" value="none">구군을 선택해주세요.</option>';
                $("#header_gubun").append(header_gubun_tag);
                for(let i = 0; i<gubun.kto_gubun_code.length; i++) {
                    let tag;
                    if(h_index_gubun == gubun.kto_gubun_code[i].name) {
                        tag = '<option selected="selected" class="header_gubun" value="'+gubun.kto_gubun_code[i].areaCodeName+
                        '" SidoCode="'+gubun.kto_gubun_code[i].areaCode+
                        '" GubunCode="'+gubun.kto_gubun_code[i].code+
                        '" GubunName="'+gubun.kto_gubun_code[i].name+
                        '" lat="'+gubun.kto_gubun_code[i].lat+
                        '" lng="'+gubun.kto_gubun_code[i].lng+
                        '">'+
                        gubun.kto_gubun_code[i].name+'</option>';
                    } else {
                        tag = 
                            '<option class="header_gubun" value="'+gubun.kto_gubun_code[i].areaCodeName+
                            '" SidoCode="'+gubun.kto_gubun_code[i].areaCode+
                            '" GubunCode="'+gubun.kto_gubun_code[i].code+
                            '" GubunName="'+gubun.kto_gubun_code[i].name+
                            '" lat="'+gubun.kto_gubun_code[i].lat+
                            '" lng="'+gubun.kto_gubun_code[i].lng+
                            '">'+
                            gubun.kto_gubun_code[i].name+'</option>';                   
                    }
                    $("#header_gubun").append(tag);
                }
            }
        })
    }

    function kto_cat_code() {
        // api - KTO_IndexAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/select_category_code",
            success:function(cat) {
                // console.log(cat);
                let non_cat1 = '<option class="gubun" value="none">취향을 선택해주세요.</option>';
                $("#category").append(non_cat1);
                for(let i = 0; i<cat.kto_cate_code.length; i++) {
                    let tag;
                    if(h_index_data.cat1_code == cat.kto_cate_code[i].cat1) {
                        tag = 
                            '<option selected="selected" value="'+cat.kto_cate_code[i].cat1+
                            '" cat1_name="'+cat.kto_cate_code[i].mainCategory+
                            '">'+
                            cat.kto_cate_code[i].mainCategory+'</option>';  
                    } else {
                        tag = 
                            '<option value="'+cat.kto_cate_code[i].cat1+
                            '" cat1_name="'+cat.kto_cate_code[i].mainCategory+
                            '">'+
                            cat.kto_cate_code[i].mainCategory+'</option>';                   
                    }
                    $("#category").append(tag);
                }
            }
        })
    }
})