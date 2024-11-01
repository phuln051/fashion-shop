import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { themSP } from '../Cart/cartSlice';
import './Home.scss';
import banner from './Banner-VietInterior-1.png';
import ch360 from './360.jpg';
import gch1 from './goccamhung1.jpg';
import gch2 from './gocamhung3.jpg';
import formhinh from './formhinh.jpg';

const HomePage = () => {
  const dispatch = useDispatch();
  const [listsp, ganListSP] = useState([]);
  const [listCategory, ganListcategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [listaddress, ganListaddress] = useState([]);


  const productsPerPage = 8; // Hiển thị ba sản phẩm mỗi trang

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listsp.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(listsp.length / productsPerPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => ganListSP(data));


    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => ganListcategory(data));
  }, []);





  const prioritizedCategories = listCategory.filter(category => category.priority === 1);

 // Lấy danh mục có độ ưu tiên bằng 0
const prioritizedZeroPriorityCategories = listCategory.filter(category => category.priority === 0);

prioritizedZeroPriorityCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// Giới hạn danh sách chỉ lấy 4 danh mục mới nhất
const latestFourCategories = prioritizedZeroPriorityCategories.slice(0, 4);


listsp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
const listproductsnew = listsp.slice(0, 8);

const sortedProductsByViews = [...listsp].sort((a, b) => b.view - a.view);
const topEightProductsByViews = sortedProductsByViews.slice(0, 8);



  return (
    <>
  <div className="container-home">
  <div className="banner-container">
        <img src={banner} alt="Banner" style={{width: '100%',height:'500px', display: 'block'}} />
      </div>
  <div className="dot-container">
    <span className="dot" onclick="currentSlide(1)" />
    <span className="dot" onclick="currentSlide(2)" />
    <span className="dot" onclick="currentSlide(3)" />
  </div>
  <div className="gallery-container">
  {prioritizedCategories.map(category => (
      <div className="main-image" key={category.id}>
        <img src={`http://localhost:3001/${category['imageUrl']}`} alt={category.name} />
        <div className="caption1">{category.name}</div>
      </div>
    ))}
    <div className="side-images">
    {latestFourCategories.map(category => (
      <div className="side-image" key={category.id}>
        <img src={`http://localhost:3001/${category['imageUrl']}`} alt={category.name} />
        <div className="caption">{category.name}</div>
      </div>
    ))}
    </div>
  </div>
      <div className='container'>
      <div className="title-container">
    <span className="title-text1">SẢN PHẨM MỚI</span>
    <hr className="line" />
  </div>
  <div className="products">
  {listproductsnew.map(product => (
    <div className="product-item">
      <div className="product-card">
        <div className="product-image">
          <img
            src={`http://localhost:3001/${product['imageUrl']}`} alt={product.name}
          />
          <img
            src={`http://localhost:3001/${product['imageUrl']}`} alt={product.name}
          />
          <div className="discount-tag">-20%</div>
        </div>
        <div className="product-info">
          <div className="product-name">
            <p>{product.name}</p>
          </div>
          <div className="product-price">
                    <div className="add-like">
                      <i className="far fa-heart" />
                    </div>
                    <div className="price-container">
        <span className="sale-price">{product.price}</span>
        <span className="original-price">{product.priceOld}</span>
    </div>
                  </div>
          <div className="product-actions">
                    <button onClick={() => { dispatch(themSP(product)) }} className="add-to-cart">THÊM VÀO GIỎ</button>
                    <button className="view-more"><Link to={`/shop/${product._id}`}>XEM THÊM</Link></button>
                  </div>
        </div>
      </div>
    </div>
  ))}
    
  </div>
      </div>
  {/* dưới sản phẩm*/}
  <div className="layout-container">
    <div className="left-image">
      <img
        src="https://nhaxinh.com/wp-content/uploads/2024/01/nha-xinh-banner-phong-khach-31-1-24.jpg"
        alt="Phòng khách với sofa"
      />
    </div>
    <div className="text-content">
      <div className="text-box1" id="living-room-design">
        <h2>Mẫu thiết kế phòng khách</h2>
        <p>
          Phòng khách là không gian <br></br>
          chính của ngôi nhà, là 
          nơi sum họp gia đình.
        </p>
        <a href="#">MẪU PHÒNG KHÁCH →</a>
      </div>
      <div className="text-box2" id="decoration-tips">
        <h2>Mẫu trang trí</h2>
        <p>Mang lại nguồn cảm hứng và sinh động cho nét đẹp không gian.</p>
        <a href="#">KHÁM PHÁ →</a>
      </div>
    </div>
    <div className="right-image">
      <img
        src="https://nhaxinh.com/wp-content/uploads/2024/01/nha-xinh-do-trang-tri-banner-31-1-24.jpg"
        alt="Bình hoa trang trí"
      />
    </div>
  </div>
  <div className='container'>
  <div className="title-container">
    <span className="title-text">SẢN PHẨM XEM NHIỀU</span>
    <hr className="line1" />
  </div>
  <div className="products">
  {topEightProductsByViews.map(product => (
    <div className="product-item">
      <div className="product-card">
        <div className="product-image">
          <img
            src={`http://localhost:3001/${product['imageUrl']}`} alt={product.name}
          />
          <img
            src={`http://localhost:3001/${product['imageUrl']}`} alt={product.name}
          />
          <div className="discount-tag">-20%</div>
        </div>
        <div className="product-info">
          <div className="product-name">
            <p>{product.name}</p>
          </div>
          <div className="product-price">
            <div className="add-like">
              {" "}
              <i className="far fa-heart" />
            </div>
            <span className="sale-price">{product.price}</span>
            <span className="original-price">{product.priceOld}</span>
          </div>
          <div className="product-actions">
            <button  onClick={() => { dispatch(themSP(product)) }} className="add-to-cart">THÊM VÀO GIỎ</button>
            <button  className="view-more"><Link to={`/shop/${product._id}`}>XEM THÊM</Link></button>
          </div>
        </div>
      </div>
    </div>
  ))}
  </div>
  </div>
  {/* goc cam ung*/}
  <div className="inspiration-container">
    <h1 className="inspiration-title">Góc cảm hứng</h1>
    <div className="images-section">
      <div className="image-text-block">
        <img
          src={gch1}
          alt="Thời làn gió xuân vào không gian với bình hoa trang trí"
        />
        <p>Thời làn gió xuân vào không gian với bình hoa trang trí</p>
      </div>
      <div className="image-text-block">
        <img
          src={gch2}
          alt="Đón Tết đoàn viên với phòng ăn thanh lịch"
        />
        <p>Đón Tết đoàn viên với phòng ăn thanh lịch</p>
      </div>
    </div>
  </div>
  {/* Thêm các span cho mỗi indicator mà bạn muốn */}
  {/* form*/}
  <div className="container">
    <div className="split-container">
      <div className="form-container">
        <form>
          <h2>Bạn cần hỗ trợ?</h2>
          <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>
          <input type="text" placeholder="Họ tên" required="" />
          <input type="text" placeholder={+84} required="" />
          <input type="email" placeholder="Enter email" required="" />
          <textarea
            placeholder="Nội dung liên hệ"
            required=""
            defaultValue={""}
          />
          <button type="submit" className="submit-btn">
            GỬI YÊU CẦU
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src={formhinh} alt="" />
      </div>
    </div>
  </div>
  </div>
</>




  )
}

export default HomePage;