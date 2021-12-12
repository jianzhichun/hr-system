package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import java.util.Date;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeMapper {

    @Insert("insert into employee(name, email, enrol_time, phone_number, address, gender) values(#{name}, #{email}, #{enrol_time}, #{phoneNumber}, #{address}, #{gender})")
    void insert(String name, String email, Date enrolTime, String phoneNumber, String address, String gender);
    
}
