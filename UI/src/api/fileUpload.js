import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";


export const fileUploadAPI = async (data)=>{
    const url = API_BASE_URL + `/api/file`;
    try{
        const response = await axios(url,{
            method:"POST",
            headers:{
                ...getHeaders(),
                'Content-Type': 'multipart/form-data'
            },
            data:data
        });
        return response?.data;
    }
    catch(err){
        throw new Error(err);
    }
}