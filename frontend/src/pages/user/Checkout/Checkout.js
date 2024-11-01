import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { xoaSP, xoaGH } from '../Cart/cartSlice';
import { setTokenData } from '../../../pages/user/login/authSlice';
import axios from 'axios';
import './Checkout.scss';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.listSP);
  const calculateSubtotal = () => {
    return cart.reduce((total, sp) => total + sp.price * sp.soluong, 0);
  };

  const [validationErrors, setValidationErrors] = useState({});
  const [listprovinces, setListProvinces] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  const { accessToken, tokenExpiration } = useSelector((state) => state.auth);
  const isAuth = accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(setTokenData());
    if (!isAuth) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('tokenExpiration');
    } 
    if (isAuth) {
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
  }, [dispatch, isAuth, accessToken, tokenExpiration]);

  useEffect(() => {
    fetch('http://localhost:3001/api/provinces')
      .then(res => res.json())
      .then(data => setListProvinces(data));
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);
    fetch(`http://localhost:3001/api/districts/${selectedProvince}`)
      .then(res => res.json())
      .then(data => setListDistricts(data));
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
    }
  }, [userData]);

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
    if (!phone.trim()) {
      errors.phone = 'Số điện thoại không được bỏ trống';
    } else if (!/^\d{10,11}$/.test(phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!address.trim()) {
      errors.address = 'Địa chỉ không được bỏ trống';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm() && userData) {
      return;
    }
    const UserId = userData._id;
    let Totalbill = (calculateSubtotal() + 10)
    let url = 'http://localhost:3001/api/orders';
    let tt = { name: name, email: email, phone: phone, address: address, UserId: UserId, Totalbill: Totalbill };
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
          let id_dh = data._id;
          luuchitietdonhang(id_dh, cart);
          navigate('/thank-you');
        }
      });
  };

  const luuchitietdonhang = (id_dh, cart) => {
    let url = 'http://localhost:3001/api/orderDetail';
    cart.forEach((sp) => {
      let t = { id_order: id_dh, id_product: sp._id, quantity: sp.soluong };
      let otp = {
        method: 'post',
        body: JSON.stringify(t),
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(url, otp)
        .then((response) => response.json())
        .then((data) => luuxongsp(data))
        .catch((err) => console.log('loi luu sp', sp));
    });
  };

  const luuxongsp = (data) => {
    dispatch(xoaGH());
  };

  return (
    <>
      <div className="checkout-container">
        <div className="billing-address">
          <h2>Địa Chỉ Giao Hàng</h2>
          <form>
            <div className="form1">
              <label htmlFor="">Họ và tên</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ và tên" />
            </div>
            <div className="form2">
              <div className="trai">
                <label htmlFor="">Số điện thoại</label>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
              </div>

              <div className="phai">
                {" "}
                <label htmlFor="">Địa chỉ email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập địa chỉ email" />
              </div>
            </div>
            <div className="form1" style={{ marginTop: '-90px' }}>
              <label htmlFor="">Địa chỉ</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, vv" />
            </div>
            <div className="additional-info">
              {/* <span className="cracc">
                {" "}
                <input type="checkbox" id="createAccount" name="createAccount" />
                <label htmlFor="createAccount">Tạo tài khoản?</label>
              </span> */}
              <h2>THÔNG TIN THÊM</h2>
              <p>Lưu ý cho đơn hàng (tùy chọn)</p>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Ví dụ: Lưu ý khi giao hàng, VD: Lưu ý khi chuyển..."
                defaultValue={""}
              />
            </div>
            
          </form>
        </div>
        <div className="order-summary">
          <h2>TÓM TẮT ĐƠN HÀNG</h2>
          <div className="order-items">
            <div className="order-header">
              <span>SẢN PHẨM</span>
              <span>THÀNH TIỀN</span>
            </div>
            {cart.map((product) => (
              <div className="order-row">
                <span>{product.name}</span>
                <span>{Number(product.price * product.soluong).toLocaleString('vi')} đ</span>
              </div>
            ))}
          </div>
          <div className="subtotal">
            <span>TẠM TÍNH</span>
            <span>{calculateSubtotal().toLocaleString('vi')}đ</span>
          </div>
          
          
          <div className="shipping-method">
            <div>
              <label>
                <input type="radio" name="shipping" /> Thanh toán khi nhận hàng
              </label>
              <label>
                <input type="radio" name="shipping" /> Chuyển khoản
              </label>
            </div>
          </div>
          <div className="subtotal">
            <span>KHUYỄN MÃI</span>
            <span>0 đ</span>
          </div>
          <div className="total">
            <span>Tổng</span>
            <span>{calculateSubtotal().toLocaleString('vi')} đ</span>
          </div>
          <button onClick={handlePlaceOrder}  type="button" className="order-button">
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </>
  )
}

export default CheckoutPage;
