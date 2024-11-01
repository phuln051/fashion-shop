import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 từ thư viện uuid

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [priceOld, setPriceOld] = useState("");
    const [discription, setDiscription] = useState("");
    const [material, setMaterial] = useState("");
    const [size, setSize] = useState("");
    const [code, setCode] = useState(""); // Khởi tạo mã sản phẩm
    const [view, setView] = useState(""); 
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchCategories();
    }, []);

    const generateProductCode = (categoryName) => {
       
        const sanitizedCategoryName = categoryName.trim().toLowerCase();
        return sanitizedCategoryName.slice(0, 2) + uuidv4().split('-').pop(); 
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        if (name === "" || quantity === "" || price === "" || priceOld === "" || discription === "" || material === "" || size === "" || selectedCategoryId === "" || image === null) {
            toast.error("Please fill out all input completely");
            return;
        }
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("quantity", quantity);
            formData.append("price", price);
            formData.append("priceOld", priceOld);
            formData.append("discription", discription);
            formData.append("material", material);
            formData.append("size", size);
            formData.append("code", generateProductCode(categories.find(cat => cat._id === selectedCategoryId)?.name || "")); // Tạo mã sản phẩm từ tên danh mục
            formData.append("categoryId", selectedCategoryId);
            formData.append("image", image);
            formData.append("view", 0); // Thêm trường "view" mặc định bằng 0
    
            // Gửi yêu cầu POST đến API endpoint "/api/products"
            const response = await axios.post("http://localhost:3001/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            toast.success(`Save ${response.data.name} Successfully`);
            setIsLoading(false);
            navigate("/admin/listProduct");
        }
        catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };
    

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Thêm sản phẩm
            </h2>
            <form id="frmthanhtoan" onSubmit={saveProduct} encType="multipart/form-data" >
                <div className="space-y-2">
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Tên sản phẩm</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Số lượng</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Giá khuyến mãi</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Giá</label>
                        <input type="number" value={priceOld} onChange={(e) => setPriceOld(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Mô tả</label>
                        <input type="text" value={discription} onChange={(e) => setDiscription(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Vật liệu</label>
                        <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Kích thước</label>
                        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
        
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Danh mục sản phẩm</label>
                        <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                        >
                            <option value="">Chọn danh mục sản phẩm</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="text-gray-600 mb-2 block font-semibold">Hình ảnh</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                </div>
                <div>
                    {isLoading ? (
                        <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold cursor-not-allowed">
                            Saving...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600"
                        >
                            Thêm
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
