package com.travel.vo;

import lombok.Data;

@Data
public class TravelGalleryVO {
    private Integer galContentId;
    private Integer galContentTypeId;
    private String galPhotographer;
    
    private Integer galPhotographyYear;
    private Integer galPhotographyMonth;
    private String galHashTag;
    private String galTitle;
    private String galWebImageUrl;
    private String galPhotographyLocation;
    private String galSido;
    private String galGu;
}
