package org.jianzhichun.cityu._5003.hrsystem.controller;


import org.jianzhichun.cityu._5003.hrsystem.domain.Application;
import org.jianzhichun.cityu._5003.hrsystem.utils.Page;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/page")
    public Response<Page<Application>> page(@RequestParam(name = "page", defaultValue = "1") long page,
                                            @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(new Page<>(
                jdbcTemplate.queryForObject("select count(1) from application", Long.class),
                page, size,
                jdbcTemplate.query(
                        "select * from application limit ? offset ?",
                        new BeanPropertyRowMapper<>(Application.class),
                        size, Math.max(0, page - 1) * size
                )
        ));
    }

}
