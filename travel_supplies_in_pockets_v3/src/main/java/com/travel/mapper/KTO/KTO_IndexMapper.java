package com.travel.mapper.KTO;

import java.util.List;

import com.travel.vo.KTO.KTO_CategoryVO;
import com.travel.vo.KTO.KTO_RegionVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KTO_IndexMapper {
    public List<KTO_RegionVO> kto_select_sido_code();
    public List<KTO_RegionVO> kto_select_gubun_code(String sido);
    public List<KTO_CategoryVO> kto_select_category_code();
}
