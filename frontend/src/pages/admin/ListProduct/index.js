import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios'



const ListProduct = () => {
    const [listsp, setListSP] = useState([]);
    const navigate = useNavigate;
  
    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(res => res.json())
            .then(data => setListSP(data));
    }, []);
    const [sortOptions, setSortOptions] = useState({
       _id: { column: '_id', direction: 'asc' },
        name: { column: 'name', direction: 'asc' },
        priceOld: { column: 'priceOld', direction: 'asc' },
        price: { column: 'price', direction: 'asc' },
        quantity: { column: 'quantity', direction: 'asc' },
        
    });

    const [sortedProducts, setSortedProducts] = useState(listsp);
  

    const sortProducts = (column) => {
        const newSortOptions = { ...sortOptions };
        const currentSort = newSortOptions[column];
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';

        setSortOptions({
            ...newSortOptions,
            [column]: currentSort,
        });

        const sortedProducts = listsp.slice().sort((a, b) => {
            const valueA = getColumnValue(a, column);
            const valueB = getColumnValue(b, column);

            if (currentSort.direction === 'asc') {
                return compareValues(valueA, valueB, column);
            } else {
                return compareValues(valueB, valueA, column);
            }
        });

        setSortedProducts(sortedProducts);
    };
    useEffect(() => {
        // Nếu danh sách sản phẩm chưa được sắp xếp, mặc định sắp xếp theo 'id_sp'
        if (sortedProducts.length === 0) {
            sortProducts('_id');
        }
    }, [sortedProducts]); 

    const getColumnValue = (item, column) => {
        switch (column) {
            case '_id':
                return item._id;
            case 'name':
                return item.name.toLowerCase();
            case 'priceOld':
                return parseFloat(item.priceOld);
            case 'price':
                return parseFloat(item.price);
            case 'quantity':
                return parseFloat(item.quantity);
            default:
                return '';
        }
    };

    const compareValues = (valueA, valueB, column) => {
        if (column === 'quantity') {
            return valueA - valueB;
        } else {
            return valueA < valueB ? -1 : 1;
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6; // Hiển thị ba sản phẩm mỗi trang

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

  const xoaSanPham = async (id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/api/products/${id}`);
            const {  affectedRows } = response.data;

            if (affectedRows > 0) {
                alert(' Xóa sản phẩm thành công')
                window.location.reload();
            } else {
                console.log('Không thể xóa sản phẩm');  // Log failure message
            }
            window.location.reload();
            // Navigate to the desired page after deletion (e.g., product list)
            navigate('/admin/listsp');
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }

    }



    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <th onClick={() => sortProducts('_id')}>
                                       Mã sản phẩm {sortOptions._id.direction === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th>Hình ảnh</th>

                                    <th onClick={() => sortProducts('name')}>
                                        Tên sản phẩm {sortOptions.name.direction === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th onClick={() => sortProducts('priceOld')}>
                                        Giá {sortOptions.priceOld.direction === 'asc' ? '↑' : '↓'}
                                    </th>

                                    <th onClick={() => sortProducts('price')}>
                                        Giá khuyến mãi{sortOptions.price.direction === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th onClick={() => sortProducts('quantity')}>
                                        Số lượng {sortOptions.quantity.direction === 'asc' ? '↑' : '↓'}
                                    </th>
                                   
                                    <th colSpan={2}>Hành động</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((sp, i) => (
                                    <tr key={i}>
                                        <td>{sp._id}</td>
                                        <td><img style={{ width: '150px' }}  src={`http://localhost:3001/${sp['imageUrl']}`} alt="" /> </td>
                                        <td>{sp.name}</td>
                                        <td>{Number(sp['priceOld']).toLocaleString("vi")} </td>
                                        <td>{Number(sp['price']).toLocaleString("vi")} </td>
                                        <td>{sp.quantity}</td>
                                        <td><Link to={`/admin/product/${sp._id}`}>Sửa</Link></td>
                                        <td onClick={() => xoaSanPham(sp._id)}><Link>Xóa</Link></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>  
                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mb-3">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link onClick={() => paginate(currentPage - 1)} className="page-link" href="#">
                                        Trước
                                    </Link>
                                </li>
                                {pageNumbers.map((number) => (
                                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                        <Link onClick={() => paginate(number)} className="page-link" href="#">
                                            {number}
                                        </Link>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link onClick={() => paginate(currentPage + 1)} className="page-link" href="#">
                                        Tiếp theo
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ListProduct;