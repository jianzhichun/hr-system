package org.jianzhichun.cityu._5003.hrsystem.controller;

import org.jianzhichun.cityu._5003.hrsystem.model.Employee;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM
 */
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private HttpSession session;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/{id}/breif")
    public Response<Employee> findOne(@PathVariable String id) {
        return new Response<>(jdbcTemplate.queryForObject("select name, email from employee where id = ?",
                new BeanPropertyRowMapper<>(Employee.class), id));
    }

}
