package org.jianzhichun.cityu._5003.hrsystem.dao;

import lombok.Data;

import java.math.BigDecimal;


/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Data
public class SalaryDO {

    private Long id;
    private Long employeeId;
    private Long DepartmentId;
    private BigDecimal amount;
}
