package com.travel.service;

import java.util.List;

import com.travel.mapper.TravelGalleryMapper;
import com.travel.vo.TravelGalleryVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TravelGalleryService {
    @Autowired TravelGalleryMapper mapper;
    public List<TravelGalleryVO> tg_select_rand(String sido) {
        return mapper.tg_select_rand(sido);
    }
}
