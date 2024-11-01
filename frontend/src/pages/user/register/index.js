import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss'
const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Họ tên không được bỏ trống';
    }
    if (!email.trim()) {
      errors.email = 'Email không được bỏ trống';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!password.trim()) {
      errors.address = 'Địa chỉ không được bỏ trống';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const createUser = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    let url = 'http://localhost:3001/api/users/register';
    let tt = { name: name, email: email, password: password};
    var otp = {
      method: 'post',
      body: JSON.stringify(tt),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, otp)
      .then((res) => res.json())
      .then((data) => {
        if (data._id < 0) {
          console.log('Lỗi đơn hàng', data);
        } else {
          alert('Đăng ký thành công')
          navigate('/login');
        }
      });
  };
  return (
    <>
    <div className='container-form-register'>
      <div className='bgr'>
   <div className="container-register">
  <h1 className="form-title">ĐĂNG KÝ THÀNH VIÊN</h1>
  <form action="#">
    <div className="main-user-info">
    <div className="user-input-box">
        <label htmlFor="username">Tên :</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nhập họ tên"
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="username">Email :</label>
        <input
          type="email"
          id="username"
          name="username"
          placeholder="Nhập email"
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="password">Mật khẩu :</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Nhập mật khẩu"
        />
      </div>
    </div>
    <div className="gender-details-box">
      <div className="gender-category">
        <input type="radio" name="gender" id="female" />
        <label htmlFor="female">Đăng nhập</label>
      </div>
    </div>
    <div className="form-submit-btn">
      <button className='btn-register'>Đăng ký</button>
    </div>
  </form>
</div></div>
</div>
    </>
  );
}
export default Register;
