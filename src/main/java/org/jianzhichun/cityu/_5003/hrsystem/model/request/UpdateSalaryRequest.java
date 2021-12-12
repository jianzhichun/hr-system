package org.jianzhichun.cityu._5003.hrsystem.model.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class UpdateSalaryRequest {
    
    private BigDecimal amount;
}
