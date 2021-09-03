package com.travel.vo.KTO;

import java.util.Date;

import lombok.Data;

@Data
public class KTO_baseDBVO {
    private Integer areacode;
    private String cat1;
    private String cat2;
    private String cat3;
    private Integer contentid;
    private Integer contenttypeid;
    private Date createdtime;
    private String firstimage;
    private String firstimage2;
    private Double mapx;
    private Double mapy;
    private Integer mlevel;
    private Date modifiedtime;
    private Integer readcount;
    private Integer sigungucode;
    private String title;

    private String areaCodeName;
    private String name;
    private String mainCategory;
    private String middleCategory;
    private String subCategory;

    private String format_mod;
}
