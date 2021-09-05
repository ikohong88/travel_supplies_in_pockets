package com.travel.service;

import com.travel.mapper.ComponentMapper;
import com.travel.vo.TravelGalleryVO;
import com.travel.vo.Component.Com_KTO_baseDBVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComponentService {
    @Autowired ComponentMapper mapper;
    public void kto_insert_baseDBList(Com_KTO_baseDBVO vo) {
        mapper.kto_insert_baseDBList(vo);
    }
    public void tg_insert_gallery(TravelGalleryVO vo) {
        mapper.tg_insert_gallery(vo);
    }
}
