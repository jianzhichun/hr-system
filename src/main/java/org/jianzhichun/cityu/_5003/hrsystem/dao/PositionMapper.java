package org.jianzhichun.cityu._5003.hrsystem.dao;

import org.apache.ibatis.annotations.Select;

import java.util.List;


/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface PositionMapper {


    @Select("select * from position;")
    List<PositionDO> findAll();

}
