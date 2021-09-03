package com.travel.service.PublicTpt;

import java.util.List;

import com.travel.mapper.PublicTpt.PublicTrain_DatailBoardMapper;
import com.travel.vo.PublicTpt.PublicTrain_SearchTrainRouteVO;
import com.travel.vo.PublicTpt.PublicTrain_TrainSttsVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublicTrain_DatailBoardService {
    @Autowired PublicTrain_DatailBoardMapper mapper;
    public List<PublicTrain_TrainSttsVO> publicTrain_select_trainstts() {
        return mapper.publicTrain_select_trainstts();
    }
    public void publicTrain_insert_RouteResult(PublicTrain_SearchTrainRouteVO vo) {
        mapper.publicTrain_insert_RouteResult(vo);
    }
}
