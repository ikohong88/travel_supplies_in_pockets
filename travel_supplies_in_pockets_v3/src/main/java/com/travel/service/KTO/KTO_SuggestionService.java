package com.travel.service.KTO;

import java.util.List;

import com.travel.mapper.KTO.KTO_SuggestionMapper;
import com.travel.vo.KTO.KTO_baseDBVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KTO_SuggestionService {
    @Autowired KTO_SuggestionMapper mapper;
    public List<KTO_baseDBVO> kto_select_suggestion(String sido, String gubun, String cat1, String dateRange) {
        return mapper.kto_select_suggestion(sido, gubun, cat1, dateRange);
    }
}
