package org.jianzhichun.cityu._5003.hrsystem.controller;

import org.jianzhichun.cityu._5003.hrsystem.model.po.Employee;
import org.jianzhichun.cityu._5003.hrsystem.mapper.AccountMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.LoginRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.SignUpRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.HashUtil;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.dev33.satoken.stp.StpUtil;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM
 */
@RestController
@RequestMapping("/api/account")
public class AccountController {
    
    @Autowired
    private AccountMapper accountMapper;

    @GetMapping("/me")
    public Response<Object> me() {
        Object user = StpUtil.getSession().get("user");
        return user instanceof Employee ? new Response<>(user) : new Response<>(304, "Session expired.");
    }

    @GetMapping("/logout")
    public Response<Void> logout() {
        StpUtil.logout();
        return new Response<>();
    }

    @PostMapping("/login")
    public Response<Void> login(@RequestBody LoginRequest payLoad) {
        Employee employeeDo = accountMapper.findOneByEmail(payLoad.getEmail());
        if (null == employeeDo) {
            return new Response<>(404, "Not exist.");
        }
        if (HashUtil.sha256(payLoad.getPassword()).equals(employeeDo.getPassword())) {
            StpUtil.login(employeeDo.getId());
            StpUtil.getSession().set("user", employeeDo);
            return new Response<>();
        }
        return new Response<>(503, "Invalid email or password.");
    }

    @PostMapping("/register")
    public Response<Void> register(@RequestBody SignUpRequest request) {
        if (accountMapper.selectCountByEmail(request.getEmail()) > 1) {
            return new Response<>(304, "This email has been taken");
        }

        accountMapper.insert(request.getName(), request.getEmail(), HashUtil.sha256(request.getPassword()));
        return new Response<>();
    }
}
