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
import com.travel.service.ComponentService;
import com.travel.service.Weather.Weather_DetailBoardService;
import com.travel.vo.Weather.Weather_AdiffusionIndexVO;
import com.travel.vo.Weather.Weather_CodeVO;
import com.travel.vo.Weather.Weather_SearchNxNyVO;
import com.travel.vo.Weather.Weather_UVIdxVO;
import com.travel.vo.Weather.Weather_openapi_VilageFcstVO;

// import org.python.core.PyFunction;
// import org.python.core.PyInteger;
// import org.python.core.PyObject;
// import org.python.core.PyString;
// import org.python.util.PythonInterpreter;

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
    @Autowired ComponentService c_service;
    // DB 변환된 주소를 통한 코드 조회
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

    // 단기예보 조회
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
        urlBuilder.append(getServiceKey_new()); /*Service Key*/
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

        // System.out.println("데이터 수 : "+nList.getLength());
        
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

    @GetMapping("/api/weather/AdiffusionIndex")
    public Map<String,Object> getAdiffusionIndex(
        @RequestParam String sido
    ) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        SimpleDateFormat now_formatter = new SimpleDateFormat("yyyyMMdd");
        Calendar nowDate = Calendar.getInstance();
        Calendar standard = Calendar.getInstance();
        String _nowDate = "";
        standard.set(Calendar.HOUR_OF_DAY, 18);
        standard.set(Calendar.MINUTE, 30);
        if(nowDate.getTimeInMillis() < standard.getTimeInMillis()) {
            nowDate.add(Calendar.DATE, -1);
        };
        _nowDate = now_formatter.format(nowDate.getTime());
        String date = _nowDate + "18";
        System.out.println(date);

        Weather_AdiffusionIndexVO vo = service.weather_select_adiffusionindex(sido, date);
        resultMap.put("data", vo);

        return resultMap;
    }

    @GetMapping("/api/weather/UVIdx")
    public Map<String, Object> getUVIdx(
        @RequestParam String areaNo
    ) throws Exception {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        SimpleDateFormat now_formatter = new SimpleDateFormat("yyyyMMdd");
        Calendar nowDate = Calendar.getInstance();
        Calendar setDate = Calendar.getInstance();
        Calendar standard1 = Calendar.getInstance();
        Calendar standard2 = Calendar.getInstance();
        String _nowDate = "";
        String _setDate = "";
        standard1.set(Calendar.HOUR_OF_DAY, 6);
        standard1.set(Calendar.MINUTE, 0);
        standard2.set(Calendar.HOUR_OF_DAY, 18);
        standard2.set(Calendar.MINUTE, 0);
        _nowDate = now_formatter.format(nowDate.getTime());
        String date = "";
        String date06 = "";
        String date18 = "";
        Weather_UVIdxVO vo = new Weather_UVIdxVO();
        Weather_UVIdxVO vo06 = new Weather_UVIdxVO();
        Weather_UVIdxVO vo18 = new Weather_UVIdxVO();
        // 06 ~ 18시 사이 조회 조건
        if(standard1.getTimeInMillis() < nowDate.getTimeInMillis() && nowDate.getTimeInMillis() < standard2.getTimeInMillis()) {
            date = _nowDate + "06";
            vo = service.weather_select_UVIdx(areaNo, date); 
        // 06시 이전 조회 조건 
        } else if(nowDate.getTimeInMillis() < standard1.getTimeInMillis()) {
            setDate.add(Calendar.DATE, -1);
            _setDate = now_formatter.format(setDate.getTime());
            date06 = _setDate + "06";
            vo06 = service.weather_select_UVIdx(areaNo, date06); 
            date18 = _setDate + "18";
            vo18 = service.weather_select_UVIdx(areaNo, date18); 
            vo.setToday(vo06.getToday());
            vo.setTomorrow(vo18.getTomorrow());
            vo.setDayaftertomorrow(vo18.getDayaftertomorrow());
            vo.setTwodaysaftertomorrow(vo18.getTwodaysaftertomorrow());
            vo.setDate(vo18.getDate());
            vo.setAreaNo(vo18.getAreaNo());
            vo.setCode(vo18.getCode());
        // 18시 이후 조회 조건
        } else {
            date06 = _nowDate + "06";
            vo06 = service.weather_select_UVIdx(areaNo, date06); 
            date18 = _nowDate + "18";
            vo18 = service.weather_select_UVIdx(areaNo, date18); 
            vo.setToday(vo06.getToday());
            vo.setTomorrow(vo18.getTomorrow());
            vo.setDayaftertomorrow(vo18.getDayaftertomorrow());
            vo.setTwodaysaftertomorrow(vo18.getTwodaysaftertomorrow());
            vo.setDate(vo18.getDate());
            vo.setAreaNo(vo18.getAreaNo());
            vo.setCode(vo18.getCode());
        }   

        resultMap.put("data", vo);
        return resultMap;
    }

    // 데이터가 없을시에, 
    @GetMapping("/api/weather/insertUVIdx")
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
        String _nowDate = now_formatter.format(nowDate.getTime());
        String date = _nowDate + "18";

        for(int i = 0; i < areaNo.length; i++) {
            String areaNo_data = areaNo[i];

            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/LivingWthrIdxServiceV2/getUVIdxV2"); /*URL*/
            urlBuilder.append(getServiceKey()); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수 Default: 10*/
            urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
            urlBuilder.append("&" + URLEncoder.encode("areaNo","UTF-8") + "=" + URLEncoder.encode(areaNo_data, "UTF-8")); /*서울지점 공백일때: 전체지점조회*/
            urlBuilder.append("&" + URLEncoder.encode("time","UTF-8") + "=" + URLEncoder.encode("2021090818", "UTF-8")); /*21년7월6일 18시 발표*/
            
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
                
                c_service.weather_insert_UVIdx(vo);
            } catch(NullPointerException ne) {
                System.out.println(areaNo_data + " 데이터 없음");
            }
        }
        System.out.println("weather_UVIdxComponent 종료!");
    }

    // @GetMapping("/test")
    // public void getTest() {
    //     PythonInterpreter interpreter = new PythonInterpreter();
    //     interpreter.execfile("C:/Users/SPen_HWS/Desktop/test.py");
    //     interpreter.exec("print(crawling_AdifIndex())");
    //     // execute a function that takes a string and returns a string
        
    //     PyFunction pyFunction = (PyFunction) interpreter.get("crawling_AdifIndex",PyFunction.class);
    //     // int a = 10, b = 20;
    //     // new PyInteger(a), new PyInteger(b)
    //     PyObject pyobj = pyFunction.__call__();
    //     System.out.println(pyobj.toString());

    //     // PyObject someFunc = interpreter.get("funcName");
    //     // PyObject result = someFunc.__call__(new PyString("Test!"));
    //     // String realResult = (String) result.__tojava__(String.class);
    //     interpreter.close();
    // }
}