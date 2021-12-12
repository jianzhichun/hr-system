package org.jianzhichun.cityu._5003.hrsystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Attendance;
import org.jianzhichun.cityu._5003.hrsystem.model.request.UpdateAttendanceRequest;
import org.jianzhichun.cityu._5003.hrsystem.mapper.AttendanceMapper;
import org.jianzhichun.cityu._5003.hrsystem.mapper.EmployeeMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddAttendanceRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/update/{id}")
    public Response<Void> update(@PathVariable Long id, @RequestBody UpdateAttendanceRequest request) {
        attendanceMapper.update(id, request.getStart(), request.getEnd(), request.getType(), request.getStatus());
        return new Response<>();
    }

    @GetMapping("/page")
    public Response<PageInfo<Attendance>> page(@RequestParam("page") int page, @RequestParam("size") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> attendanceMapper.findAll()));
    }

    @DeleteMapping("/delete/{id}")
    public Response<Void> delete(@PathVariable Long id) {
        attendanceMapper.delete(id);
        return new Response<>();
    }
}
