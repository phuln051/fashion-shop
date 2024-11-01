import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suaSL, xoaSP, xoaGH } from './cartSlice';
import { Link } from 'react-router-dom';
import './Cart.scss';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);

  const calculateSubtotal = () => {
    return cart.reduce((total, sp) => total + sp.price * sp.soluong, 0);
  };
  const handleQuantityChange = (spId, newQuantity) => {
    // Kiểm tra nếu newQuantity nhỏ hơn 1 thì giữ nguyên là 1
    newQuantity = Math.max(Number(newQuantity), 1);

    // Gọi action suaSL với tham số là id sản phẩm và số lượng mới
    dispatch(suaSL([spId, newQuantity]));
  };
  return (
    <>
      <div className="cart-container">
        <div className="cart-items">
          <span className="thongbao">Giỏ Hàng</span>{" "}
          <i className="fas fa-circle">
            <span className="st-cart">{cart.length}</span>
          </i>
          {cart.map((product) => (
          <div>
            <div className="box-cart">
              <div className="cart-img">
                <img src={`http://localhost:3001/${product['imageUrl']}`} alt={product.name} />
              </div>
              <div className="cart-chitiet">
                <h4>{product.name}</h4>
                <div className="cart-price">
                  <span>{product.price.toLocaleString()}₫</span>
                </div>
                <button className="wishlist-button">
                  <i className="far fa-heart" /> Thêm vào Wishlist
                </button>
              </div>
              <div className="cart-select">
                <div onClick={() => dispatch(xoaSP(product._id))}  className="remove-button">
                  <i className="fas fa-times" />
                </div>
                <div className="quantity-selector">
                  <button className="decrease-quantity" onClick={() => handleQuantityChange(product._id, product.soluong - 1)}>-</button>
                  <button className="decrease-number">{product.soluong}</button>
                  <button className="increase-quantity" onClick={() => handleQuantityChange(product._id, product.soluong + 1)}>+</button>
                </div>
              </div>
            </div>
            <hr className="mrt5" />
          </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-item">
            <span>Thành tiền</span>
            <span className="den">{calculateSubtotal().toLocaleString()}₫</span>
          </div>
          <div className="summary-item">
            <span>Vận chuyển</span>
            <span>Liên hệ phí vận chuyển sau</span>
          </div>
          
          <div className="actions">
            <input className="ipGG" type="text" placeholder="Mã giảm giá" />  
            <button className="btGG">SỬ DỤNG</button>
          </div>
          <div className="summary-item total">
            <span>Tổng cộng</span>
            <span className="den">{calculateSubtotal().toLocaleString()}₫</span>
          </div>
          <div className="shipping-details">
            <span className="den"> Thông tin giao hàng</span>
            <p>
              Đối với những sản phẩm có sẵn tại kho vực, Viet Interior sẽ giao hàng trong
              vòng 2-7 ngày. Đối với những sản phẩm không có sẵn, thời gian giao hàng
              sẽ được nhân viên Viet Interior thông báo đến quý khách.
            </p>
            <p>T2-T6: 8:30 - 17:30</p>
            <p>T7, CN: 9:30 - 16:30</p>
          </div>
          <div className="actions">
            <button className="continue-shopping"><Link to='/shop'>← TIẾP TỤC MUA HÀNG</Link></button>
            <button className="checkout"><Link to='/checkout'>ĐẶT HÀNG</Link></button>
          </div>
        </div>

      </div>
    </>
  )
}

export default CartPage;