package org.jianzhichun.cityu._5003.hrsystem.utils;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Zhang Zao
 * @version 1.0
 * @date 12/11/2021 10:23 PM
 */
@Data
@NoArgsConstructor
public class Response<T> {
    private int code = 200;
    private String message;
    private T data;

    public Response(T data) {
        this.code = 0;
        this.message = "success";
        this.data = data;
    }

    public Response(int code, String message) {
        this.code = code;
        this.message = message;
        this.data = null;
    }
}