package com.thecodereveal.shopease.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundEx extends RuntimeException {
    public ResourceNotFoundEx(String s) {
        super(s);
    }

    public ResourceNotFoundEx(String s,Throwable cause){
        super(s,cause);
    }
}
