package com.travel.vo.PublicBus;

import lombok.Data;

@Data
public class PublicBus_SearchBusRouteVO {
    private String arrPlaceNm;
    private String arrPlandTime;
    private String charge;
    private String depPlaceNm;
    private String depPlandTime;
    private String gradeNm;
    private String routeId;
}
