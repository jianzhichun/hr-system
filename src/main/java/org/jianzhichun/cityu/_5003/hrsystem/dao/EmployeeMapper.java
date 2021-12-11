package org.jianzhichun.cityu._5003.hrsystem.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface EmployeeMapper {


    @Select("select * from employee;")
    List<EmployeeDO> findAll();


    @Select("select * from employee where email = #{email}")
    EmployeeDO findOneByEmail(String email);


    @Insert("insert into employee(email, password) values(#{email}, #{password})")
    void insert(String email, String password);

}
