package org.jianzhichun.cityu._5003.hrsystem.domain;

import lombok.Data;

import java.util.Date;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Data
public class Employee {

    private Long id;
    private String email;
    private String password;

    private String type;

    private Date resignTime;
    private Date enrolTime;

    private String name;
    private String gender;
    private String address;
    private String phoneNumber;

    private Long positionId;

}
