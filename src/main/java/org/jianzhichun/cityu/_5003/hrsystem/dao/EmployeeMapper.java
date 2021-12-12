package org.jianzhichun.cityu._5003.hrsystem.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Mapper
public interface EmployeeMapper {


    @Select("select * from employee;")
    List<EmployeeDO> findAll();


    @Select("select * from employee where email = #{email}")
    EmployeeDO findOneByEmail(String email);


    @Insert("insert into employee(name, email, password) values(#{name}, #{email}, #{password})")
    void insert(String name, String email, String password);

    @Select("select count(*) from employee where email = #{email}")
    int selectCountByEmail(String email);

}
