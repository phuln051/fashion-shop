// UserProfile.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData } from '../login/authSlice';
import './UserProfile.scss';
import axios from 'axios';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { accessToken, tokenExpiration } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, accessToken, tokenExpiration]);

  return (
    <div id="personal-info" className="tab-content">
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div className="profile-details">
          <div className="profile-header">
            <img
              src={userData.avatar || "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/411858173_3623257781250417_4765091450886714883_n.jpg?stp=dst-jpg_p480x480&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mJZfDnZLynwAb59Neso&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfCyEepaIpGNOYH26HtbbEIAP38flt2-jD3UWW1cghboMw&oe=66219CF9"}
              alt="Ảnh Đại Diện"
              className="profile-avatar"
            />
            <h1 className="profile-name">{userData.name}</h1>
          </div>
          <div className="content-container">
            <div className="thongtin-container">
              <div className="thongtin">
                <div className="detail">
                  <span className="label">Ngày sinh:</span>
                  <span className="value">{userData.birthdate}</span>
                </div>
                <div className="detail">
                  <span className="label">Điện thoại:</span>
                  <span className="value">{userData.phone}</span>
                </div>
              </div>
              <div className="thongtin">
                <div className="detail">
                  <span className="label">Email:</span>
                  <span className="value">{userData.email}</span>
                </div>
                <div className="detail">
                  <span className="label">Địa chỉ:</span>
                  <span className="value">{userData.address}</span>
                </div>
              </div>
            </div>
            <div className="change-info">
              <button className="change-btn">
                <Link to={`/profile/editprofile/${userData._id}`}>Thay đổi thông tin</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Không tìm thấy thông tin người dùng.</p>
      )}
    </div>
  );
};

export default UserProfile;
