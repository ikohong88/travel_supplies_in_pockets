package com.travel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// jsp 화면 구성은 한곳에 몰아넣기
@Controller
public class TravelSupInPokController {
    @GetMapping("/")
    public String getMain() {
        return "/index";
    }

    @GetMapping("/travel/select/suggestion")
    public String getSelectSuggestion() {
        return "/suggestion/select";
    }

    @GetMapping("/travel/nonselect/suggestion")
    public String getNonSelectSuggestion() {
        return "/suggestion/nonselect";
    }

    @GetMapping("/travel/List")
    public String getTravelList() {
        return "/travelList/travelList";
    }

    @GetMapping("/travel/detailBoard")
    public String getTravelDetailDashBoard() {
        return "/detailBoard/detailBoard";
    }
}
