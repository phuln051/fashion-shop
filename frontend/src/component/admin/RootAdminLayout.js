import React, { useState } from 'react';
import { Outlet, Link, } from 'react-router-dom';
import './admin.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { thoat } from '../../pages/admin/Login/authSlice';
const RootAdminLayout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const admin = useSelector(state => state.authen.admin);
    const dispatch = useDispatch();
console.log(admin);
    const handleLogout = () => {
        dispatch(thoat());
    
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div id="wrapper">
            <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                <Link
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                    href="index.html"
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        SB Admin <sup>2</sup>
                    </div>
                </Link>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <Link to='#' className="nav-link" >
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <hr className="sidebar-divider" />
                <li className="nav-item">
                    <Link to='#'
                        className="nav-link collapsed"

                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                    >
                        <i className="fas fa-fw fa-folder" />
                        <span>Quản lý danh mục</span>
                    </Link>
                    <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionSidebar"
                    >
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to='/admin/createCategory' className="collapse-item" href="buttons.html">
                                Thêm danh mục
                            </Link>
                            <Link to='/admin/listCategory' className="collapse-item" href="cards.html">
                                Danh sách danh mục
                            </Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to='#'
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseUtilities"
                        aria-expanded="true"
                        aria-controls="collapseUtilities"
                    >
                        <i className="fas fa-fw fa-folder" />
                        <span>Quản lý sản phẩm</span>
                    </Link>
                    <div
                        id="collapseUtilities"
                        className="collapse"
                        aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar"
                    >
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to='/admin/createProduct' className="collapse-item" href="utilities-color.html">
                                Thêm sản phẩm
                            </Link>
                            <Link to='/admin/listProduct' className="collapse-item" href="utilities-border.html">
                                Danh sách sản phẩm
                            </Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to='#'
                        className="nav-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapsePages"
                        aria-expanded="true"
                        aria-controls="collapsePages"
                    >
                        <i className="fas fa-fw fa-folder" />
                        <span>Quản lý đơn hàng</span>
                    </Link>
                    <div
                        id="collapsePages"
                        className="collapse"
                        aria-labelledby="headingPages"
                        data-parent="#accordionSidebar"
                    >
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" href="login.html">
                                Đơn hàng chờ xử lý
                            </Link>
                            <Link to='/admin/listOrder' className="collapse-item" href="register.html">
                                Tất cả đơn hàng
                            </Link>

                        </div>
                    </div>
                </li>
            </ul>
            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    {/* Topbar */}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        {/* Sidebar Toggle (Topbar) */}
                        <button
                            id="sidebarToggleTop"
                            className="btn btn-link d-md-none rounded-circle mr-3"
                        >
                            <i className="fa fa-bars" />
                        </button>
                        {/* Topbar Search */}
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 small"
                                    placeholder="Search for..."
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm" />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown no-arrow d-sm-none">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="searchDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-search fa-fw" />
                                </Link>
                                <div
                                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown"
                                >
                                    <form className="form-inline mr-auto w-100 navbar-search">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 small"
                                                placeholder="Search for..."
                                                aria-label="Search"
                                                aria-describedby="basic-addon2"
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="button">
                                                    <i className="fas fa-search fa-sm" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li className="nav-item dropdown no-arrow mx-1">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="alertsDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-bell fa-fw" />
                                    <span className="badge badge-danger badge-counter">3+</span>
                                </Link>
                                <div
                                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown"
                                >
                                    <h6 className="dropdown-header">Alerts Center</h6>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-primary">
                                                <i className="fas fa-file-alt text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 12, 2019</div>
                                            <span className="font-weight-bold">
                                                A new monthly report is ready to download!
                                            </span>
                                        </div>
                                    </Link>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-success">
                                                <i className="fas fa-donate text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 7, 2019</div>
                                            $290.29 has been deposited into your account!
                                        </div>
                                    </Link>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-warning">
                                                <i className="fas fa-exclamation-triangle text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 2, 2019</div>
                                            Spending Alert: We've noticed unusually high spending for your
                                            account.
                                        </div>
                                    </Link>
                                    <Link
                                        className="dropdown-item text-center small text-gray-500"
                                        href="#"
                                    >
                                        Show All Alerts
                                    </Link>
                                </div>
                            </li>
                            {/* Nav Item - Messages */}
                            <li className="nav-item dropdown no-arrow mx-1">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="messagesDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-envelope fa-fw" />
                                    {/* Counter - Messages */}
                                    <span className="badge badge-danger badge-counter">7</span>
                                </Link>
                                {/* Dropdown - Messages */}
                                <div
                                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="messagesDropdown"
                                >
                                    <h6 className="dropdown-header">Message Center</h6>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img
                                                className="rounded-circle"
                                                src="img/undraw_profile_1.svg"
                                                alt="..."
                                            />
                                            <div className="status-indicator bg-success" />
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate">
                                                Hi there! I am wondering if you can help me with a problem
                                                I've been having.
                                            </div>
                                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                                        </div>
                                    </Link>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img
                                                className="rounded-circle"
                                                src="img/undraw_profile_2.svg"
                                                alt="..."
                                            />
                                            <div className="status-indicator" />
                                        </div>
                                        <div>
                                            <div className="text-truncate">
                                                I have the photos that you ordered last month, how would you
                                                like them sent to you?
                                            </div>
                                            <div className="small text-gray-500">Jae Chun · 1d</div>
                                        </div>
                                    </Link>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img
                                                className="rounded-circle"
                                                src="img/undraw_profile_3.svg"
                                                alt="..."
                                            />
                                            <div className="status-indicator bg-warning" />
                                        </div>
                                        <div>
                                            <div className="text-truncate">
                                                Last month's report looks great, I am very happy with the
                                                progress so far, keep up the good work!
                                            </div>
                                            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                        </div>
                                    </Link>
                                    <Link className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            <img
                                                className="rounded-circle"
                                                src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                alt="..."
                                            />
                                            <div className="status-indicator bg-success" />
                                        </div>
                                        <div>
                                            <div className="text-truncate">
                                                Am I a good boy? The reason I ask is because someone told me
                                                that people say this to all dogs, even if they aren't
                                                good...
                                            </div>
                                            <div className="small text-gray-500">
                                                Chicken the Dog · 2w
                                            </div>
                                        </div>
                                    </Link>
                                    <Link
                                        className="dropdown-item text-center small text-gray-500"
                                        href="#"
                                    >
                                        Read More Messages
                                    </Link>
                                </div>
                            </li>
                            <div className="topbar-divider d-none d-sm-block" />
                            {/* Nav Item - User Information */}
                            <li className="nav-item dropdown no-arrow">
                                <Link to='/admin/profile'
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="userDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {admin && (
                                        <span id='userinfo' className="mr-2 d-none d-lg-inline text-gray-600 small">
                                            {admin.name}
                                        </span>
                                    )}

                                    <img
                                        className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg"
                                    />
                                </Link>
                                
                                <div
                                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown"
                                >
                                    <Link to='/admin/profile' className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                        Profile
                                    </Link>
                                    <Link className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                        Settings
                                    </Link>
                                    <Link className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                                        Activity Log
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link onClick={() => handleLogout()}
                                        className="dropdown-item"
                                        href="#"
                                        data-toggle="modal"
                                        data-target="#logoutModal"
                                    >
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className="container-fluid">
                        <Outlet searchQuery={searchQuery} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RootAdminLayout;