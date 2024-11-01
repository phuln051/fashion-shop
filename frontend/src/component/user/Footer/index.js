

import './Footer.scss'
import logo from './logoVietInterior.png'
const Footer = () => {
  return (
    <div className='container-footer'>
      <footer className="footer">
        <div className="footer-section">
          <img src={logo} alt="Logo Viet Interior" className="footer-logo" />
          <div className="header-follow">
          <p>THEO DÕI CHÚNG TÔI</p>
          <div className="header-follow-icons">
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-facebook"></i>
          </div>
          </div>
        </div>
        <div className="footer-section shift-lefts ">
          <h4>CHÍNH SÁCH</h4>
          <ul>
            <p>Giới thiệu</p>
            <p>Chuyện Nhà Viet</p>
            <p>Tổng công ty</p>
            <p>Tuyển dụng</p>
            <p>Đổi trả hàng</p>
          </ul>
        </div>
        <div className="footer-section shift-left">
          <h4>VIET INTERIOR</h4>
          <ul>
            <p>Sản phẩm</p>
            <p>Ý tưởng thiết kế</p>
          </ul>
        </div>
        <div className="footer-section">
          <h4>BẢN TIN</h4>
          <ul>
          <p>
            Hãy để lại email của bạn để nhận
              được những ý tưởng trang trí mới và
            những thông tin, ưu đãi từ
              VIETINTERIOR
          </p>
          <p>Email: vietinterior@akacompany.com.vn</p>
          <p>Hotline: 18007200</p>
          </ul>
          <div className="submit-email">
          <div className="btn-email">
            <input className="" type="email" placeholder="Địa chỉ email *" />
          </div>
          <div className="btn-submit">
            <button  className="btn" type="submit">
              Gửi
            </button>
          </div>
          </div>
        </div>
      </footer>
      <hr />
      <div className="footer-bottom">
        <p>
          © 2021 - Bản quyền của VIET INTERIOR - thông hiệu thuộc VIET INTERIOR Từ
          năm 2024
        </p>
      </div>
    </div>
  )
}

export default Footer;