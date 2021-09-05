package com.travel.mapper.KTO;

import java.util.List;

import com.travel.vo.KTO.KTO_CategoryVO;
import com.travel.vo.KTO.KTO_RegionVO;
import com.travel.vo.KTO.KTO_baseDBVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KTO_TravelListMapper {
    public List<KTO_CategoryVO> kto_select_category2_code(String cat1);
    public List<KTO_CategoryVO> kto_select_category3_code(String cat2);
    public List<KTO_baseDBVO> kto_baseDB_search(Integer sidocode, String gubuncode, String cat1, String cat2, String cat3);
    public List<KTO_baseDBVO> kto_baseDB_search_readCnt(Integer sidocode, String gubuncode, String cat1, String cat2, String cat3);
    public KTO_CategoryVO kto_select_categoryName(String cat1, String cat2, String cat3);
    public List<KTO_RegionVO> kto_select_sidoInfo();
}
