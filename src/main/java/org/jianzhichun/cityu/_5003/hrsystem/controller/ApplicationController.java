package org.jianzhichun.cityu._5003.hrsystem.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.jianzhichun.cityu._5003.hrsystem.dao.ApplicationDO;
import org.jianzhichun.cityu._5003.hrsystem.dao.ApplicationMapper;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    @Autowired
    private ApplicationMapper applicationMapper;

    @GetMapping("/page")
    public Response<PageInfo<ApplicationDO>> page(@RequestParam(name = "page", defaultValue = "1") int page,
                                                  @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> applicationMapper.findAll()));
    }

}
