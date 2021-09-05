package com.travel.vo.KTO;

import java.util.Calendar;

import lombok.Data;

@Data
public class KTO_openapi_detailCommonVO {
    private String addr1;
    private String addr2;
    private String addr3;
    private Integer areacode;
    private Integer booktour;
    private String cat1;
    private String cat2;
    private String cat3;
    private Integer contentid;
    private Integer contenttypeid;
    private Calendar createdtime;
    private Double lng;
    private Double lat;
    private Integer mlevel;
    private Calendar modifiedtime;
    private String overview;
    private Integer sigungucode;
    private String title;

    private String mainCategory;
    private String middleCategory;
    private String subCategory;
}
