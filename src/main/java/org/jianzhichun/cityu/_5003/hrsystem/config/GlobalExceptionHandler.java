package org.jianzhichun.cityu._5003.hrsystem.config;

import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(java.lang.Exception.class)
	public Response<String> handle(Exception e){
		return new Response<>(503, e.getMessage());
	}

}
