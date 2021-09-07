package com.travel.api.PublicTpt;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.PublicTpt.PublicTrain_DatailBoardService;
import com.travel.vo.PublicTpt.PublicTrain_SearchTrainRouteVO;
import com.travel.vo.PublicTpt.PublicTrain_TrainSttsVO;

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
public class PublicTrain_DetailBoardAPIController extends ServiceKey {
    @Autowired PublicTrain_DatailBoardService service;
    @GetMapping("/api/publicTpt/selectTrainsttsCode")
    public Map<String, Object> getTrainsttsCode() {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();

        List<PublicTrain_TrainSttsVO> vo = service.publicTrain_select_trainstts();

        resultMap.put("data", vo);
        return resultMap;
    }

    @GetMapping("/openapi/publicTpt/searchNearStts")
    public Map<String, Object> getSearchNearStts(
        @RequestParam String Startstts,
        @RequestParam String Endstts,
        @RequestParam String Date,
        @RequestParam @Nullable String TrainItem
    ) throws Exception {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        StringBuilder urlBuilder = new StringBuilder("http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8"));  
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));  
        urlBuilder.append("&" + URLEncoder.encode("depPlaceId","UTF-8") + "=" + URLEncoder.encode(Startstts, "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("arrPlaceId","UTF-8") + "=" + URLEncoder.encode(Endstts, "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("depPlandTime","UTF-8") + "=" + URLEncoder.encode(Date, "UTF-8"));  
        // if(TrainItem != "undefined") {
            // urlBuilder.append("?" + URLEncoder.encode("trainGradeCode","UTF-8") + "=" + URLEncoder.encode(TrainItem, "UTF-8"));        
        // }
        DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(urlBuilder.toString());

        doc.getDocumentElement().normalize();
        // System.out.println(doc.getDocumentElement().getNodeName());

        NodeList nList = doc.getElementsByTagName("item");
        Integer DataCnt = nList.getLength();
        
        NodeList hList = doc.getElementsByTagName("header");
        Node hn = hList.item(0);
        Element helem = (Element)hn;
        Integer resultCode = Integer.parseInt(getTagValue("resultCode", helem));
        if(resultCode == 99) {
            resultMap.put("data", 99);
            return resultMap;
        }
        
        ArrayList<PublicTrain_SearchTrainRouteVO> List = new ArrayList<>();
        
        if(DataCnt == 0) {
            resultMap.put("data", List);
            return resultMap;
        }
        // System.out.println("데이터 수 : "+nList.getLength());
        for(int i=0; i<(nList.getLength()); i++) {
            Node n = nList.item(i);
            Element elem = (Element)n;

            Date cDt = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");

            Calendar cal_startDate = Calendar.getInstance();
            Calendar cal_endDate = Calendar.getInstance();

            PublicTrain_SearchTrainRouteVO vo = new PublicTrain_SearchTrainRouteVO();

            vo.setAdultcharge(Integer.parseInt(getTagValue("adultcharge", elem)));
            vo.setArrplacename(getTagValue("arrplacename", elem));
            
            String _StartDate = getTagValue("arrplandtime", elem);
            // _StartDate = _StartDate.substring(0,8);
            cDt = formatter.parse(_StartDate);
            cal_startDate.setTime(cDt);
            cal_startDate.add(Calendar.HOUR, +9);

            vo.setArrplandtime(cal_startDate);
            vo.setDepplacename(getTagValue("depplacename", elem));

            String _EndDate = getTagValue("depplandtime", elem);
            // _StartDate = _StartDate.substring(0,8);
            cDt = formatter.parse(_EndDate);
            cal_endDate.setTime(cDt);
            cal_endDate.add(Calendar.HOUR, +9);
            
            vo.setDepplandtime(cal_endDate);
            vo.setTraingradename(getTagValue("traingradename", elem));
            vo.setTrainno(getTagValue("trainno", elem));
        
            List.add(vo);

            if(DataCnt != 0) {
                service.publicTrain_insert_RouteResult(vo);
            }
        }
        resultMap.put("data", List);

        return resultMap;
    }
}