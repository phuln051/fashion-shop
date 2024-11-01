import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


const OrderDetailUser = () => {
  const { IdOrder } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    // Lấy chi tiết đơn hàng
    axios.get(`http://localhost:3001/api/orderDetail/${IdOrder}`)
      .then(response => {
        const formattedOrders = response.data.map(order => {
          const formattedDate = new Date(order.createdAt).toLocaleString();

          return {
            ...order,
            createdAt: formattedDate,
          };
        });

        setOrderDetails(formattedOrders);

        // Lấy thông tin sản phẩm cho từng id_product
        const productIds = formattedOrders.map(order => order.id_product);
        fetchProductDetails(productIds);
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      });
  }, [IdOrder]);

  const fetchProductDetails = (productIds) => {
    const productPromises = productIds.map(productId => (
      axios.get(`http://localhost:3001/api/products/${productId}`)
        .then(response => response.data)
    ));

    Promise.all(productPromises)
      .then(products => {
        setOrderDetails(prevOrderDetails => {
          const updatedOrderDetails = prevOrderDetails.map((order, index) => ({
            ...order,
            productDetails: products[index],
          }));
          return updatedOrderDetails;
        });
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      });
  };

  return (
    <div id="orders" className="tab-content">
      <h1>Chi tiết đơn hàng </h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Sản Phẩm</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(order => (
            <tr key={order._id}>
              <th scope="row">
                {order.productDetails && order.productDetails.imageUrl && (
                  <img className="img-fluid w-10" src={`http://localhost:3001/${order.productDetails.imageUrl}`} alt="" style={{ width: '150px' }} />
                )}
              </th>
              <td>{order.productDetails && order.productDetails.name}</td>
              <td>{order.productDetails && order.productDetails.price}</td>
              <td>{order.quantity}</td>
              <td>{order.productDetails && order.productDetails.price * order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetailUser;
