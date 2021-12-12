package org.jianzhichun.cityu._5003.hrsystem.controller;

import java.math.BigDecimal;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.jianzhichun.cityu._5003.hrsystem.model.Salary;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.SalaryMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddSalaryRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
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
    private SalaryMapper salaryMapper;
    
    @PostMapping("/insert")
    public Response<Void> insert(@RequestBody AddSalaryRequest request) {
        salaryMapper.insert(request.getEmployeeId(), request.getAmount());
        return new Response<>();
    }

    @PostMapping("/update/{id}")
    public Response<Void> update(@PathVariable Long id, @RequestBody BigDecimal amount) {
        salaryMapper.update(id, amount);
        return new Response<>();
    }

    @GetMapping("/page")
    public Response<PageInfo<Salary>> page(@RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> salaryMapper.findAll()));
    }

}
