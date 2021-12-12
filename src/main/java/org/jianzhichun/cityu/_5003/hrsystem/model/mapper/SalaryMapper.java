package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.jianzhichun.cityu._5003.hrsystem.model.Salary;

import java.math.BigDecimal;
import java.util.List;


/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface SalaryMapper {


    @Insert("insert into salary(employee_id, amount) values(#{employeeId}, #{amount})")
    void insert(Long employeeId, BigDecimal amount);

    @Select("select s.id, s.employee_id, e.department_id, s.amount, CONCAT(e.name, '(', e.email,  ')') employee_name, d.name department_name from salary s left join employee e on s.employee_id = e.id left join department d on e.department_id = d.id")
    List<Salary> findAll();

    @Update("update salary set amount = #{amount} where id = #{id}")
    void update(Long id, BigDecimal amount);

    @Update("delete from salary where id = #{id}")
    void delete(Long id);
}
