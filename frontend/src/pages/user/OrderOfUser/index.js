import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const OrderOfUser = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/orders/user/${userId}`)
      .then(response => {
        const formattedOrders = response.data.map(order => {
          // Format the createdAt date
          const formattedDate = new Date(order.createdAt).toLocaleString();

          return {
            ...order,
            createdAt: formattedDate,
          };
        });

        setOrders(formattedOrders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  return (


    <div id="orders" className="tab-content">
      <h1>Đơn Hàng</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Người Mua Hàng</th>
            <th>Ngày Đặt</th>
            <th>Tổng Cộng</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr>
              <td><Link to={`/profile/orders/orderdetail/${order._id}`}>{order._id}</Link></td>
              <td>{order.name}</td>
              <td>{order.createdAt}</td>
              <td>{order.Totalbill}</td>
              <td>Đang xử lý</td>
              </tr>
      ))}
            </tbody>
</table>
    </div>
  );
}

export default OrderOfUser;
