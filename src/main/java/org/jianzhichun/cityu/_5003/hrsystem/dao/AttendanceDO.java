package org.jianzhichun.cityu._5003.hrsystem.dao;

import lombok.Data;

import java.util.Date;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Data
public class AttendanceDO {

    private Long id;
    private String type;
    private Date startDate;
    private Date endDate;
    private String status;
    private Long employeeId;
}
