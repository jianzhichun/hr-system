package org.jianzhichun.cityu._5003.hrsystem.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.jianzhichun.cityu._5003.hrsystem.model.JobOffer;

import java.util.Date;
import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
public interface JobOfferMapper {

    @Insert("insert into job_offer(title, number, due_date, status, department_id, position_id) values(#{title}, #{number}, #{dueDate}, #{status}, #{departmentId}, #{positionId})")
    void insert(String title, Long number, Date dueDate, String status, Long departmentId, Long positionId);

    @Select("select * from job_offer where title like concat('%', #{name}, '%') limit 5")
    List<JobOffer> findByName(String name);

    @Select("select s.*, d.name department_name, p.name position_name from job_offer s, department d, position p where s.department_id = d.id and s.position_id = p.id")
    List<JobOffer> findAll();

    @Update("update job_offer set title = #{title}, number=#{number}, due_date=#{dueDate}, department_id=#{departmentId}, position_id=#{positionId} where id = #{id}")
    void update(Long id, String title, Long number, Date dueDate, String status, Long departmentId, Long positionId);

    @Update("delete from job_offer where id = #{id}")
    void delete(Long id);

}
