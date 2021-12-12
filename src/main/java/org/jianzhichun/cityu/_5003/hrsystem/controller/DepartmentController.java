package org.jianzhichun.cityu._5003.hrsystem.controller;

import java.util.List;

import org.jianzhichun.cityu._5003.hrsystem.model.Department;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.DepartmentMapper;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    @Autowired
    private DepartmentMapper departmentMapper;


    @GetMapping("/queryByName")
    public Response<List<Department>> findEmployeeByEmail(String name) {
        return new Response<>(departmentMapper.findByName(name));
    }
}