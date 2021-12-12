package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.jianzhichun.cityu._5003.hrsystem.model.Employee;

@Mapper
public interface EmployeeMapper {

    @Insert("insert into employee(name, email, enrol_time, birthday, phone_number, address, gender) values(#{name}, #{email}, #{enrolTime}, #{birthday}, #{phoneNumber}, #{address}, #{gender})")
    void insert(String name, String email, Date enrolTime, Date birthday, String phoneNumber, String address, String gender);

    @Select("select * from employee where email like concat('%', #{email}, '%') limit 5")
    List<Employee> findByEmail(String email);

    @Select("select count(*) from employee")
    int selectCount();

    @Select("select * from employee limit #{start}, #{length}")
    List<Employee> selectByPage(int start, int length);

    @Select("select count(*) from employee where id = #{id}")
    int selectCountById(int id);

    @Select("select * from employee")
    List<Employee> findAll();

    @Delete("delete from employee where id = #{id} limit 1")
    void delete(Long id);
}
