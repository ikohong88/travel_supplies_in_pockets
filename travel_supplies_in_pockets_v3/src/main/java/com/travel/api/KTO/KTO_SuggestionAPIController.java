package com.travel.api.KTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.travel.service.KTO.KTO_SuggestionService;
import com.travel.vo.KTO.KTO_baseDBVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KTO_SuggestionAPIController {
    @Autowired KTO_SuggestionService service;
    @GetMapping("/api/kto/suggestionTableInfo")
    public Map<String,Object> getSuggestionTableInfo(
        @RequestParam @Nullable String sido,
        @RequestParam @Nullable String gubun,
        @RequestParam @Nullable String cat1
    ) {
        
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        String dateRange;
        if(sido == null) {
            dateRange = null;
        }
        Date now = new Date();
        SimpleDateFormat formatYear = new SimpleDateFormat("yyyy");
        String now_Year = formatYear.format(now);
        dateRange = now_Year+"-01-01";

        List<KTO_baseDBVO> list = service.kto_select_suggestion(sido, gubun, cat1, dateRange);

        resultMap.put("data", list);
        return resultMap;
    }
}
