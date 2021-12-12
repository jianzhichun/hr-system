package org.jianzhichun.cityu._5003.hrsystem.controller;

import java.util.List;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.jianzhichun.cityu._5003.hrsystem.model.po.JobOffer;
import org.jianzhichun.cityu._5003.hrsystem.mapper.JobOfferMapper;
import org.jianzhichun.cityu._5003.hrsystem.model.request.AddJobOfferRequest;
import org.jianzhichun.cityu._5003.hrsystem.model.request.UpdateJobOfferRequest;
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
@RequestMapping("/api/joboffer")
public class JobOfferController {

    @Autowired
    private JobOfferMapper jobOfferMapper;
    
    @GetMapping("/queryByName")
    public Response<List<JobOffer>> findEmployeeByEmail(String name) {
        return new Response<>(jobOfferMapper.findByName(name));
    }

    @PostMapping("/add")
    public Response<Void> insert(@RequestBody AddJobOfferRequest request) {
        jobOfferMapper.insert(request.getTitle(), request.getNumber(), request.getDueDate(), request.getStatus(), request.getDepartmentId(), request.getPositionId());
        return new Response<>();
    }

    @PostMapping("/delete/{id}")
    public Response<Void> delete(@PathVariable Long id) {
        jobOfferMapper.delete(id);
        return new Response<>();
    }

    @PostMapping("/update/{id}")
    public Response<Void> update(@PathVariable Long id, @RequestBody UpdateJobOfferRequest request) {
        jobOfferMapper.update(id, request.getTitle(), request.getNumber(), request.getDueDate(), request.getStatus(), request.getDepartmentId(), request.getPositionId());
        return new Response<>();
    }

    @GetMapping("/page")
    public Response<PageInfo<JobOffer>> page(@RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return new Response<>(PageHelper.startPage(page, size).doSelectPageInfo(() -> jobOfferMapper.findAll()));
    }

}
