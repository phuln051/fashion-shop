import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const getCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/categories/${id}`);
      setCategory({
        name: response.data.name,
        image: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("image", category.image);
  
      await axios.put(`http://localhost:3001/api/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Updated a product successfully");
      navigate("/admin/listCategory");
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
       Sửa danh mục
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form  id="frmthanhtoan" onSubmit={updateProduct}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                 Hình ảnh
                </label>
                <input
                  type="file"
                  onChange={(e) => setCategory({ ...category, image: e.target.files[0] })}
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                />


                {category.image && (
                  <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={category.image} />
                  </div>
                )}
              </div>
              <div>
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                  Sửa
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditCategory;
