$(function(){
    $(".menu_btn").click(function(){
        $(this).toggleClass("open");
        $(".left_menu").toggleClass("open");
        $("body").toggleClass("open");
    })
    $("#no_option").click(function() {
        location.href = "http://localhost:8090/travel/nonselect/suggestion";
    })

    let h_local_sido;
    let h_local_sido_code;
    let h_local_gubun;
    let h_local_gubun_code;
    let h_local_lat;
    let h_local_lng;

    let h_local_cat1;
    let h_local_cat1_code = "none";

    let h_index_data = JSON.parse(localStorage.getItem("index_data"));
    let h_index_gubun = h_index_data.gubun;
    console.log(h_index_data);

    kto_sido_code();
    kto_gubun_code(h_index_data.sido);
    kto_cat_code();

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
                        '<option selected="selected" value="'+sido.kto_sido_code[i].areaCodeName+'" >'+
                        sido.kto_sido_code[i].areaCodeName+'</option>';  
                    } else {
                        tag = 
                            '<option value="'+sido.kto_sido_code[i].areaCodeName+'">'+
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