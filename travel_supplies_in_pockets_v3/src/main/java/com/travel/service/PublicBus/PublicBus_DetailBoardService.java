package com.travel.service.PublicBus;

import java.util.List;

import com.travel.mapper.PublicBus.PublicBus_DetailBoardMapper;
import com.travel.vo.PublicBus.PublicBus_BusTmlVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublicBus_DetailBoardService {
    @Autowired PublicBus_DetailBoardMapper mapper;
    public List<PublicBus_BusTmlVO> publicbus_select_busTml() {
        return mapper.publicbus_select_busTml();
    }
}
