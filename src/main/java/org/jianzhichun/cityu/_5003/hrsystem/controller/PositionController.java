package org.jianzhichun.cityu._5003.hrsystem.controller;

import java.util.List;

import org.jianzhichun.cityu._5003.hrsystem.model.Position;
import org.jianzhichun.cityu._5003.hrsystem.model.mapper.PositionMapper;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/position")
public class PositionController {

    @Autowired
    private PositionMapper positionMapper;


    @GetMapping("/queryByName")
    public Response<List<Position>> findEmployeeByEmail(String name) {
        return new Response<>(positionMapper.findByName(name));
    }
}
