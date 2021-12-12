package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.Application;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Mapper
public interface ApplicationMapper {


    @Select("select * from application")
    List<Application> findAll();

}
