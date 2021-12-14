package org.jianzhichun.cityu._5003.hrsystem.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Salary;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface SalaryMapper {

    @Select("select count(*) from salary where employee_id = #{employeeId}")
    int selectCountByEmployeeId(Long employeeId);

    @Insert("insert into salary(employee_id, amount) values(#{employeeId}, #{amount})")
    void insert(Long employeeId, BigDecimal amount);

    @Select({
            "<script>",
            "select s.id, s.employee_id, e.department_id, s.amount, CONCAT(e.name, '(', e.email,  ')') employee_name, d.name department_name from salary s left join employee e on s.employee_id = e.id left join department d on e.department_id = d.id where 1=1 ",
            "<when test='amountStart!=null'>",
            "and s.amount > #{amountStart} ",
            "</when>",
            "<when test='amountEnd!=null'>",
            "<![CDATA[ and  s.amount < #{amountEnd} ]]> ",
            "</when>",
            "</script>"
    })
    List<Salary> findAll(BigDecimal amountStart, BigDecimal amountEnd);

    @Update("update salary set amount = #{amount} where id = #{id}")
    void update(Long id, BigDecimal amount);

    @Update("delete from salary where id = #{id}")
    void delete(Long id);

    @Select("select department_name, sum(amount) sum  from ( select s.amount, d.name department_name from salary s left join employee e on s.employee_id = e.id left join department d on e.department_id = d.id ) tmp group by department_name")
    List<Map<String, BigDecimal>> amountSumByDevelopment();
}
