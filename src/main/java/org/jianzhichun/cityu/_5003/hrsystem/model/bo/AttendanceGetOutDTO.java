package org.jianzhichun.cityu._5003.hrsystem.model.bo;

import lombok.Data;
import org.jianzhichun.cityu._5003.hrsystem.model.po.Attendance;

/**
 * @author Zefeng Wang
 */

@Data
public class AttendanceGetOutDTO extends Attendance {
    private String email;
    private Long employeeId;
}
