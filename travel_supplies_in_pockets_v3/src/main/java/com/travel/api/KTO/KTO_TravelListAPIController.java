package com.travel.api.KTO;

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
import com.travel.service.KTO.KTO_TravelListService;
import com.travel.vo.KTO.KTO_CategoryVO;
import com.travel.vo.KTO.KTO_baseDBVO;
import com.travel.vo.KTO.KTO_openapi_detailCommonVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@RestController
public class KTO_TravelListAPIController extends ServiceKey {
    @Autowired KTO_TravelListService service;
    // 카테고리2,3 조회
    @GetMapping("/api/kto/selectCategory/{cat}")
    public Map<String, Object> getCategory(
        @PathVariable("cat") Integer cat,
        @RequestParam @Nullable String cat1,
        @RequestParam @Nullable String cat2
    ) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        List<KTO_CategoryVO> list = new ArrayList<>();
        if (cat == 1) {
            list = service.kto_select_category2_code(cat1);
            resultMap.put("kto_cate2_code", list);
        } else if (cat == 2) {
            list = service.kto_select_category3_code(cat2);
            resultMap.put("kto_cate3_code", list);
        }
        return resultMap;
    }
    
    // travelList에서 선택한 조건에 따르는 baseDB(kto_areabasedlist) 검색
    @GetMapping("/api/kto/searchBaseDB/{num}")
    public Map<String, Object> getSearchBaseDB(
        @PathVariable("num") Integer num,
        @RequestParam Integer sidocode,
        @RequestParam @Nullable String gubuncode,
        @RequestParam @Nullable String cat1,
        @RequestParam @Nullable String cat2,
        @RequestParam @Nullable String cat3
    ) {
        Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
        System.out.println(sidocode);
        System.out.println(gubuncode+ cat1+ cat2+ cat3);
        if (gubuncode.equals("undefined") || gubuncode.equals("") || gubuncode.equals("none")) {
            gubuncode = null;
        }
        if (cat1.equals("undefined") || cat1.equals("") || cat1.equals("none")) {
            cat1 = null;
        }
        if (cat2.equals("undefined") || cat2.equals("") || cat2.equals("none")) {
            cat2 = null;
        }
        if (cat3.equals("undefined") || cat3.equals("") || cat3.equals("none")) {
            cat3 = null;
        }
        
        List<KTO_baseDBVO> list = new ArrayList<>();
        if(num == 1) {
            list = service.kto_baseDB_search(sidocode, gubuncode, cat1, cat2, cat3);
            resultMap.put("baseDB_Result", list);
        } else if(num == 2) {
            list = service.kto_baseDB_search_readCnt(sidocode, gubuncode, cat1, cat2, cat3);
            resultMap.put("baseDB_Result", list);
        }
        return resultMap;
    }

    // DetailCommon 데이터 조회(DB 저장 X)
    @GetMapping("/openapi/kto/detailCommon")
    public Map<String, Object> getKTODetailCommon(
         @RequestParam Integer contentid,
         @RequestParam @Nullable String contentTypeId
    ) throws Exception {
         Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
 
         String _contentid = contentid.toString();
 
         StringBuilder urlBuilder = new StringBuilder("http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon"); /*URL*/
         urlBuilder.append(getServiceKey()); /*Service Key*/
         urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
         urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
         urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("TP", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("contentId","UTF-8") + "=" + URLEncoder.encode(_contentid, "UTF-8")); 
         if(contentTypeId != null) {
             urlBuilder.append("&" + URLEncoder.encode("contentTypeId","UTF-8") + "=" + URLEncoder.encode(contentTypeId, "UTF-8")); 
         }
         urlBuilder.append("&" + URLEncoder.encode("defaultYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("firstImageYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("areacodeYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("catcodeYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("addrinfoYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("mapinfoYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         urlBuilder.append("&" + URLEncoder.encode("overviewYN","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); 
         System.out.println(urlBuilder);
         DocumentBuilderFactory dFactory = DocumentBuilderFactory.newInstance();
         DocumentBuilder dBuilder = dFactory.newDocumentBuilder();
         Document doc = dBuilder.parse(urlBuilder.toString());
 
         doc.getDocumentElement().normalize();
         System.out.println(doc.getDocumentElement().getNodeName());
 
         NodeList nList = doc.getElementsByTagName("item");
 
         Node n = nList.item(0);
         Element elem = (Element)n;
 
         KTO_openapi_detailCommonVO vo = new KTO_openapi_detailCommonVO();
 
         Date cDt = new Date();
         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
         Calendar cal_create = Calendar.getInstance();
         Calendar cal_mod = Calendar.getInstance();
         
         try {
             String _add = getTagValue("addr1", elem);
             String[] _addArray = _add.split(" ",3);
             _addArray = _add.split(" ",3);
             for(int j = 0;j < _addArray.length; j++) {
                 System.out.println(_addArray[j]);
             }
             try {
                 vo.setAddr1(_addArray[0]);
             } catch(NullPointerException ne) {
                 vo.setAddr1(null);
             }
             try {
                 vo.setAddr2(_addArray[1]);
             } catch(NullPointerException ne) {
                 vo.setAddr2(null);
             }
             try {
                 vo.setAddr3(_addArray[2]);
             } catch(NullPointerException ne) {
                 vo.setAddr3(null);
             }
         } catch(NullPointerException ne) {
             vo.setAddr1(null);
             vo.setAddr2(null);
             vo.setAddr3(null);
         }
         try {
             vo.setAreacode(Integer.parseInt(getTagValue("areacode", elem)));
         } catch (NullPointerException ne) {
             vo.setAreacode(null);
         }
         try {
             vo.setBooktour(Integer.parseInt(getTagValue("booktour", elem)));
         } catch (NullPointerException ne) {
             vo.setBooktour(null);
         }
         try {
             vo.setCat1(getTagValue("cat1", elem));
         } catch (NullPointerException ne) {
             vo.setCat1(null);
         }
         try {
             vo.setCat2(getTagValue("cat2", elem));
         } catch (NullPointerException ne) {
             vo.setCat2(null);
         }
         try {
             vo.setCat3(getTagValue("cat3", elem));
         } catch (NullPointerException ne) {
             vo.setCat3(null);
         }
         try {
             vo.setContentid(Integer.parseInt(getTagValue("contentid", elem)));
         } catch (NullPointerException ne) {
             vo.setContentid(null);
         }
         try {
             vo.setContenttypeid(Integer.parseInt(getTagValue("contenttypeid", elem)));
         } catch (NullPointerException ne) {
             vo.setContenttypeid(null);
         }
         try{
             String _Createtime = getTagValue("createdtime", elem);
             _Createtime = _Createtime.substring(0,8);
             cDt = formatter.parse(_Createtime);
             cal_create.setTime(cDt);
             cal_create.add(Calendar.HOUR, +9);
     
             vo.setCreatedtime(cal_create);
         } catch (NullPointerException ne) {
             vo.setCreatedtime(null);
         }
         try{
             vo.setLng(Double.parseDouble(getTagValue("mapx", elem)));
         } catch (NullPointerException ne) {
             vo.setLng(null);
         }
         try{
             vo.setLat(Double.parseDouble(getTagValue("mapy", elem)));
         } catch (NullPointerException ne) {
             vo.setLat(null);
         }
         try{
             vo.setMlevel(Integer.parseInt(getTagValue("mlevel", elem)));
         } catch (NullPointerException ne) {
             vo.setMlevel(null);
         }
         try{
             String _Modifiedtime = getTagValue("modifiedtime", elem);
             _Modifiedtime = _Modifiedtime.substring(0,8); 
             cDt = formatter.parse(_Modifiedtime);
             cal_mod.setTime(cDt);
             cal_mod.add(Calendar.HOUR, +9);
             vo.setModifiedtime(cal_mod);
         } catch (NullPointerException ne) {
             vo.setModifiedtime(null);
         }
         try{
             vo.setOverview(getTagValue("overview", elem));
         } catch (NullPointerException ne) {
             vo.setOverview(null);
         }     
         try{
             vo.setSigungucode(Integer.parseInt(getTagValue("sigungucode", elem)));
         } catch (NullPointerException ne) {
             vo.setSigungucode(null);
         }
         try{
             vo.setTitle(getTagValue("title", elem));
         } catch (NullPointerException ne) {
             vo.setTitle(null);
         }
 
         KTO_CategoryVO cat_vo = getKTOServiceCode(getTagValue("cat1", elem), getTagValue("cat2", elem), getTagValue("cat3", elem));
         vo.setMainCategory(cat_vo.getMainCategory());
         vo.setMiddleCategory(cat_vo.getMiddleCategory());
         vo.setSubCategory(cat_vo.getSubCategory());
 
         resultMap.put("detailCom_Info", vo);
         resultMap.put("status", true);
 
         return resultMap;
     }
    
    
    // MySQL kto_service_code Catagory 데이터 불러오기
    public KTO_CategoryVO getKTOServiceCode(
        @RequestParam String cat1,
        @RequestParam String cat2,
        @RequestParam String cat3
    ) {
        KTO_CategoryVO vo = service.kto_select_categoryName(cat1,cat2,cat3);
        return vo;
    }

    public static String getTagValue(String tag, Element elem) {
        NodeList nlList = elem.getElementsByTagName(tag).item(0).getChildNodes();
        if(nlList == null) return null;
        Node node = (Node) nlList.item(0);
        if(node == null) return null;
        return node.getNodeValue();
    }
}
