package com.travel.api.KTO;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.travel.api.ServiceKey;
import com.travel.service.KTO.KTO_IndexService;
import com.travel.vo.KTO.KTO_CategoryVO;
import com.travel.vo.KTO.KTO_RegionVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KTO_IndexAPIController extends ServiceKey {
    // Service - service > KTO
    @Autowired KTO_IndexService serivce;
    // 시도 코드 조회
    @GetMapping("/api/kto/select_sido_code")
    public Map<String, Object> getSido() {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();     
        List<KTO_RegionVO> list = serivce.kto_select_sido_code();
        resultMap.put("kto_sido_code", list);
        return resultMap;
    }
    // 구군 코드 조회
    @GetMapping("/api/kto/select_gubun_code")
    public Map<String, Object> getGubun(
        @RequestParam String sido
    ) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        List<KTO_RegionVO> list = serivce.kto_select_gubun_code(sido);
        resultMap.put("kto_gubun_code", list);
        return resultMap;
    }
    // Category 조회
    @GetMapping("/api/kto/select_category_code")
    public Map<String, Object> getCategory() {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();     
        List<KTO_CategoryVO> list = serivce.kto_select_category_code();
        resultMap.put("kto_cate_code", list);
        return resultMap;
    }
}
