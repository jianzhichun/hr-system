package org.jianzhichun.cityu._5003.hrsystem.model.request;

import lombok.Data;

import java.util.Date;

/**
 * @author Zefeng Wang
 */

@Data
public class UpdateEmployeeRequest {
    private String name, email, contact, address, gender;
    private Date enrol, resign, birthday;
}
