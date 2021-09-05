package com.travel.service.KTO;

import java.util.List;

import com.travel.mapper.KTO.KTO_IndexMapper;
import com.travel.vo.KTO.KTO_CategoryVO;
import com.travel.vo.KTO.KTO_RegionVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 메인화면 구성
@Service
public class KTO_IndexService {
    @Autowired KTO_IndexMapper mapper;
    public List<KTO_RegionVO> kto_select_sido_code() {
        return mapper.kto_select_sido_code();
    }
    public List<KTO_RegionVO> kto_select_gubun_code(String sido) {
        return mapper.kto_select_gubun_code(sido);
    }
    public List<KTO_CategoryVO> kto_select_category_code() {
        return mapper.kto_select_category_code();
    }
}
