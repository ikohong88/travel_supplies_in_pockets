package com.travel.component;

import java.net.URLEncoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.ComponentService;
import com.travel.vo.TravelGalleryVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@Component
public class TravelGalleryComponent extends ServiceKey {
    @Autowired ComponentService service;
    @Scheduled(cron = "0 30 14 */1 * *") // 매일 14시 30분 데이터 업데이트
    public void getCoronaSido() throws Exception {
        // 1. 데이터를 가져올 URL을 만드는 과정
        StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/galleryList"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10000", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("TP", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); 
        
        // 2. 데이터 요청 (Request)
        // java.xml.parser
        DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
        // org.w3c.dom
        Document doc = dBuilder.parse(urlBuilder.toString());

        // 3. XML 파싱 시작
        // text -> Node 변환
        doc.getDocumentElement().normalize();
        System.out.println(doc.getDocumentElement().getNodeName());

        NodeList nList = doc.getElementsByTagName("item");
        System.out.println("Component TG 데이터 수 : "+nList.getLength());
        
        for(int i=0; i<(nList.getLength())-1; i++) {
            try {
                Node n = nList.item(i);
                Element elem = (Element)n;    

                String galContentId = getTagValue("galContentId", elem);
                String galContentTypeId = getTagValue("galContentTypeId", elem);
                String galPhotographer = getTagValue("galPhotographer", elem);
                String galPhotographyLocation = getTagValue("galPhotographyLocation", elem);
                String galPhotographyCreateDt = getTagValue("galPhotographyMonth", elem);
                String galSearchKeyword = getTagValue("galSearchKeyword", elem);
                String galTitle = getTagValue("galTitle", elem);
                String galWebImageUrl = getTagValue("galWebImageUrl", elem);

                String galPhotographyYear = galPhotographyCreateDt.substring(0,4);
                String galPhotographyMonth = galPhotographyCreateDt.substring(4,6);

                String sido = "";
                String gu = "";
                String[] Location = galPhotographyLocation.split(" ");
                for(int j = 0; j<Location.length; j++) {
                    sido = Location[0];
                    if(j == 1) {
                        gu = Location[1];
                    }
                                        
                }
                galSearchKeyword = galSearchKeyword.replaceAll(" ", "");
                String[] split = galSearchKeyword.split(",");
                String galHashTag = "";
                for (int j = 0; j<split.length; j++) {
                    if (j < (split.length)-1) {
                        galHashTag += "#"+split[j]+" , ";
                    }                    
                    else {
                        galHashTag += "#"+split[j];
                    }
                }

                TravelGalleryVO vo = new TravelGalleryVO();

                vo.setGalContentId(Integer.parseInt(galContentId));
                vo.setGalContentTypeId(Integer.parseInt(galContentTypeId));
                vo.setGalPhotographer(galPhotographer);
                vo.setGalPhotographyLocation(galPhotographyLocation);
                vo.setGalSido(sido);
                vo.setGalGu(gu);
                vo.setGalPhotographyYear(Integer.parseInt(galPhotographyYear));
                vo.setGalPhotographyMonth(Integer.parseInt(galPhotographyMonth));
                vo.setGalHashTag(galHashTag);
                vo.setGalTitle(galTitle);
                vo.setGalWebImageUrl(galWebImageUrl);

                service.tg_insert_gallery(vo);
            } catch(NullPointerException ne) {
                System.out.println(i + " 번째 NullPointException");
            }
        }
    }
}
