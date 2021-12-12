package org.jianzhichun.cityu._5003.hrsystem.mapper;

import org.apache.ibatis.annotations.*;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Attendance;

import java.util.Date;
import java.util.List;

/**
 * @author Zefeng Wang
 */

@Mapper
public interface AttendanceMapper {

    @Select("select * from attendance")
    List<Attendance> findAll();

    @Insert("insert into attendance(employee_id, start_date, end_date, type) values (#{eid}, #{start}, #{end}, #{type})")
    void insert(int eid, Date start, Date end, String type);

    @Update("update attendance set start_date = #{start}, end_date = #{end}, type = #{type}, status = #{status} where id = #{id}")
    void update(Long id, Date start, Date end, String type, String status);

    @Delete("delete from attendance where id = #{id} limit 1")
    void delete(Long id);
}
