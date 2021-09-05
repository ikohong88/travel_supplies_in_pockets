package com.travel.vo.Weather;

import lombok.Data;

@Data
public class Weather_openapi_VilageFcstVO {
    // openapi(단기예보조회 컬럼)
    private String category;
    private String fcstDate;
    private String fcstTime;
    private String fcstValue;
    private Integer nx;
    private Integer ny;
    // DB
    private String fcstclassification;
    private String categoryName;
    private String unit;
}
