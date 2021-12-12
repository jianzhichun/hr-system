package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.jianzhichun.cityu._5003.hrsystem.model.Application;

import java.util.Date;
import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Mapper
public interface ApplicationMapper {


    @Insert("insert into application(date, resume_url, status) values(#{date}, #{resumeUrl}, 'under review')")
    void insert(Date date, String resumeUrl);

    @Update("update application set resume_url=#{resumeUrl}, status=#{status} where id = #{id}")
    void update(Long id, String resumeUrl, String status);

    @Update("delete from application where id = #{id}")
    void delete(Long id);

    @Select("select * from application")
    List<Application> findAll();

}
