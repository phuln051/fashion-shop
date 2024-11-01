import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [priority, setPriority] = useState(0); // Khởi tạo giá trị mặc định là ""
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveCategory = async (e) => {
        e.preventDefault();
        if (name === "" || image === null) {
            toast.error("Please fill out all input completely");
            return;
        }
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("image", image);
            formData.append("priority", priority);
        
            // Gửi yêu cầu POST đến API endpoint "/api/categories"
            const response = await axios.post("http://localhost:3001/api/categories", formData, { 
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(`Save ${response.data.name} Successfully`);
            setIsLoading(false);
            navigate("/admin/listCategory");
        } 
        catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Thêm danh mục
            </h2>
            <form id="frmthanhtoan" onSubmit={saveCategory} encType="multipart/form-data" >
                <div className="space-y-2">
                    <div>
                        <label >Tên danh mục</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Name" />
                    </div>
                    <div>
                        <label >Độ ưu tiên</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400">
                            <option value="">Không</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            {/* Thêm các option khác tùy thuộc vào yêu cầu của bạn */}
                        </select>
                    </div>
                    <label >Hình ảnh</label>
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
                            Save
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateCategory;
