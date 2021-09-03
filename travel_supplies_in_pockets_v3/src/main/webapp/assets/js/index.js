$(function(){
    localStorage.clear();
    let i = 1;
    let bgInterval = setInterval(function(){
        $(".container").css(
            "background-image",
            'url("/assets/images/bg'+i+'.jpg")'
        )
        i++;
        if(i > 5) i = 1;
    }, 10000);

    let local_sido;
    let local_sido_code;
    let local_gubun;
    let local_gubun_code;
    let local_lat;
    let local_lng;

    let local_cat1;
    let local_cat1_code = "none";

    kto_sido_code();
    kto_cat_code();

    $("#start_sido").change(function() {
        local_sido = $("#start_sido").find("option:selected").val();
        console.log(local_sido);
        if($(".gubun").length != 0) {
            $(".gubun").remove();
        }
        local_gubun_code = null;
        local_gubun = null;
        kto_gubun_code(local_sido);
    });
    $("#start_gubun").change(function() {
        local_sido = $("#start_gubun").find("option:selected").val();
        local_sido_code = $("#start_gubun").find("option:selected").attr("SidoCode");
        local_gubun_code = $("#start_gubun").find("option:selected").attr("GubunCode");
        local_gubun = $("#start_gubun").find("option:selected").attr("GubunName");
        local_lat = $("#start_gubun").find("option:selected").attr("lat");
        local_lng = $("#start_gubun").find("option:selected").attr("lng");
    })
    $("#category").change(function() {
        local_cat1_code = $("#category").find("option:selected").val();
        local_cat1 = $("#category").find("option:selected").attr("cat1_name");
    })

    $("#ready").click(function() {
        if(local_gubun == null) {
            alert("지역을 먼저 선택해주세요!");
            return;
        }
        let index_data = {
            sido:local_sido,
            sido_code:local_sido_code,
            gubun:local_gubun,
            gubun_code:local_gubun_code,
            cat1:local_cat1,
            cat1_code:local_cat1_code,
            lat:local_lat,
            lng:local_lng
        };
        localStorage.setItem("index_data",JSON.stringify(index_data));
        window.location.href = "http://localhost:8090//travel/select/suggestion";
    })
    
    function kto_sido_code() {
        // api - KTO_IndexAPIController
        $.ajax({
            type:"get",
            url:"/api/kto/select_sido_code",
            success:function(sido) {
                console.log(sido);
                for(let i = 0; i<sido.kto_sido_code.length; i++) {
                    let tag = 
                        '<option value="'+sido.kto_sido_code[i].areaCodeName+'">'+
                        sido.kto_sido_code[i].areaCodeName+'</option>';                   
                    $("#start_sido").append(tag);
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
                console.log(gubun);
                let New_tag = '<option class="gubun" value="none">구군을 선택해주세요.</option>'
                $("#start_gubun").append(New_tag);
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
                    $("#start_gubun").append(tag);
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
                    let tag = 
                        '<option value="'+cat.kto_cate_code[i].cat1+
                        '" cat1_name="'+cat.kto_cate_code[i].mainCategory+
                        '">'+
                        cat.kto_cate_code[i].mainCategory+'</option>';                   
                    $("#category").append(tag);
                }
            }
        })
    }
})