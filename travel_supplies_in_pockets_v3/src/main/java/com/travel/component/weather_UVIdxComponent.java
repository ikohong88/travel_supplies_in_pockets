package com.travel.component;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.ComponentService;
import com.travel.vo.Weather.Weather_UVIdxVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@Component
public class weather_UVIdxComponent extends ServiceKey {
    @Autowired ComponentService service;
    @Scheduled(cron = "0 30 18 */1 * *") // 매일 18시 30분 데이터 업데이트
    @Scheduled(cron = "0 30 10 */1 * *") // 매일 10시 30분 데이터 업데이트
    public void putUVIdxInfo() throws Exception {
        System.out.println("weather_UVIdxComponent 시작!");
        String [] areaNo = {
        "1100000000","2600000000","2700000000","2800000000",
        "2900000000","3000000000","3100000000","3600000000",
        "4100000000","4200000000","4300000256","4400000000",
        "4499999744","4600000000","4700000256","4800000000",
        "5000000000"
        };
        SimpleDateFormat now_formatter = new SimpleDateFormat("yyyyMMdd");
        Calendar nowDate = Calendar.getInstance();
        Calendar standard = Calendar.getInstance();
        String _nowDate = "";
        standard.set(Calendar.HOUR_OF_DAY, 11);
        standard.set(Calendar.MINUTE, 0);
        _nowDate = now_formatter.format(nowDate.getTime());
        String date = "";
        if(nowDate.getTimeInMillis() < standard.getTimeInMillis()) {
            date = _nowDate + "10";
        } else {
            date = _nowDate + "18";
        }

        for(int i = 0; i < areaNo.length; i++) {
            String areaNo_data = areaNo[i];

            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/LivingWthrIdxServiceV2/getUVIdxV2"); /*URL*/
            urlBuilder.append(getServiceKey()); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수 Default: 10*/
            urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
            urlBuilder.append("&" + URLEncoder.encode("areaNo","UTF-8") + "=" + URLEncoder.encode(areaNo_data, "UTF-8")); /*서울지점 공백일때: 전체지점조회*/
            urlBuilder.append("&" + URLEncoder.encode("time","UTF-8") + "=" + URLEncoder.encode(date, "UTF-8")); /*21년7월6일 18시 발표*/
            
            DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(urlBuilder.toString());

            doc.getDocumentElement().normalize();
            // System.out.println(doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("item");

            System.out.println("데이터 수 : "+nList.getLength());

            Node n = nList.item(0);
            Element elem = (Element)n;

            Weather_UVIdxVO vo = new Weather_UVIdxVO();
            try {      
                vo.setAreaNo(getTagValue("areaNo", elem));
                vo.setCode(getTagValue("code", elem));
                vo.setDate(getTagValue("date", elem));
                vo.setToday(getTagValue("today", elem));
                vo.setDayaftertomorrow(Integer.parseInt(getTagValue("dayaftertomorrow", elem)));
                vo.setTomorrow(Integer.parseInt(getTagValue("tomorrow", elem)));
                vo.setTwodaysaftertomorrow(getTagValue("twodaysaftertomorrow", elem));
                
                service.weather_insert_UVIdx(vo);
            } catch(NullPointerException ne) {
                System.out.println(areaNo_data + " 데이터 없음");
            }
        }
        System.out.println("weather_UVIdxComponent 종료!");
    }
}
