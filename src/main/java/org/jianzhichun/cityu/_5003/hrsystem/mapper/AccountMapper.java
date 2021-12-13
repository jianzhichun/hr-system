package org.jianzhichun.cityu._5003.hrsystem.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Employee;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface AccountMapper {


    @Select("select * from employee;")
    List<Employee> findAll();


    @Select("select * from employee where email = #{email}")
    Employee findOneByEmail(String email);


    @Insert("insert into employee(name, email, password) values(#{name}, #{email}, #{password})")
    void insert(String name, String email, String password);

    @Select("select count(*) from employee where email = #{email}")
    int selectCountByEmail(String email);

}
