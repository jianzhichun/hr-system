package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.JobOffer;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface JobOfferMapper {


    @Select("select * from job_offer;")
    List<JobOffer> findAll();

}
