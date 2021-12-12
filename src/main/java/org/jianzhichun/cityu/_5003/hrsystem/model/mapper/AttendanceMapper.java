package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.Attendance;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface AttendanceMapper {


    @Select("select * from attendance")
    List<Attendance> findAll();

}
