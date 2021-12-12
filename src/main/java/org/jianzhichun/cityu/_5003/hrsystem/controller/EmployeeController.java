package org.jianzhichun.cityu._5003.hrsystem.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Attendance;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Employee;
import org.jianzhichun.cityu._5003.hrsystem.mapper.AccountMapper;
import org.jianzhichun.cityu._5003.hrsystem.mapper.EmployeeMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddEmployeeRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import cn.dev33.satoken.annotation.SaCheckLogin;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM+
 */
@SaCheckLogin
@Slf4j
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    
    @Autowired
    private EmployeeMapper employeeMapper;
    @Autowired
    private AccountMapper accountMapper;

    @GetMapping("/queryByEmail")
    public Response<List<Employee>> findEmployeeByEmail(String email) {
        return new Response<>(employeeMapper.findByEmail(email));
    }

    @PostMapping("/add")
    public Response<Void> add(@RequestBody AddEmployeeRequest request) {
        if (accountMapper.selectCountByEmail(request.getEmail()) > 0) {
            return new Response<>(503, "This email has been taken");
        }
        log.info(request.toString());

        employeeMapper.insert(request.getName(), request.getEmail(), request.getEnrol(), request.getBirthday(),  request.getContact(), request.getAddress(), request.getGender());
        return new Response<>();
    }

//    @PostMapping("/update/{id}")
//    public Response<Void> update(@PathVariable Long id, @RequestBody UpdateEmployeeRequest request) {
//        employeeMapper.update(id, request.getStart(), request.getEnd(), request.getType(), request.getStatus());
//        return new Response<>();
//    }
//
    @GetMapping("/page")
    public Response<PageInfo<Attendance>> page(@RequestParam("page") int page, @RequestParam("size") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> employeeMapper.findAll()));
    }

    @DeleteMapping("/delete/{id}")
    public Response<Void> delete(@PathVariable Long id) {
        employeeMapper.delete(id);
        return new Response<>();
    }
}
