package org.jianzhichun.cityu._5003.hrsystem.dao;

import lombok.Data;

import java.util.Date;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@Data
public class ApplicationDO {

    private Long id;
    private Date date;
    private String resumeUrl;
    private String status;

}
