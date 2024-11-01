import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData, clearTokenData } from '../../../pages/user/login/authSlice';
import axios from 'axios';


const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  const { accessToken, tokenExpiration } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(setTokenData());

    if (accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration) {
      axios.get('http://localhost:3001/api/users/user-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          setUserData(response.data.data.data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }

  }, [dispatch, accessToken, tokenExpiration]);
  return (
    <div className="sidebar">
    <ul>
      <li>
        <Link to='/profile'>Thông Tin Cá Nhân</Link>
      </li>
      <li>
      {userData && userData._id && (
        <Link to={`/profile/orders/${userData._id}`}>Đơn Hàng</Link>
        )}
      </li>
      <li>
        <a href="#edit-info">Đổi mật khẩu</a>
      </li>
    </ul>
  </div>
  );
}

export default Header;
