import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData, clearTokenData } from '../../../pages/user/login/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Thêm icon cart vào đây
import './Header.scss'
import axios from 'axios';
import logo from './logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra vị trí cuộn của trang
      if (window.scrollY > 0) {
        // Nếu đã cuộn, hiển thị header-menu
        setIsScrolled(true);
      } else {
        // Nếu chưa cuộn, ẩn header-menu
        setIsScrolled(false);
      }
    };

    // Lắng nghe sự kiện cuộn trang
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.listSP);

  const { accessToken, tokenExpiration } = useSelector((state) => state.auth);

  // Kiểm tra xem token có hiệu lực hay không
  const isAuth = accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ sessionStorage khi component mount
    dispatch(setTokenData());
    if (isAuth) {
      // Nếu token hợp lệ, gửi yêu cầu API để lấy thông tin người dùng
      axios.get('http://localhost:3001/api/users/user-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          // Lưu trữ thông tin người dùng trong state
          setUserData(response.data.data.data);

        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }

  }, [dispatch, isAuth, accessToken, tokenExpiration]);


  const handleLogout = () => {
    // Xử lý đăng xuất, dispatch action để xóa thông tin token
    dispatch(clearTokenData());
    window.location.reload();

  };

  const [listCategory, ganListcategory] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => ganListcategory(data));
  }, []);



  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Trạng thái để quản lý sự hiển thị của dropdown danh mục
  const [categoriesVisible, setCategoriesVisible] = useState(isHomePage);

  // Hàm để chuyển đổi sự hiển thị của dropdown danh mục
  const toggleCategoriesVisibility = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  // Ẩn dropdown khi chuyển sang trang khác
  useEffect(() => {
    setCategoriesVisible(isHomePage);
  }, [isHomePage]);

  return (
      <div className={`container-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top">
          <div className="header-top-container">
            <div className="header-top_left">
              <div className="phone-icon-flag">
                <i className="fas fa-phone" />
                <span className="menu-item"> 18008438</span>
              </div>
              <div className="menu-item">Giới thiệu</div>
              <div className="menu-item">Khuyến mãi</div>
              <div className="menu-item">Giảm giá đặc biệt</div>
            </div>
            <div className="header-top_right menu-item">
            <i class="fa-regular fa-heart"></i>

              <div className="navbar-nav">
                {userData ? (
                  <>
                    <div className="acount">
                      <Link to='profile' className="nav-item nav-link">
                        {userData['name']}
                      </Link>
                      <Link to="#" className="nav-item nav-link" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="acount">
                      <Link to="/login" className="nav-item nav-link">
                        Đăng nhập
                      </Link>
                      <Link to="/register" className="nav-item nav-link">
                        Đăng ký
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <nav className="header-menu">
          <div className="navbar">
            <div className="header-menu-left">
              <img style={{ maxWidth: '140px' }} src={logo} alt="Logo" />
            </div>
            <ul className="header-menu-center">
              <li>
                <Link className="header-menu-title" to='/'>TRANG CHỦ</Link>
              </li>
              <li>
                <Link className="header-menu-title" to='/shop'>SẢN PHẨM</Link>
                <div className="submenu">

                  {/* Row 1 */}
                  <div className="submenu-row">
                    {listCategory.map(category => (
                      <Link className="header-menu-title" to={`/category/${category._id}`}>{category.name}</Link>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Link className="header-menu-title" href="#">BỘ SƯU TẬP</Link>
              </li>
              <li>
                <Link className="header-menu-title" href="#">GÓC CẢM HỨNG</Link>
              </li>
            </ul>
            <div className="header-menu-right">
              <input type="text" placeholder="Tìm kiếm sản phẩm" />
              <img
                width={20}
                height={20}
                src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
                alt="search--v1"
              />
                <Link className="cart" to='/cart'>
                <FontAwesomeIcon icon={faShoppingCart} /> 
              {cart.length > 0 && <div className="cart-count">{cart.length}</div>}
              </Link>
            </div>
          </div>
        </nav>
      </div>
  );
};

export default Header;
