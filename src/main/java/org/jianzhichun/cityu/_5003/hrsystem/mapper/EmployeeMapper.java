package org.jianzhichun.cityu._5003.hrsystem.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Employee;

public interface EmployeeMapper {

        @Insert("insert into employee(name, email, enrol_time, birthday, phone_number, address, gender, department_id, position_id) values(#{name}, #{email}, #{enrolTime}, #{birthday}, #{phoneNumber}, #{address}, #{gender}, #{departmentId}, #{positionId})")
        void insert(String name, String email, Date enrolTime, Date birthday, String phoneNumber, String address,
                        String gender, Long departmentId, Long positionId);

        @Update("update employee set name=#{name}, email=#{email}, enrol_time=#{enrolTime}, resign_time=#{resignTime}, birthday=#{birthday}, phone_number=#{phoneNumber}, address=#{address}, gender=#{gender}, department_id=#{departmentId}, position_id=#{positionId} where id=#{id}")
        void update(Long id, String name, String email, Date enrolTime, Date resignTime, Date birthday,
                        String phoneNumber, String address,
                        String gender, Long departmentId, Long positionId);

        @Select("select * from employee where email like concat('%', #{email}, '%') limit 5")
        List<Employee> findByEmail(String email);

        @Select("select count(*) from employee")
        int selectCount();

        @Select("select * from employee limit #{start}, #{length}")
        List<Employee> selectByPage(int start, int length);

        @Select("select count(*) from employee where id = #{id}")
        int selectCountById(int id);

        @Select({
                        "<script>",
                        "select e.*, d.name department_name, p.name position_name from employee e left join department d on e.department_id = d.id left join position p on e.position_id = p.id where 1=1 ",
                        "<when test='name!=null'>",
                        "and e.name like concat('%', #{name}, '%') ",
                        "</when>",
                        "<when test='departmentId!=null'>",
                        "and e.department_id = #{departmentId} ",
                        "</when>",
                        "<when test='positionId!=null'>",
                        "and e.position_id = #{positionId} ",
                        "</when>",
                        "<when test='enrolTime!=null'>",
                        "and e.enrol_time = #{enrolTime} ",
                        "</when>",
                        "</script>"
        })
        List<Employee> findAll(String name, Long departmentId, Long positionId, Date enrolTime);

        @Delete("delete from employee where id = #{id} limit 1")
        void delete(Long id);

        @Select("select gender, count(1) count from employee group by gender")
        List<Map<String, Object>> countByGender();

        @Select("select department_id, position_id, count(1) count from employee group by department_id, position_id")
        List<Map<String, Object>> countByDepartmentAndLevel();

        @Select("select department_id, count(1) count from employee group by department_id")
        List<Map<String, Object>> countByDepartment();
}
