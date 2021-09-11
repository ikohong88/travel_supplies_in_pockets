package com.travel.mapper.PublicBus;

import java.util.List;

import com.travel.vo.PublicBus.CityBus_CityCodeVO;
import com.travel.vo.PublicBus.CityBus_CityLatLngVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CityBus_DetailBoardMapper {
    public void citybus_insert_cityCode(CityBus_CityCodeVO vo);
    public List<CityBus_CityLatLngVO> citybus_select_latlng();
}
