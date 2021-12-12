package org.jianzhichun.cityu._5003.hrsystem.model.request;

import java.util.Date;

import lombok.Data;

@Data
public class UpdateJobOfferRequest {
    
    private String title;
    private Long number;
    private Date dueDate;
    private String status;
    private Long departmentId;
    private Long positionId;
}
