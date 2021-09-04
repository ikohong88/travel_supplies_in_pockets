window.onload = $(function() {
    let index_data = JSON.parse(localStorage.getItem("index_data"));
    console.log(index_data);

    select_rand_gallery(index_data.sido);

    function select_rand_gallery(sido) {
        $.ajax({
            type:"get",
            url:"/api/TG/RandTG?sido="+sido,
            success:function(RandTG) {
                console.log(RandTG);
                let img_tag = 
                    '<img src="'+RandTG.data.galWebImageUrl+'" style="width:500px;">'+
                    '<h2>작품 타이틀</h2>'+
                    '<p>'+RandTG.data.galTitle+'</p>'+
                    '<h2>해쉬태그</h2>'+
                    '<p>'+RandTG.data.galHashTag+'</p>'+
                    '<h2>사진 작가/스튜디오 정보</h2>'+
                    '<p>'+RandTG.data.galPhotographer+'</p>'+
                    '<h2>촬영일</h2>'+
                    '<p>'+RandTG.data.galPhotographyYear+'년 '+RandTG.data.galPhotographyMonth+'월</p>'+
                    '<h2>장소</h2>'+
                    '<p>'+RandTG.data.galPhotographyLocation+'</p>'
                $("#suggestion_gallery_area").append(img_tag);
            }
        })
    }
})