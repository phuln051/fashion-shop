import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'Authen', 
    initialState: {daDangNhap: false, admin:null, token:null, expiresIn:0},
    reducers: {
        thoat: (state) => {
            return {daDangNhap: false, admin:null, token:null, expiresIn:0 };
        },
        dalogin: (state, param) => {    
            state.token = param.payload.token ;
            state.expiresIn = param.payload.expiresIn ;
            state.admin = param.payload.adminInfo ;
            state.daDangNhap = true;
        },
    }, 
});

export const { dalogin, thoat } = authSlice.actions;
export default authSlice.reducer;
