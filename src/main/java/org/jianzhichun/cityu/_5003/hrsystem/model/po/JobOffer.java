package org.jianzhichun.cityu._5003.hrsystem.model.po;

import lombok.Data;

import java.util.Date;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Data
public class JobOffer {

    private Long id;
    private String title;
    private Long number;
    private Date dueDate;
    private String status;
    private Long departmentId;
    private Long positionId;
    private String departmentName;
    private String positionName;
}
