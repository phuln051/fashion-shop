import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email không được bỏ trống';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const Login = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    let url = 'http://localhost:3001/api/users/login';
    let tt = {  email: email, password: password};
    var otp = {
      method: 'post',
      body: JSON.stringify(tt),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, otp)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert('Đăng nhập thành công')
          sessionStorage.setItem('accessToken',data.data.token);
          sessionStorage.setItem('tokenExpiration', data.data.expiresIn);
          navigate('/');
          window.location.reload();
        
        } else {
          alert('Email hoặc mật khẩu không chính xác')
          navigate('/login');
        }
      });
  };

  return (
    <>
  
  <div className="container-login">
  <h1 className="form-title">Đăng nhập</h1>
  <form action="#">
    <div className="main-user-info">
      <div className="user-input-box">
        <label htmlFor="username">Email :</label>
        <input
          type="text"
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
      {/* <div className="user-input-box">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu :</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
        />
      </div> */}
    </div>
    <div className="gender-details-box">
      <div className="gender-category">
        <input type="radio" name="gender" id="other" />
        <label htmlFor="male">Quên mật khẩu ?</label>
        <input type="radio" name="gender" id="female" />
        <label htmlFor="female">Đăng ký</label>
      </div>
    </div>
    <div className="form-submit-btn">
      <input type="submit" defaultValue="Đăng nhập" />
    </div>
  </form>
</div>

    </>
  );
}

export default Login;
