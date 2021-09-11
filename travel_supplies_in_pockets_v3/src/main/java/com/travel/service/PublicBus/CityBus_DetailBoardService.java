package com.travel.service.PublicBus;

import java.util.List;

import com.travel.mapper.PublicBus.CityBus_DetailBoardMapper;
import com.travel.vo.PublicBus.CityBus_CityCodeVO;
import com.travel.vo.PublicBus.CityBus_CityLatLngVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityBus_DetailBoardService {
    @Autowired CityBus_DetailBoardMapper mapper;
    public void citybus_insert_cityCode(CityBus_CityCodeVO vo) {
        mapper.citybus_insert_cityCode(vo);
    }
    public List<CityBus_CityLatLngVO> citybus_select_latlng() {
        return mapper.citybus_select_latlng();
    }
}
