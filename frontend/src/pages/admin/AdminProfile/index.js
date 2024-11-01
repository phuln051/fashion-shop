import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AdminProfile = () => {
    const navigate = useNavigate();
  const admin = useSelector(state => state.authen.admin);
  const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
  const [oldPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleShowChangePassword = () => {
    setChangePasswordVisible(true);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const email = admin.email;
    const data = {
        email,
        oldPassword,
        newPassword
    }

    let url = 'http://localhost:3001/api/admins/change-password';
    var otp = {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
  
      fetch(url, otp)
        .then((res) =>  {
            if (res.status === 200) {
              alert('Đổi mật khẩu thành công');
              navigate('/auth/login')
            } else if (res.status === 401) {
              alert('Mật khẩu cũ không hợp lệ');
            } else if (res.status === 500) {
             alert('Có lỗi xảy ra, vui lòng thử lại sau');
            } else {
              alert('Lỗi không xác định');
            }
          })
          .catch((error) => {
            alert('Có lỗi xảy ra, vui lòng thử lại sau');
          });
  };

  return (
    <div>
      <h2>Thông tin tài khoản</h2>
      {admin && (
        <div>
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <button type="button" class="btn btn-primary" style={{ marginTop: '10px' }} onClick={handleShowChangePassword}>Đổi mật khẩu</button>
          {isChangePasswordVisible && (
            <div>
              <input style={{ marginTop: '10px' }}
              className='form-control'
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={oldPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input style={{ marginTop: '10px',marginBottom: '10px' }}
               className='form-control'
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button" class="btn btn-primary" onClick={handleChangePassword}>Lưu mật khẩu mới</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
