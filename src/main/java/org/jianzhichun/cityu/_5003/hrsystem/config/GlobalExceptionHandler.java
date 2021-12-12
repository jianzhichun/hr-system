package org.jianzhichun.cityu._5003.hrsystem.config;

import lombok.extern.slf4j.Slf4j;
import org.jianzhichun.cityu._5003.hrsystem.utils.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ResponseBody
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(java.lang.Exception.class)
	public Response<String> handle(Exception e){
		log.error(e.toString());
		if (e instanceof cn.dev33.satoken.exception.NotLoginException) {
			return new Response<>(304, "Session expired.");
		}
		return new Response<>(503, e.getMessage());
	}

}
