package com.travel.mapper;

import java.util.List;

import com.travel.vo.TravelGalleryVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TravelGalleryMapper {
    public List<TravelGalleryVO> tg_select_rand(String sido);
}
