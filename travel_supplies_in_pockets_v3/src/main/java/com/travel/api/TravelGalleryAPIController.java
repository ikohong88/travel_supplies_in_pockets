package com.travel.api;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.travel.service.TravelGalleryService;
import com.travel.vo.TravelGalleryVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TravelGalleryAPIController {
    @Autowired TravelGalleryService service;
    // select, nonselect 화면 갤러리 사진 구성
    @GetMapping("/api/TG/RandTG")
    public Map<String, Object> getRandomTravelGallery(
        @RequestParam @Nullable String sido
    ) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        System.out.println(sido);
        List<TravelGalleryVO> list = service.tg_select_rand(sido);
        resultMap.put("data", list);
        return resultMap;
    }
}
