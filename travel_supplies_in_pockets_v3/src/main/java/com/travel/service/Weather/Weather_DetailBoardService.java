package com.travel.service.Weather;

import java.util.List;

import com.travel.mapper.Weather.Weather_DetailBoardMapper;
import com.travel.vo.Weather.Weather_AdiffusionIndexVO;
import com.travel.vo.Weather.Weather_CodeVO;
import com.travel.vo.Weather.Weather_SearchNxNyVO;
import com.travel.vo.Weather.Weather_UVIdxVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Weather_DetailBoardService {
    @Autowired Weather_DetailBoardMapper mapper;
    public Weather_SearchNxNyVO weather_select_nxny(String sido, String gubun, String dong) {
        return mapper.weather_select_nxny(sido, gubun, dong);
    }
    public List<Weather_CodeVO> weather_select_code() {
        return mapper.weather_select_code();
    }
    public Weather_AdiffusionIndexVO weather_select_adiffusionindex(String sido, String date) {
        return mapper.weather_select_adiffusionindex(sido, date);
    }
    public Weather_UVIdxVO weather_select_UVIdx(String areaNo, String date) {
        return mapper.weather_select_UVIdx(areaNo, date);
    }
}
