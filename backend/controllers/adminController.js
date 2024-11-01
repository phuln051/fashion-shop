var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const PRIVATE_KEY = 'snippet secret key';
const mongoose = require('mongoose')
const Admin = require('../models/adminModel');


// Hàm kiểm tra tên người dùng và mật khẩu
const checkUserPass = async (email, password) => {
    try {
        const admin = await Admin.findOne({ email: email, password: password });
        return admin !== null;
    } catch (err) {
        throw err;
    }
};

// Hàm lấy thông tin người dùng
const getUserInfo = async (email) => {
    try {
        const admin = await Admin.findOne({ email: email });
        return admin;
    } catch (err) {
        throw err;
    }
};

const login = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const isAdminValid = await checkUserPass(email, password);

        if (isAdminValid) {
            const adminInfo = await getUserInfo(email);
            const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
                algorithm: 'HS256',
                expiresIn: 120,
                subject: adminInfo._id.toString(),
            });

            res.status(200).json({ token: jwtBearerToken, expiresIn: 120, adminInfo: adminInfo });
        } else {
            res.status(401).json({ 'Thong bao': 'Dang nhap that bai' });
        }
    } catch (err) {
        console.error('Lỗi trong quá trình xử lý đăng nhập:', err);
        res.status(500).json({ 'Thong bao': 'Co loi xay ra trong qua trinh dang nhap' });
    }
});


const changePassword = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    console.log(req.body);

    try {
        const isAdminValid = await checkUserPass(email, oldPassword);

        if (isAdminValid) {
            const db = mongoose.connection; // Sử dụng kết nối từ file index.js
            const adminsCollection = db.collection('admins');

            // Cập nhật mật khẩu mới
            await adminsCollection.updateOne({ email: email }, { $set: { password: newPassword } });

            res.status(200).json({ 'Thong bao': 'Doi mat khau thanh cong' });
        } else {
            res.status(401).json({ 'Thong bao': 'Mat khau cu khong hop le' });
        }
    } catch (err) {
        console.error('Lỗi trong quá trình đổi mật khẩu:', err);
        res.status(500).json({ 'Thong bao': 'Co loi xay ra trong qua trinh doi mat khau' });
    }
});



module.exports = {
    login, changePassword
};
