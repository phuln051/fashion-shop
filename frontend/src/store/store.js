import { configureStore } from '@reduxjs/toolkit';
import cartSlice, { saveCartToStorage } from '../pages/user/Cart/cartSlice';
import authReducer from '../pages/user/login/authSlice';
import authSilce from '../pages/admin/Login/authSlice'
const initialState = {
  cart: {
    listSP: JSON.parse(sessionStorage.getItem('cart')) || [],
  },
  // trạng thái khởi đầu khác...
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    authen: authSilce,
  },
  preloadedState: initialState,
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToStorage(state.cart.listSP);
});
