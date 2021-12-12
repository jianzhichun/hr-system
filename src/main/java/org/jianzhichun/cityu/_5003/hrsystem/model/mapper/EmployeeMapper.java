package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.Employee;

@Mapper
public interface EmployeeMapper {

    @Insert("insert into employee(name, email, enrol_time, phone_number, address, gender) values(#{name}, #{email}, #{enrol_time}, #{phoneNumber}, #{address}, #{gender})")
    void insert(String name, String email, Date enrolTime, String phoneNumber, String address, String gender);

    @Select("select * from employee where email like concat('%', #{email}, '%') limit 5")
    List<Employee> findByEmail(String email);
    
}
