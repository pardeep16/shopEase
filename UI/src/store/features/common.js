import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: false
}

export const commonSlice = createSlice({
    name:'commonSlice',
    initialState,
    reducers:{
        setLoading : (state,action)=>{
            return {
                ...state,
                loading:action?.payload
            }
        }
    }
});

export const { setLoading } = commonSlice?.actions;
export default commonSlice?.reducer;