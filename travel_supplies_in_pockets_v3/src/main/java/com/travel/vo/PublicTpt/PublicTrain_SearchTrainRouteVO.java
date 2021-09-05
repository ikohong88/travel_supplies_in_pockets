package com.travel.vo.PublicTpt;

import java.util.Calendar;

import lombok.Data;

@Data
public class PublicTrain_SearchTrainRouteVO {
    private Integer adultcharge;
    private String arrplacename;
    private Calendar arrplandtime;
    private String depplacename;
    private Calendar depplandtime;
    private String traingradename;
    private String trainno;
}
