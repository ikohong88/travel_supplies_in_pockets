package com.travel.vo.Weather;

import lombok.Data;

@Data
public class Weather_CodeVO {
    // DB
    private String fcstclassification;
    private Integer fcstcode;
    private Integer code;
    private String itemvalue;
    private String itemname;
    private String unit;
}
