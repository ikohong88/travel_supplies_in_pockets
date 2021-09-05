package com.travel.mapper.PublicTpt;

import java.util.List;

import com.travel.vo.PublicTpt.PublicTrain_SearchTrainRouteVO;
import com.travel.vo.PublicTpt.PublicTrain_TrainSttsVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PublicTrain_DatailBoardMapper {
    // select
    public List<PublicTrain_TrainSttsVO> publicTrain_select_trainstts();

    // insert
    public void publicTrain_insert_RouteResult(PublicTrain_SearchTrainRouteVO vo);
}
