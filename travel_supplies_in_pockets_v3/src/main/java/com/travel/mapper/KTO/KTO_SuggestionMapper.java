package com.travel.mapper.KTO;

import java.util.List;

import com.travel.vo.KTO.KTO_baseDBVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KTO_SuggestionMapper {
    public List<KTO_baseDBVO> kto_select_suggestion(String sido, String gubun, String cat1, String dateRange);
}
