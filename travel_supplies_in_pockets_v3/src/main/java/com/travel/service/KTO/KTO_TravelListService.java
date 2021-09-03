package com.travel.service.KTO;

import java.util.List;

import com.travel.mapper.KTO.KTO_TravelListMapper;
import com.travel.vo.KTO.KTO_CategoryVO;
import com.travel.vo.KTO.KTO_RegionVO;
import com.travel.vo.KTO.KTO_baseDBVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KTO_TravelListService {
    @Autowired KTO_TravelListMapper mapper;
    public List<KTO_CategoryVO> kto_select_category2_code(String cat1) {
        return mapper.kto_select_category2_code(cat1);
    }
    public List<KTO_CategoryVO> kto_select_category3_code(String cat2) {
        return mapper.kto_select_category3_code(cat2);
    }
    public List<KTO_baseDBVO> kto_baseDB_search(Integer sidocode, String gubuncode, String cat1, String cat2, String cat3) {
        return mapper.kto_baseDB_search(sidocode, gubuncode, cat1, cat2, cat3);
    }
    public List<KTO_baseDBVO> kto_baseDB_search_readCnt(Integer sidocode, String gubuncode, String cat1, String cat2, String cat3) {
        return mapper.kto_baseDB_search_readCnt(sidocode, gubuncode, cat1, cat2, cat3);
    }
    public KTO_CategoryVO kto_select_categoryName(String cat1, String cat2, String cat3) {
        return mapper.kto_select_categoryName(cat1, cat2, cat3);
    }
    public List<KTO_RegionVO> kto_select_sidoInfo() {
        return mapper.kto_select_sidoInfo();
    }
}
