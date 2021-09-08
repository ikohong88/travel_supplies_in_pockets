package com.travel.mapper.PublicBus;

import com.travel.vo.PublicBus.CityBus_CityCodeVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CityBus_DetailBoardMapper {
    public void citybus_insert_cityCode(CityBus_CityCodeVO vo);
}
