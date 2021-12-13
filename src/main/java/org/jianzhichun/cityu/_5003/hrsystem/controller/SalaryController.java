package org.jianzhichun.cityu._5003.hrsystem.controller;


import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.jianzhichun.cityu._5003.hrsystem.model.po.Salary;
import org.jianzhichun.cityu._5003.hrsystem.mapper.SalaryMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddSalaryRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.UpdateSalaryRequest;
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
@RequestMapping("/api/salary")
public class SalaryController {

    @Autowired
    private SalaryMapper salaryMapper;
    
    @PostMapping("/add")
    public Response<Void> insert(@RequestBody AddSalaryRequest request) {
        if (salaryMapper.selectCountByEmployeeId(request.getEmployeeId()) > 0) {
            return new Response<>(304, "The employee already has salary."); 
        }
        salaryMapper.insert(request.getEmployeeId(), request.getAmount());
        return new Response<>();
    }

    @PostMapping("/delete/{id}")
    public Response<Void> delete(@PathVariable Long id) {
        salaryMapper.delete(id);
        return new Response<>();
    }

    @PostMapping("/update/{id}")
    public Response<Void> update(@PathVariable Long id, @RequestBody UpdateSalaryRequest request) {
        salaryMapper.update(id, request.getAmount());
        return new Response<>();
    }

    @GetMapping("/amountSumByDevelopment")
    public Response<List<Map<String, BigDecimal>>> amountSumByDevelopment() {
        return new Response<>(salaryMapper.amountSumByDevelopment());
    }

    @GetMapping("/page")
    public Response<PageInfo<Salary>> page(@RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> salaryMapper.findAll()));
    }

}
