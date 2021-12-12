package org.jianzhichun.cityu._5003.hrsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:16 PM
 */
@MapperScan("org.jianzhichun.cityu._5003.hrsystem.model")
@SpringBootApplication
public class HrSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(HrSystemApplication.class, args);
    }

}
