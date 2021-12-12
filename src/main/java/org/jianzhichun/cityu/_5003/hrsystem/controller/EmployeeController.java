package org.jianzhichun.cityu._5003.hrsystem.controller;

import cn.dev33.satoken.stp.StpUtil;
import lombok.Data;

import org.jianzhichun.cityu._5003.hrsystem.dao.EmployeeDO;
import org.jianzhichun.cityu._5003.hrsystem.dao.EmployeeMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.SignUpRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.jianzhichun.cityu._5003.hrsystem.utils.HashUtil;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM
 */
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeMapper employeeMapper;

    @Data
    public static class PayLoad {
        private String email, password;
    }

    @GetMapping("/me")
    public Response<EmployeeDO> me() {
        try {
            return new Response<>((EmployeeDO) StpUtil.getSession().get("user"));
        } catch (Exception e) {
            return new Response<>(304, "session expired");
        }
    }

    @PostMapping("/login")
    public Response<Void> doLogin(@RequestBody PayLoad payLoad) {
        EmployeeDO employeeDo = employeeMapper.findOneByEmail(payLoad.getEmail());
        if (null == employeeDo) {
            return new Response<>(404, "Not exist.");
        }
        if (HashUtil.sha256(payLoad.getPassword()).equals(employeeDo.getPassword())) {
            StpUtil.login(employeeDo.getId());
            StpUtil.getSession().set("user", employeeDo);
            return new Response<>();
        }
        return new Response<>(404, "Invalid email or password.");
    }

    @PostMapping("/register")
    public Response<Void> register(@RequestBody SignUpRequest request) {
        if (employeeMapper.selectCountByEmail(request.getEmail()) > 1) {
            return new Response<>(404, "This email has been taken");
        }

        employeeMapper.insert(request.getName(), request.getEmail(), HashUtil.sha256(request.getPassword()));
        return new Response<>();
    }
}
