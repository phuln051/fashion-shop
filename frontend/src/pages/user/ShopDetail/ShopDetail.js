import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { themSP } from '../Cart/cartSlice';
import './ShopDetail.scss'
const ShopDetailPage = () => {
  let { productId } = useParams();
  console.log(productId);
  const dispatch = useDispatch();
  const [sp, ganSP] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {

    fetch("http://localhost:3001/api/products/" + productId)
      .then(res => res.json())
      .then(data => {
        ganSP(data);
2
        // Access categoryId directly from data
        fetch(`http://localhost:3001/api/products/category/` + data.categoryId)
          .then(res => res.json())
          .then(data => {
            setRelatedProducts(data);
          });


      });
    window.scrollTo(0, 0);
  }, [productId]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = relatedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container-shopdetail">

        <div className="Container-duongDan">
          <div className="duongDan">
            <a href="#">Trang chủ / Sản Phẩm</a>
          </div>
        </div>
        <div className="details-product">

          <div className="productContainer">
            <div className="prdTrai">
              <div className="traiTop">
                <img
                  src={`http://localhost:3001/${sp['imageUrl']}`} alt={sp['name']}
                />
              </div>
            </div>
            <div className="prdPhai">
              <div className="productPanel">
                <div className="prdName">{sp.name}</div>
                <div className="prdGia">
                  <div className="giaKm">
                    <p>{sp['price'] ? sp['price'].toLocaleString() : ''}₫</p>
                  </div>
                  <div className="giaGoc">
                    <p>{sp['priceOld'] ? sp['priceOld'].toLocaleString() : ''}₫</p>
                  </div>
                </div>
                <div className="prdChitiet">
                  <div className="vatLieu">
                    <span className="den">Vật liệu : </span>
                    <span className="trang">{sp.material}</span>
                  </div>
                  <div className="kichThuoc">
                    <span className="den">Kích thước : </span>
                    <span className="trang">{sp.size}</span>
                  </div>
                  <div className="ma">
                    <span className="den">Mã : </span>
                    <span className="trang">{sp.code}</span>
                  </div>
                  <div className="quantityContainer">
                    <label htmlFor="quantity">Số lượng : </label>
                    <div className="quantityAdjuster">

                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        defaultValue={1}
                        min={1}
                      />

                    </div>
                  </div>
                  <div className="buttons">
                      <button type="button" className="buyNow">
                      <Link to='/cart'> MUA NGAY</Link>
                    </button>
                    <button onClick={() => { dispatch(themSP(sp)) }} type="button" className="addToCart second-button">
                      THÊM VÀO GIỎ
                    </button>
                  </div>

                </div>
              </div>
              <>
                <div className="tabs">
                  <a href="#Description" className="tabButton">
                    Mô tả
                  </a>
                  <a href="#Reviews" className="tabButton">
                    Đánh giá
                  </a>
                  <a href="#Warranty" className="tabButton">
                    Bảo hành
                  </a>
                  <a href="#Shipping" className="tabButton">
                    Vận chuyển
                  </a>
                </div>
                <div id="Description" className="tabContent">

                  <p>{sp.discription}</p>
                </div>
                <div id="Reviews" className="tabContent">
                  <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                </div>
                <div id="Warranty" className="tabContent">
                  <strong><h3>Chính sách bảo hành:</h3></strong>
                  <p>✔️ Viet Interior bảo hành một năm cho các trường hợp có lỗi về kỹ thuật trong quá trình sản xuất hay lắp đặt.<br></br>
                    ✔️ Quý khách không nên tự sửa chữa mà hãy báo ngay cho Viet Interior qua hotline: 1800 7200.<br></br>
                    ✔️ Sau thời gian hết hạn bảo hành, nếu quý khách có bất kỳ yêu cầu hay thắc mắc thì
                    vui lòng liên hệ với Nhà Xinh để được hướng dẫn và giải quyết các vấn đề gặp phải.<br></br>
                    <strong><h5>TUY NHIÊN VIET INTERIOR KHÔNG BẢO HÀNH CHO CÁC TRƯỜNG HỢP SAU:</h5></strong>

                    ✔️ Khách hàng tự ý sửa chữa khi sản phẩm bị trục trặc mà không báo cho Nhà Xinh.<br></br>

                    ✔️ Sản phẩm được sử dụng không đúng quy cách của sổ bảo hành (được trao gửi khi quý khách mua sản phẩm)
                    gây nên trầy xước, móp, dơ bẩn hay mất màu.<br></br>

                    ✔️ Sản phẩm bị biến dạng do môi trường bên ngoài bất bình thường (quá ẩm, quá khô, mối hay do tác động
                    từ các thiết bị điện nước, các hóa chất hay dung môi khách hàng sử dụng không phù hợp).<br></br>

                    ✔️ Sản phẩm hết hạn bảo hành.

                    Sản phẩm không có phiếu bảo hành của Nhà Xinh.</p>
                </div>
                <div id="Shipping" className="tabContent">
                  <strong><h3>Chính sách giao hàng:</h3></strong>
                  <p>✔️ MIỄN PHÍ giao hàng trong các Quận nội thành Tp.Hồ Chí Minh,áp dụng
                    cho các đơn hàng trị giá trên 10 triệu.<br></br>
                    ✔️ Đối với khu vực các tỉnh lân cận: Tính phí hợp lý theo dựa trên quãng đường vận chuyển</p>
                </div>
              </>

            </div>
          </div>
        </div>
        <div className="title-container">
          <span className="title-text">SẢN PHẨM XEM NHIỀU</span>
          <hr className="line" />
        </div>
        <div className="products">
          {currentProducts.map(product => (
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
                    <span className="sale-price">{product.price}</span>
                    <span className="original-price">{product.priceOld}</span>
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
        <div className="pagination-container">
          <span className="pagination-arrow" onClick={() => paginate(currentPage - 1)}>&lt;</span>
          {pageNumbers.map(number => (
            <span key={number} className={`pagination-step ${currentPage === number ? 'active' : ''}`} onClick={() => paginate(number)}>
              {number}
            </span>
          ))}
          <span className="pagination-arrow" onClick={() => paginate(currentPage + 1)}>&gt;</span>
        </div>
      </div>
    </>


  )
}

export default ShopDetailPage;