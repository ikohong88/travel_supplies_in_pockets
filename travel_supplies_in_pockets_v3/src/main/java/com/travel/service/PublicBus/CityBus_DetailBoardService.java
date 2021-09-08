package com.travel.service.PublicBus;

import com.travel.mapper.PublicBus.CityBus_DetailBoardMapper;
import com.travel.vo.PublicBus.CityBus_CityCodeVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityBus_DetailBoardService {
    @Autowired CityBus_DetailBoardMapper mapper;
    public void citybus_insert_cityCode(CityBus_CityCodeVO vo) {
        mapper.citybus_insert_cityCode(vo);
    }
}
