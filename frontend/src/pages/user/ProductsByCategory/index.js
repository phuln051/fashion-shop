import React, { useState, useEffect } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { themSP } from '../Cart/cartSlice';
import './Shop.scss';

const ShopPage = () => {
  const dispatch = useDispatch();
  const [listsp, ganListSP] = useState([]);
  const [listCategory, ganListcategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let {categoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("http://localhost:3001/api/products/category/" +  categoryId)
    .then(res => res.json()).then(data => ganListSP(data));

    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => ganListcategory(data));
  }, [categoryId]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listsp.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(listsp.length / productsPerPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container-shop">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Sản Phẩm
            </li>
          </ol>
        </nav>
        {/* Thêm phần menu phân loại sản phẩm */}
        <div className="category-menu">
          <Link to="/shop" className="category-item active" >
            Tất cả
          </Link>
          {listCategory.map(category => (
            <Link to={`/category/${category._id}`} className="category-item active" key={category._id} >
              {category.name}
            </Link>
          ))}
        </div>
        {/* Sản phẩm */}
        <div className="products">
          { currentProducts.map(product => (
                <div className="product-item" key={product._id}>
                  <div className="product-card">
                    <div className="product-image">
                      <img src={`http://localhost:3001/${product['imageUrl']}`} alt={product.name} />
                      <div className="discount-tag">-20%</div>
                    </div>
                    <div className="product-info">
                      <div className="product-name">
                        <p>{product.name}</p>
                      </div>
                      <div className="product-price">
                        <div className="add-like">
                          <i className="far fa-heart" />
                          <button className="heart-button">Thêm vào sản phẩm yêu thích</button>
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
  );
};

export default ShopPage;
