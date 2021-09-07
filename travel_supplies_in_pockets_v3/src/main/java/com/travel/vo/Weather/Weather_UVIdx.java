package com.travel.vo.Weather;

import lombok.Data;

@Data
public class Weather_UVIdx {
    private String code;
    private String areaNo;
    private String date;
    private String today;
    private String tomorrow;
    private String dayaftertomorrow;
    private String twodaysaftertomorrow;    
}
