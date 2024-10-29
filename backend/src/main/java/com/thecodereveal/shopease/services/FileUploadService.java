package com.thecodereveal.shopease.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class FileUploadService {

    @Value("${FILE_ZONE}")
    private String storageZone;

    @Value("${FILE_UPLOAD_API_KEY}")
    private String fileUploadKey;

    @Value("${FILE_UPLOAD_HOST_URL}")
    private String fileHostName;

    public int uploadFile(MultipartFile file,String fileName){

        try {
           String urlString =  fileHostName+"/"+storageZone+"/"+fileName;
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("PUT");
            connection.setRequestProperty("AccessKey",fileUploadKey);
            connection.setRequestProperty("Content-Type", "application/octet-stream");
            connection.setDoOutput(true);


            long fileSize = file.getSize();

            try (BufferedInputStream inputStream = new BufferedInputStream(file.getInputStream());
                 BufferedOutputStream outputStream = new BufferedOutputStream(connection.getOutputStream())) {

                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
            }

            int responseCode = connection.getResponseCode();
            String responseMsg = connection.getResponseMessage();
            return responseCode;
        }
        catch (Exception e){
            return 500;
        }
    }
}
