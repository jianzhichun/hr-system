package org.jianzhichun.cityu._5003.hrsystem.controller;

import org.jianzhichun.cityu._5003.hrsystem.model.Employee;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.AccountMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.EmployeeMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddEmployeeRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.PageRequest;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:20 PM+
 */
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

        employeeMapper.insert(request.getName(), request.getEmail(), request.getEnrol(), request.getContact(), request.getAddress(), request.getGender());
        return new Response<>();
    }


    @PostMapping("/list")
    public Response<List<Employee>> listEmployees(@RequestBody PageRequest request) {
        int total = employeeMapper.selectCount();

        final PageUtil.StartAndLength startAndLength = PageUtil.getStartAndLength(request.getPage(), request.getSize(), total);

        List<Employee> employees = employeeMapper.selectByPage(startAndLength.getStart(), startAndLength.getLength());
        return new Response<>(employees);
    }
}
