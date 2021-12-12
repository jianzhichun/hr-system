package org.jianzhichun.cityu._5003.hrsystem.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Employee extends Account {

    private String type;

    private Date resignTime;
    private Date enrolTime;

    private String name;
    private String gender;
    private String address;
    private String phoneNumber;

    private Date birthday;
    private Long positionId;
    private Long departmentId;

}
