package com.travel.component;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.ComponentService;
import com.travel.vo.Component.Com_KTO_baseDBVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@Component
public class KTO_Component extends ServiceKey {
    @Autowired ComponentService service;
    @Scheduled(cron = "0 30 15 */1 * *") // 매일 15시 30분 데이터 업데이트
    public void putKTOTouristInfoAreaBasedList() throws Exception {
        StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("50000", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("TP", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("arrange","UTF-8") + "=" + URLEncoder.encode("A", "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("listYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 

        DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(urlBuilder.toString());

        doc.getDocumentElement().normalize();
        System.out.println(doc.getDocumentElement().getNodeName());

        NodeList nList = doc.getElementsByTagName("item");
        System.out.println("데이터 수 : "+nList.getLength());
        
        for(int i=0; i<(nList.getLength()); i++) {
            Node n = nList.item(i);
            Element elem = (Element)n;
            
            Date cDt = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            
            System.out.println(i+"번째 데이터");
            Com_KTO_baseDBVO vo = new Com_KTO_baseDBVO();
            
            try {
                vo.setAreacode(Integer.parseInt(getTagValue("areacode", elem)));
            } catch(NullPointerException ne) {
                vo.setAreacode(null);
            }           
            try {
                vo.setCat1(getTagValue("cat1", elem));
            } catch(NullPointerException ne) {
                vo.setCat1(null);
            }           
            try {
                vo.setCat2(getTagValue("cat2", elem));
            } catch(NullPointerException ne) {
                vo.setCat2(null);
            }           
            try {
                vo.setCat3(getTagValue("cat3", elem));
            } catch(NullPointerException ne) {
                vo.setCat3(null);
            }           
            try {
                vo.setContentid(Integer.parseInt(getTagValue("contentid", elem)));
            } catch(NullPointerException ne) {
                vo.setContentid(null);
            }           
            try {
                vo.setContenttypeid(Integer.parseInt(getTagValue("contenttypeid", elem)));
            } catch(NullPointerException ne) {
                vo.setContenttypeid(null);
            }           
            try {
                String _Date = getTagValue("createdtime", elem);
                _Date = _Date.substring(0,8); 
                cDt = formatter.parse(_Date); // 문자열로부터 날짜를 유추한다.
                vo.setCreatedtime(cDt);
            } catch(NullPointerException ne) {
                vo.setCreatedtime(null);
            }                               
            try {
                vo.setFirstimage(getTagValue("firstimage", elem));
            } catch(NullPointerException ne) {
                vo.setFirstimage(null);
            }      
            try {
                vo.setFirstimage2(getTagValue("firstimage2", elem));
            } catch(NullPointerException ne) {
                vo.setFirstimage2(null);
            }      
            try {
                vo.setMapx(Double.parseDouble(getTagValue("mapx", elem)));
            } catch(NullPointerException ne) {
                vo.setMapx(null);
            }   
            try {
                vo.setMapy(Double.parseDouble(getTagValue("mapy", elem)));
            } catch(NullPointerException ne) {
                vo.setMapy(null);
            }
            try {
                vo.setMlevel(Integer.parseInt(getTagValue("mlevel", elem)));
            } catch(NullPointerException ne) {
                vo.setMlevel(null);
            }
            try {
                String _Date = getTagValue("modifiedtime", elem);
                _Date = _Date.substring(0,8); 
                cDt = formatter.parse(_Date);
                vo.setModifiedtime(cDt);
            } catch (NullPointerException ne) {
                vo.setModifiedtime(null);
            }
            try {
                vo.setReadcount(Integer.parseInt(getTagValue("readcount", elem)));     
            } catch (NullPointerException ne) {
                vo.setReadcount(null);
            }
            try {
                vo.setSigungucode(Integer.parseInt(getTagValue("sigungucode", elem)));
            } catch(NullPointerException ne) {
                vo.setSigungucode(null);
            }      
            vo.setTitle(getTagValue("title", elem));  
                
            service.kto_insert_baseDBList(vo);
        }
    }
}
