package org.jianzhichun.cityu._5003.hrsystem.model.request;

import lombok.Data;

/**
 * @author Zefeng Wang
 */

@Data
public class LoginRequest {
    private String email, password;
}
