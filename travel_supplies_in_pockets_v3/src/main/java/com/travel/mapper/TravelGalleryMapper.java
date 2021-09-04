package com.travel.mapper;

import com.travel.vo.TravelGalleryVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TravelGalleryMapper {
    public TravelGalleryVO tg_select_rand(String sido);
}
