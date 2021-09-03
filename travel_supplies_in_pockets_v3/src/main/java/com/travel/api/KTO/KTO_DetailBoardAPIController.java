package com.travel.api.KTO;

import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import com.travel.api.ServiceKey;
import com.travel.vo.KTO.KTO_openapi_IntroduceVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@RestController
public class KTO_DetailBoardAPIController extends ServiceKey {
    // OPENAPI - 한국관광공사_국문 소개정보조회
    @GetMapping("/openapi/kto/introduceData")
    public Map<String, Object> getBoardDetailInfo(
        @RequestParam Integer contentid,
        @RequestParam Integer contenttypeid
    ) throws Exception {
        Map<String,Object> resultMap = new LinkedHashMap<String,Object>();

        String _contentid = contentid.toString();
        String _contenttypeid = contenttypeid.toString();

        StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro"); /*URL*/
        urlBuilder.append(getServiceKey()); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("TP", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode(_contentid, "UTF-8")); 
        urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(_contenttypeid, "UTF-8")); 
        
        // System.out.println(urlBuilder);
        DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(urlBuilder.toString());

        doc.getDocumentElement().normalize();
        // System.out.println(doc.getDocumentElement().getNodeName());
        NodeList nList = doc.getElementsByTagName("item");
        // System.out.println("데이터 수 : "+nList.getLength());
        
        Node n = nList.item(0);
        Element elem = (Element)n;

        KTO_openapi_IntroduceVO vo = new KTO_openapi_IntroduceVO();

        vo.setContentid(Integer.parseInt(getTagValue("contentid", elem)));
        vo.setContenttypeid(Integer.parseInt(getTagValue("contenttypeid", elem)));
        try {
            vo.setChkpet(getTagValue("chkpet", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setExpguide(getTagValue("expguide", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setExpguide(getTagValue("expguide", elem));    
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocenter(getTagValue("infocenter", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setOpendate(getTagValue("opendate", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setParking(getTagValue("parking", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRestdate(getTagValue("restdate", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setUsetime(getTagValue("usetime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setChkpetculture(getTagValue("chkpetculture", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocenterculture(getTagValue("infocenterculture", elem));            
        } catch(NullPointerException ne) {}
        try {
            vo.setParkingculture(getTagValue("parkingculture", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRestdateculture(getTagValue("restdateculture", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setUsefee(getTagValue("usefee", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setUsetimeculture(getTagValue("usetimeculture", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSpendtime(getTagValue("spendtime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setAgelimit(getTagValue("agelimit", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setBookingplace(getTagValue("bookingplace", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setEventstartdate(getTagValue("eventstartdate", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setEventenddate(getTagValue("eventenddate", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setEventhomepage(getTagValue("eventhomepage", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setEventplace(getTagValue("eventplace", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setPlaceinfo(getTagValue("placeinfo", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setPlaytime(getTagValue("playtime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setProgram(getTagValue("program", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSpendtimefestival(getTagValue("spendtimefestival", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSponsor1(getTagValue("sponsor1", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSponsor1tel(getTagValue("sponsor1tel", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSponsor2(getTagValue("sponsor2", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSponsor2tel(getTagValue("sponsor2tel", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setUsetimefestival(getTagValue("usetimefestival", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setDistance(getTagValue("distance", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocentertourcourse(getTagValue("infocentertourcourse", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSchedule(getTagValue("schedule", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setTaketime(getTagValue("taketime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setTheme(getTagValue("theme", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setChkpetleports(getTagValue("chkpetleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setExpagerangeleports(getTagValue("expagerangeleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocenterleports(getTagValue("infocenterleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setOpenperiod(getTagValue("openperiod", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setParkingleports(getTagValue("parkingleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setReservation(getTagValue("reservation", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRestdateleports(getTagValue("restdateleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setUsefeeleports(getTagValue("usefeeleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setUsetimeleports(getTagValue("usetimeleports", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setAccomcountlodging(getTagValue("accomcountlodging", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setCheckintime(getTagValue("checkintime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setCheckouttime(getTagValue("checkouttime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setChkcooking(getTagValue("chkcooking", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocenterlodging(getTagValue("infocenterlodging", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setParkinglodging(getTagValue("parkinglodging", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRoomcount(getTagValue("roomcount", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setReservationlodging(getTagValue("reservationlodging", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setReservationurl(getTagValue("reservationurl", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRoomtype(getTagValue("roomtype", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRefundregulation(getTagValue("refundregulation", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setChkpetshopping(getTagValue("chkpetshopping", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setCulturecenter(getTagValue("culturecenter", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setFairday(getTagValue("fairday", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocentershopping(getTagValue("infocentershopping", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setOpendateshopping(getTagValue("opendateshopping", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setOpentime(getTagValue("opentime", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setParkingshopping(getTagValue("parkingshopping", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRestdateshopping(getTagValue("restdateshopping", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSaleitem(getTagValue("saleitem", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setShopguide(getTagValue("shopguide", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setFirstmenu(getTagValue("firstmenu", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setInfocenterfood(getTagValue("infocenterfood", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setOpendatefood(getTagValue("opendatefood", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setOpentimefood(getTagValue("opentimefood", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setPacking(getTagValue("packing", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setParkingfood(getTagValue("parkingfood", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setReservationfood(getTagValue("reservationfood", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setRestdatefood(getTagValue("restdatefood", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setSeat(getTagValue("seat", elem));
        } catch(NullPointerException ne) {}
        try {
            vo.setTreatmenu(getTagValue("treatmenu", elem));
        } catch(NullPointerException ne) {}

        resultMap.put("introduce_data", vo);
        return resultMap;
    }
    public static String getTagValue(String tag, Element elem) {
        NodeList nlList = elem.getElementsByTagName(tag).item(0).getChildNodes();
        if(nlList == null) return null;
        Node node = (Node) nlList.item(0);
        if(node == null) return null;
        return node.getNodeValue();
    }
}
