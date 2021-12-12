package org.jianzhichun.cityu._5003.hrsystem.controller;

import lombok.extern.slf4j.Slf4j;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddEmployeeRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM
 */
@RestController
@Slf4j
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private HttpSession session;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/add")
    public Response<Void> register(@RequestBody AddEmployeeRequest request) {
        log.info(request.toString());
        Long count = jdbcTemplate.queryForObject(
                "select count(1) from employee where email = ?",
                Long.class,
                request.getEmail()
        );
        log.info(count.toString());
        if (null != count && count > 0) {
            return new Response<>(503, "This email has been taken");
        }

        jdbcTemplate.update(
                "insert into employee(name, email, enrol_time, phone_number, address, gender) values (?, ?, ?, ?, ?, ?)",
                request.getName(), request.getEmail(), new Timestamp(request.getEnrol().getTime()), request.getContact(), request.getAddress(), request.getGender());
        return new Response<>();
    }
}
