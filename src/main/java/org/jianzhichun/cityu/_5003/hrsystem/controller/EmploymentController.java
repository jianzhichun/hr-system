package org.jianzhichun.cityu._5003.hrsystem.controller;


import java.util.Date;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.jianzhichun.cityu._5003.hrsystem.model.Application;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.ApplicationMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddApplicationRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.UpdateApplicationRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.dev33.satoken.annotation.SaCheckLogin;

@SaCheckLogin
@RestController
@RequestMapping("/api/employment")
public class EmploymentController {

    @Autowired
    private ApplicationMapper applicationMapper;
    
    @PostMapping("/add")
    public Response<Void> insert(@RequestBody AddApplicationRequest request) {
        applicationMapper.insert(new Date(), request.getJobOfferId(), request.getResumeUrl());
        return new Response<>();
    }

    @PostMapping("/delete/{id}")
    public Response<Void> delete(@PathVariable Long id) {
        applicationMapper.delete(id);
        return new Response<>();
    }

    @PostMapping("/update/{id}")
    public Response<Void> update(@PathVariable Long id, @RequestBody UpdateApplicationRequest request) {
        applicationMapper.update(id, request.getJobOfferId(), request.getResumeUrl(), request.getStatus());
        return new Response<>();
    }

    @GetMapping("/page")
    public Response<PageInfo<Application>> page(@RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> applicationMapper.findAll()));
    }

}
