package com.travel.api.Weather;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.Weather.Weather_DetailBoardService;
import com.travel.vo.Weather.Weather_CodeVO;
import com.travel.vo.Weather.Weather_SearchNxNyVO;
import com.travel.vo.Weather.Weather_openapi_VilageFcstVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@RestController
public class Weather_DetailBoardAPIController extends ServiceKey {
    @Autowired Weather_DetailBoardService service;
    @GetMapping("/api/weather/SearchNxNy")
    public Map<String,Object> getNxNy(
        @RequestParam String sido,
        @RequestParam String gubun,
        @RequestParam @Nullable String dong
    ) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        String _dong = "";
        Weather_SearchNxNyVO vo = new Weather_SearchNxNyVO();
        if(dong == null) {
            vo = service.weather_select_nxny(sido, gubun, _dong);
        }
        else if(dong != null) {
            Integer dongLength = dong.length();
            if(dong.length() != 0) {
                for(int i = 0; i < dongLength; i++) {
                    int j = i+1;
                    _dong += "%"+(dong.substring(i,j));
                }
            }
            vo = service.weather_select_nxny(sido, gubun, _dong);
        }

        if(vo == null) {
            _dong = "";
            vo = service.weather_select_nxny(sido, gubun, _dong);
        }
        resultMap.put("data", vo);
        return resultMap;
    }

    @GetMapping("/openapi/weather/Weather")
    public Map<String,Object> getWeatherCode(
        @RequestParam String nx,
        @RequestParam String ny
    ) throws Exception {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        // Date nowDate = new Date();
        SimpleDateFormat now_formatter = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat nowTime_formatter = new SimpleDateFormat("HHmm");
        Calendar nowDate = Calendar.getInstance();
        Calendar standard = Calendar.getInstance();
        String _nowDate = "";
        String _nowTime = "";
        standard.set(Calendar.HOUR_OF_DAY, 5);
        standard.set(Calendar.MINUTE, 30);
        if(nowDate.getTimeInMillis() < standard.getTimeInMillis()) {
            nowDate.add(Calendar.DATE, -1);
            nowDate.set(Calendar.HOUR_OF_DAY, 23);
        };
        _nowDate = now_formatter.format(nowDate.getTime());

        nowDate.set(Calendar.MINUTE, 0);
        _nowTime = nowTime_formatter.format(nowDate.getTime());

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
        urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(_nowDate, "UTF-8")); /*‘21년 6월 28일발표*/
        urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(_nowTime, "UTF-8")); /*05시 발표*/
        urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8")); /*예보지점의 X 좌표값*/
        urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8")); /*예보지점의 Y 좌표값*/

        DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(urlBuilder.toString());

        doc.getDocumentElement().normalize();
        // System.out.println(doc.getDocumentElement().getNodeName());

        NodeList nList = doc.getElementsByTagName("item");

        NodeList hList = doc.getElementsByTagName("header");
        Node hn = hList.item(0);
        Element helem = (Element)hn;
        Integer resultCode = Integer.parseInt(getTagValue("resultCode", helem));
        
        if(resultCode == 99) {
            resultMap.put("data", 99);
            return resultMap;
        }
        if(resultCode == 03) {
            System.out.println("api - DetailBoardWeather 데이터가 없어서 1시간 이전을 검색합니다.");
            Calendar ReDate = Calendar.getInstance();
            ReDate.set(Calendar.MINUTE, 0);
            ReDate.add(Calendar.HOUR_OF_DAY, -1);
            String _ReTime = nowTime_formatter.format(ReDate.getTime());
            urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); /*URL*/
            urlBuilder.append(getServiceKey()); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
            urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(_nowDate, "UTF-8")); /*‘21년 6월 28일발표*/
            urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(_ReTime, "UTF-8")); /*05시 발표*/
            urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8")); /*예보지점의 X 좌표값*/
            urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8")); /*예보지점의 Y 좌표값*/

            doc = dBuilder.parse(urlBuilder.toString());
            doc.getDocumentElement().normalize();
            nList = doc.getElementsByTagName("item");
            hList = doc.getElementsByTagName("header");
            hn = hList.item(0);
            helem = (Element)hn;
            resultCode = Integer.parseInt(getTagValue("resultCode", helem));
        }
        if(resultCode == 03) {
            System.out.println("api - DetailBoardWeather 데이터가 없어서 2시간 이전을 검색합니다.");
            Calendar ReDate = Calendar.getInstance();
            ReDate.set(Calendar.MINUTE, 0);
            ReDate.add(Calendar.HOUR_OF_DAY, -2);
            String _ReTime = nowTime_formatter.format(ReDate.getTime());
            urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); /*URL*/
            urlBuilder.append(getServiceKey()); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
            urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(_nowDate, "UTF-8")); /*‘21년 6월 28일발표*/
            urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(_ReTime, "UTF-8")); /*05시 발표*/
            urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8")); /*예보지점의 X 좌표값*/
            urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8")); /*예보지점의 Y 좌표값*/

            doc = dBuilder.parse(urlBuilder.toString());
            doc.getDocumentElement().normalize();
            nList = doc.getElementsByTagName("item");
            hList = doc.getElementsByTagName("header");
            hn = hList.item(0);
            helem = (Element)hn;
            resultCode = Integer.parseInt(getTagValue("resultCode", helem));
        }
        if(resultCode == 03) {
            System.out.println("api - DetailBoardWeather 데이터가 없어서 3시간 이전을 검색합니다.");
            Calendar ReDate = Calendar.getInstance();
            ReDate.set(Calendar.MINUTE, 0);
            ReDate.add(Calendar.HOUR_OF_DAY, -3);
            String _ReTime = nowTime_formatter.format(ReDate.getTime());
            urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); /*URL*/
            urlBuilder.append(getServiceKey()); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
            urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(_nowDate, "UTF-8")); /*‘21년 6월 28일발표*/
            urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(_ReTime, "UTF-8")); /*05시 발표*/
            urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(nx, "UTF-8")); /*예보지점의 X 좌표값*/
            urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(ny, "UTF-8")); /*예보지점의 Y 좌표값*/

            doc = dBuilder.parse(urlBuilder.toString());
            doc.getDocumentElement().normalize();
            nList = doc.getElementsByTagName("item");
            hList = doc.getElementsByTagName("header");
            hn = hList.item(0);
            helem = (Element)hn;
            resultCode = Integer.parseInt(getTagValue("resultCode", helem));
        }

        System.out.println("데이터 수 : "+nList.getLength());
        
        ArrayList<Weather_openapi_VilageFcstVO> list = new ArrayList<>();
        
        for(int i=0; i<(nList.getLength()); i++) {
            Node n = nList.item(i);
            Element elem = (Element)n;

            Weather_openapi_VilageFcstVO vo = new Weather_openapi_VilageFcstVO();

            // Calendar cal_fcstDate = Calendar.getInstance();
            // Calendar cal_fcstTime = Calendar.getInstance();

            vo.setCategory(getTagValue("category", elem));

            // String _FcstDate = getTagValue("fcstDate", elem);
            // // _StartDate = _StartDate.substring(0,8);
            // cDt = Date_formatter.parse(_FcstDate);
            // cal_fcstDate.setTime(cDt);
            // cal_fcstDate.add(Calendar.HOUR, +9);
            vo.setFcstDate(getTagValue("fcstDate", elem));
            vo.setFcstTime(getTagValue("fcstTime", elem));

            vo.setFcstValue(getTagValue("fcstValue", elem));
            vo.setNx(Integer.parseInt(getTagValue("nx", elem)));
            vo.setNy(Integer.parseInt(getTagValue("ny", elem)));

            List<Weather_CodeVO> code_list = service.weather_select_code();
            for(Weather_CodeVO data : code_list) {
                String DBvalue = data.getItemvalue();
                String OAvalue = getTagValue("category", elem);
                if(DBvalue.equals(OAvalue)){
                    vo.setFcstclassification(data.getFcstclassification());
                    vo.setCategoryName(data.getItemname());
                    vo.setUnit(data.getUnit());
                }
            }
            list.add(vo);
        }
        resultMap.put("data", list);
        return resultMap;
    }
}