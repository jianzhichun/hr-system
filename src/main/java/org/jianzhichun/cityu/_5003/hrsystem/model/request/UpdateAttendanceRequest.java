package org.jianzhichun.cityu._5003.hrsystem.model.request;

import lombok.Data;

import java.util.Date;

/**
 * @author Zefeng Wang
 */

@Data
public class UpdateAttendanceRequest {
    private int eid;
    private String type, status;
    private Date start, end;
}
