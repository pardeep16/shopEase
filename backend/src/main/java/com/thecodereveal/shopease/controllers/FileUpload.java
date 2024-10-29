package com.thecodereveal.shopease.controllers;

import com.thecodereveal.shopease.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@CrossOrigin
public class FileUpload {

    @Autowired
    FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<?> fileUpload(@RequestParam(value = "file",required = true) MultipartFile file, @RequestParam(value = "fileName",required = true) String fileName){

        int statusCode = fileUploadService.uploadFile(file,fileName);
        return new ResponseEntity<>(statusCode == 201 ? HttpStatus.CREATED: HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
