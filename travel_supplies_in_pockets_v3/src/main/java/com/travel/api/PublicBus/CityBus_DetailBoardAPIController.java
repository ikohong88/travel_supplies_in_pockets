package com.travel.api.PublicBus;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.service.PublicBus.CityBus_DetailBoardService;
import com.travel.vo.PublicBus.CityBus_CityCodeVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@RestController
public class CityBus_DetailBoardAPIController extends ServiceKey {
    @Autowired CityBus_DetailBoardService serivce;
    
    

    
    // 버스노선 도시코드 저장
    @GetMapping("/openapi/citybus/insertcityCode")
    public Map<String,Object> putInsertCityCode() throws Exception {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        StringBuilder urlBuilder = new StringBuilder("http://openapi.tago.go.kr/openapi/service/BusSttnInfoInqireService/getCtyCodeList"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/

        DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(urlBuilder.toString());

        doc.getDocumentElement().normalize();
        // System.out.println(doc.getDocumentElement().getNodeName());

        NodeList nList = doc.getElementsByTagName("item");

        CityBus_CityCodeVO vo = new CityBus_CityCodeVO();
        for(int i=0; i<(nList.getLength()); i++) {
            Node n = nList.item(i);
            Element elem = (Element)n;

            vo.setCitycode(Integer.parseInt(getTagValue("citycode", elem)));
            vo.setCityname(getTagValue("cityname", elem));

            serivce.citybus_insert_cityCode(vo);
        }
        resultMap.put("status", true);
        return resultMap;
    }
}
