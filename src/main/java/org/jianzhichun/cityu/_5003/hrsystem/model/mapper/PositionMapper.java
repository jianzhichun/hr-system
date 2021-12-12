package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.Position;

import java.util.List;


/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface PositionMapper {


    @Select("select * from position;")
    List<Position> findAll();

    @Select("select * from position where name like concat('%', #{name}, '%') limit 5")
    List<Position> findByName(String name);

}
