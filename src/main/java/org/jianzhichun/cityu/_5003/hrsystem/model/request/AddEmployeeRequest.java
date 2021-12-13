package org.jianzhichun.cityu._5003.hrsystem.model.request;

import lombok.Data;

import java.util.Date;

/**
 * @author Zefeng Wang
 */

@Data
public class AddEmployeeRequest {
    private String type;
    private String email;

    private Date resignTime;
    private Date enrolTime;

    private String name;
    private String gender;
    private String address;
    private String phoneNumber;

    private Date birthday;
    private Long positionId;
    private Long departmentId;
    private String departmentName;
    private String positionName;
}
