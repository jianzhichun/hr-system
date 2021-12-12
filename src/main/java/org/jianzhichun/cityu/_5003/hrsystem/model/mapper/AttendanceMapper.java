package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.Attendance;

import java.util.Date;
import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */

@Mapper
public interface AttendanceMapper {

    @Select("select * from attendance")
    List<Attendance> findAll();

    @Insert("insert into attendance(employee_id, start_date, end_date, type) values (#{eid}, #{start}, #{end}, #{type})")
    void insert(int eid, Date start, Date end, String type);
}
