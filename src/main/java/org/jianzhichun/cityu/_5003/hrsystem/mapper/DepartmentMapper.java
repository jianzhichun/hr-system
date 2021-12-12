package org.jianzhichun.cityu._5003.hrsystem.mapper;

import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Department;

import java.util.List;


/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface DepartmentMapper {


    @Select("select * from department;")
    List<Department> findAll();

    @Select("select * from department where name like concat('%', #{name}, '%') limit 5")
    List<Department> findByName(String name);

}
