package org.jianzhichun.cityu._5003.hrsystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.jianzhichun.cityu._5003.hrsystem.model.Attendance;
import org.jianzhichun.cityu._5003.hrsystem.model.Employee;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.AccountMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.AttendanceMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.EmployeeMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddAttendanceRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddEmployeeRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.PageRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.PageUtil;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Zefeng Wang
 */
@SaCheckLogin
@Slf4j
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    
    @Autowired private AttendanceMapper attendanceMapper;
    @Autowired private EmployeeMapper employeeMapper;


    @PostMapping("/add")
    public Response<Void> add(@RequestBody AddAttendanceRequest request) {
        log.info(request.toString());
        int count = employeeMapper.selectCountById(request.getEid());
        if (count == 0) {
            return new Response<>(503, "Employee does not exist");
        }
        attendanceMapper.insert(request.getEid(), request.getStart(), request.getEnd(), request.getType());
        return new Response<>();
    }

    @GetMapping("/page")
    public Response<PageInfo<Attendance>> page(@RequestParam("page") int page, @RequestParam("size") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> attendanceMapper.findAll()));
    }
}
