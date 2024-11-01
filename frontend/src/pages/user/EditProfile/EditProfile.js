import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData } from '../../../pages/user/login/authSlice';
import axios from 'axios';

import './EditProfile.scss';

const EditProfile = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const newData = Object.fromEntries(formData.entries());

      await axios.put(`http://localhost:3001/api/users/user-profile/${userData._id}`, newData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Nếu cập nhật thành công, thông báo và cập nhật lại state userData
      alert('Cập nhật thông tin thành công');
      setUserData(prevUserData => ({ ...prevUserData, ...newData }));
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    }
  };

  return (
    <div className="container-infomation">
      <div className="container-form">
        <h1 className="title">Thay Đổi Thông Tin</h1>
        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <div className="form-infomation">
            <form id="info-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-edit">
                  <div className="input-group">
                    <label className="label-text" htmlFor="name">
                      Tên:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="text-input"
                      placeholder="Nhập tên của bạn"
                      required=""
                      value={userData.name}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label-text" htmlFor="dob">
                      Ngày sinh:
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="date-input"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-edit">
                  <div className="input-group">
                    <label className="label-text" htmlFor="phone">
                      Điện thoại:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="tel-input"
                      placeholder="Nhập số điện thoại"
                      required=""
                      value={userData.phone}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label-text" htmlFor="email">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="email-input"
                      placeholder="Nhập địa chỉ email"
                      value={userData.email}
                      required=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-2-edit">
                <div className="input-group">
                  <label className="label-text" htmlFor="address">
                    Địa chỉ:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="add-input"
                    placeholder="Nhập địa chỉ của bạn"
                    value={userData.address || ''}
                    required=""
                  />
                </div>
                <div className="input-group">
                  <label className="label-text" htmlFor="avatar">
                    Ảnh đại diện:
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    className="file-input"
                  />
                </div>
              </div>
              <div className="button-form">
                <button type="submit" className="button">
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p>Không tìm thấy thông tin người dùng.</p>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
