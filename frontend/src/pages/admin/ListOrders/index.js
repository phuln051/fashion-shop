import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3001/api/orders')
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
          const formattedOrders = data.map(order => {
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
    }, []);
    return(
        <>
  <div className="card shadow mb-4">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">Danh sách đơn hàng</h6>
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
              <th>Mã đơn hàng</th>
              <th>Người mua</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Ngày mua</th>
              
            </tr>
          </thead>
          <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <td><Link to={`/admin/orders/orderdetail/${order._id}`}>{order._id}</Link></td>
              <td>{order.name}</td>
              <td>{order.email} </td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{order.createdAt}</td>
          </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>

    )
}

export default ListOrder;