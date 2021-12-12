package org.jianzhichun.cityu._5003.hrsystem.model.request;

import lombok.Data;

/**
 * @author Zefeng Wang
 */

@Data
public class SignUpRequest {
    private String name, email, password;
}
