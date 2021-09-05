package com.travel.api.PublicBus;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.PublicBus.PublicBus_DetailBoardService;
import com.travel.vo.PublicBus.PublicBus_BusTmlVO;
import com.travel.vo.PublicBus.PublicBus_SearchBusRouteVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@RestController
public class PublicBus_DetailBoardAPIController extends ServiceKey {
    @Autowired PublicBus_DetailBoardService service;
    @GetMapping("/api/bus/TmlList")
    public Map<String, Object> getSearchBusTml() {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        
        List<PublicBus_BusTmlVO> list = service.publicbus_select_busTml();
        
        resultMap.put("ButTml_List", list);
        return resultMap;
    }

    @GetMapping("/openapi/bus/searchNearTml")
    public Map<String, Object> getNearBusTml(
        @RequestParam String depTerminalId,
        @RequestParam String arrTerminalId,
        @RequestParam String depPlandTime
    ) throws Exception {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();

        StringBuilder urlBuilder = new StringBuilder("http://openapi.tago.go.kr/openapi/service/ExpBusInfoService/getStrtpntAlocFndExpbusInfo"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
        urlBuilder.append("&" + URLEncoder.encode("depTerminalId","UTF-8") + "=" + URLEncoder.encode(depTerminalId, "UTF-8")); /*출발터미널ID*/
        urlBuilder.append("&" + URLEncoder.encode("arrTerminalId","UTF-8") + "=" + URLEncoder.encode(arrTerminalId, "UTF-8")); /*도착터미널ID*/
        urlBuilder.append("&" + URLEncoder.encode("depPlandTime","UTF-8") + "=" + URLEncoder.encode(depPlandTime, "UTF-8")); /*출발일*/
        // urlBuilder.append("&" + URLEncoder.encode("busGradeId","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*버스등급ID*/

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

        // System.out.println("데이터 수 : "+nList.getLength());

        List<PublicBus_SearchBusRouteVO> list = new ArrayList<>();

        for(int i=0; i<(nList.getLength()); i++) {
            Node n = nList.item(i);
            Element elem = (Element)n;

            PublicBus_SearchBusRouteVO vo = new PublicBus_SearchBusRouteVO();
            vo.setArrPlaceNm(getTagValue("arrPlaceNm", elem));
            
            String _EndDate = getTagValue("arrPlandTime", elem);
            String _EndYear = _EndDate.substring(0,4);
            String _EndMonth = _EndDate.substring(4,6);
            String _EndDay = _EndDate.substring(6,8);
            String _EndHour = _EndDate.substring(8,10);
            String _EndMin = _EndDate.substring(10,12);
            String _EndformatDate = (_EndYear+"-"+_EndMonth+"-"+_EndDay+" "+_EndHour+":"+_EndMin);

            vo.setArrPlandTime(_EndformatDate);
            vo.setCharge(getTagValue("charge", elem));
            vo.setDepPlaceNm(getTagValue("depPlaceNm", elem));

            String _StartDate = getTagValue("depPlandTime", elem);
            String _StartYear = _StartDate.substring(0,4);
            String _StartMonth = _StartDate.substring(4,6);
            String _StartDay = _StartDate.substring(6,8);
            String _StartHour = _StartDate.substring(8,10);
            String _StartMin = _StartDate.substring(10,12);
            String _StartformatDate = (_StartYear+"-"+_StartMonth+"-"+_StartDay+" "+_StartHour+":"+_StartMin);

            vo.setDepPlandTime(_StartformatDate);
            vo.setGradeNm(getTagValue("gradeNm", elem));
            vo.setRouteId(getTagValue("routeId", elem));

            list.add(vo);
        }

        resultMap.put("data", list);
        return resultMap;
    }
}
