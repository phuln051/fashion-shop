import React, { useState, useEffect,  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ListCategory = () => {
    const [listCategory, setListcategory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
   
        fetch('http://localhost:3001/api/categories')
          .then(res => res.json())
          .then(data => setListcategory(data));
      }, []);

      const deleteCategory = async (id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/api/categories/${id}`);
            const {  affectedRows } = response.data;

            if (affectedRows > 0) {
                alert(' Xóa danh mục thành công')
                window.location.reload();
            } else {
                console.log('Không thể xóa danh mục');  // Log failure message
            }
            window.location.reload();
            // Navigate to the desired page after deletion (e.g., product list)
            navigate('/admin/listCategory');
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }

    }
    return(
        <>
  <div className="card shadow mb-4">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">Danh sách danh mục</h6>
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
              <th>Mã danh mục</th>  
              <th>Tên danh mục</th>
              <th>Hình ảnh</th>
              <th colSpan={2}>Hành động</th>
              
            </tr>
          </thead>
          <tbody>
          {listCategory.map((loai, i) => (
            <tr key={i}>
              <td>{loai._id}</td>
              <td>{loai.name}</td>
              <td><img style={{ width: '200px' }}  src={`http://localhost:3001/${loai['imageUrl']}`} alt="" /></td>
             <td><Link to={`/admin/category/${loai._id}`}>Sửa</Link></td>
             <td onClick={() => deleteCategory(loai._id)}><Link>Xóa</Link></td>
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

export default ListCategory;