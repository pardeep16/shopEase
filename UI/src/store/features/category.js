import { createSlice } from "@reduxjs/toolkit"


export const initialState = {
    categories:[]
}


export const categorySlice = createSlice({
    name:'categorySlice',
    initialState,
    reducers:{
        loadCategories: (state,action)=>{
            return {
                ...state,
                categories: action?.payload
            }
        }
    }
})

export const { loadCategories } = categorySlice?.actions;

export default categorySlice?.reducer;