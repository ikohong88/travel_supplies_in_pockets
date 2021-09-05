package com.travel.mapper.Weather;

import java.util.List;

import com.travel.vo.Weather.Weather_CodeVO;
import com.travel.vo.Weather.Weather_SearchNxNyVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Weather_DetailBoardMapper {
    public Weather_SearchNxNyVO weather_select_nxny(String sido, String gubun, String dong);
    public List<Weather_CodeVO> weather_select_code();
}
