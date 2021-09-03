package com.travel.vo.Weather;

import lombok.Data;

@Data
public class Weather_SearchNxNyVO {
    private String lang;
    private String code;
    private String sido;
    private String gubun;
    private String dong;
    private Double lat;
    private Double lng;
    private Integer nx;
    private Integer ny; 
}
