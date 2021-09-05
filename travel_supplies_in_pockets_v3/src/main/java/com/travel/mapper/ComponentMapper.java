package com.travel.mapper;

import com.travel.vo.TravelGalleryVO;
import com.travel.vo.Component.Com_KTO_baseDBVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ComponentMapper {
    public void kto_insert_baseDBList(Com_KTO_baseDBVO vo);
    public void tg_insert_gallery(TravelGalleryVO vo);
}
