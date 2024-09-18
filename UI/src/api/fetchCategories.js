import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant"


export const fetchCategories = async()=> {
    const url = API_BASE_URL + API_URLS.GET_CATEGORIES;

    try{
        const result = await axios(url,{
            method:'GET'
        });
        return result?.data;
    }
    catch(e){
        console.log(e);
    }
}