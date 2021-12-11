package org.jianzhichun.cityu._5003.hrsystem.dao;

import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface JobOfferMapper {


    @Select("select * from job_offer;")
    List<JobOfferDO> findAll();

}
