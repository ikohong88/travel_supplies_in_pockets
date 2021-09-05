window.onload = $(function() {
    
    
    nonselect_suggestion_info();

    // 조건에 따르는 여행 정보 출력 (20개 제한, 수정일 올해 기준);
    function nonselect_suggestion_info() {
        $.ajax({
            type:"get",
            url:"/api/kto/suggestionTableInfo",
            success:function(suggestion) {
                console.log(suggestion);
            }
        })
    }
    
})