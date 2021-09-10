package com.travel.mapper.PublicBus;

import java.util.List;

import com.travel.vo.PublicBus.PublicBus_BusTmlVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PublicBus_DetailBoardMapper {
    public List<PublicBus_BusTmlVO> publicbus_select_busTml();
}