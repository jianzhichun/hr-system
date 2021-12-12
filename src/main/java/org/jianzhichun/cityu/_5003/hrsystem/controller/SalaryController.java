package org.jianzhichun.cityu._5003.hrsystem.controller;

import java.math.BigDecimal;

import javax.servlet.http.HttpSession;

import org.jianzhichun.cityu._5003.hrsystem.model.Salary;
import org.jianzhichun.cityu._5003.hrsystem.utils.Page;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/salary")
public class SalaryController {

    @Autowired
    private HttpSession session;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/update/{id}")
    public Response<Void> update(@PathVariable Long id, @RequestBody BigDecimal amount) {
        jdbcTemplate.update("update salary set amount = ? where id = ?", amount, id);
        return new Response<>();
    }

    @GetMapping("/page")
    public Response<Page<Salary>> page(@RequestParam(name = "page", defaultValue = "1") long page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(new Page<>(
                jdbcTemplate.queryForObject("select count(1) from salary", Long.class),
                page, size,
                jdbcTemplate.query(
                        "select s.id, s.employee_id, s.department_id, s.amount, CONCAT(e.name, '(', e.email,  ')') employee_name, d.name department_name from salary s left join department d on s.department_id = d.id left join employee e on s.employee_id = e.id limit ? offset ?",
                        new BeanPropertyRowMapper<>(Salary.class),
                        size, Math.max(0, page - 1) * size)
        ));
    }

}
