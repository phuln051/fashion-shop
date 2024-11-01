import React from 'react';
import { useNavigate, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";

const LoginAdmin = () => {
 
  const navigate = useNavigate();
  let emailRef = React.createRef();
  let passwordRef = React.createRef();
  const dispatch = useDispatch();

  const submitDuLieu = (e) => { 
    e.preventDefault(); 
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      alert("Nhập đủ thông tin nhe bạn ơi "); return;
    }
    let url = "http://localhost:3001/api/admins/login";
    let tt = { email: emailRef.current.value, password: passwordRef.current.value }
    var opt = {
      method: "post",
      body: JSON.stringify(tt),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, opt).then(res => res.json()).then(data => {
      dispatch(dalogin(data))
      navigate('/admin')
    });
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Chào mừng bạn đã trở lại</h1>
                    </div>
                    <form className="user" method='post'>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Username..."
                          ref={emailRef}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          ref={passwordRef}
                        />  
                      </div>
                      <div className="form-group">
                      <button  type="submit" onClick={submitDuLieu} className="btn-primary btn-user btn-block  ">
                        Đăng nhập
                      </button>
                      </div>
                     

                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginAdmin;