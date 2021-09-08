package com.travel.vo.Weather;

import lombok.Data;

@Data
public class Weather_UVIdxVO {
    private String areaNo;
    private String code;
    private String date;
    private String today;
    private Integer dayaftertomorrow;
    private Integer tomorrow;
    private String twodaysaftertomorrow;
}
