package org.jianzhichun.cityu._5003.hrsystem.controller;

import org.jianzhichun.cityu._5003.hrsystem.model.Employee;
import org.jianzhichun.cityu._5003.hrsystem.model.request.LoginRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.SignUpRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.HashUtil;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM
 */
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private HttpSession session;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/me")
    public Response<Object> me() {
        Object user = session.getAttribute("user");
        return user instanceof Employee ? new Response<>(user) : new Response<>(304, "Session expired.");
    }

    @GetMapping("/logout")
    public Response<Void> logout() {
        session.removeAttribute("user");
        return new Response<>();
    }

    @PostMapping("/login")
    public Response<Void> login(@RequestBody LoginRequest payLoad) {
        Employee employee = jdbcTemplate.queryForObject(
                "select * from employee where email = ?",
                new BeanPropertyRowMapper<>(Employee.class),
                payLoad.getEmail()
        );
        if (null == employee) {
            return new Response<>(404, "Not exist.");
        }
        if (HashUtil.sha256(payLoad.getPassword()).equals(employee.getPassword())) {
            session.setAttribute("user", employee);
            return new Response<>();
        }
        return new Response<>(503, "Invalid email or password.");
    }

    @PostMapping("/register")
    public Response<Void> register(@RequestBody SignUpRequest payLoad) {
        Long count = jdbcTemplate.queryForObject(
                "select count(1) from employee where email = ?",
                Long.class,
                payLoad.getEmail()
        );
        if (null != count && count > 1) {
            return new Response<>(503, "This email has been taken");
        }
        jdbcTemplate.update(
                "insert into employee(name, email, password) values(?, ?, ?)",
                payLoad.getName(), payLoad.getEmail(), HashUtil.sha256(payLoad.getPassword())
        );
        return new Response<>();
    }
}
