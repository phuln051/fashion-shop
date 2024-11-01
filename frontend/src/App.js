import  { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';


import RootSiteLayout from './component/user/Rootlayout';
import RootProfileLayout from './component/Profie/RoutProfilelayout.js'
import BigSpinner from './component/BigSpinner/index';
import HomePage from './pages/user/Home/Home';
import ShopPage from './pages/user/Shop/Shop';
import ShopDetailPage from './pages/user/ShopDetail/ShopDetail';
import CartPage from './pages/user/Cart/cart';
import CheckoutPage from './pages/user/Checkout/Checkout';
import ThankYou from './pages/user/thankyou/thankyou';
import Login from './pages/user/login/login';
import Register from './pages/user/register';
import ProductsByCategory from './pages/user/ProductsByCategory/index.js';
import UserProfile from './pages/user/UserProfile/index.js';
import OrderOfUser from './pages/user/OrderOfUser/index.js'
import RootAdminLayout from './component/admin/RootAdminLayout.js';
import DashboardPage from './pages/admin/Dasboard/index.js';
import CreateCategory from './pages/admin/CreateCategory/index.js';
import ListCategory from './pages/admin/ListCategory/index.js';
import CreateProduct from './pages/admin/CreateProduct.js/index.js';
import ListProduct from './pages/admin/ListProduct/index.js';
import ListOrder from './pages/admin/ListOrders/index.js';
import OrderDetai from './pages/admin/OrderDetail/index.js';
import LoginAdmin from './pages/admin/Login/index.js';
import EditPage from './pages/admin/UpdateProduct/index.js';
import EditCategory from './pages/admin/EditCategory/index.js';
import AdminProfile from './pages/admin/AdminProfile/index.js';
import OrderDetailAdmin from './pages/admin/OrderDetail/index.js';
import OrderDetailUser from './pages/user/OderDetail/index.js';
import EditProfile from './pages/user/EditProfile/EditProfile.js';
import Collection from './pages/user/Collection/Collection.js';
import CollectionDetail from './pages/user/CollectionDetail/CollectionDetail.js';
import Introduce from './pages/user/Introduce/Introduce.js';
function App() {
  const dalogin = useSelector(state => state.authen.daDangNhap);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);  // Khai báo isAuth ở đây

  useEffect(() => {
    window.scrollTo(0, 0);
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');
    const accessToken = sessionStorage.getItem('accessToken');

    setIsAuth(accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration);

    if (tokenExpiration && Date.now() / 1000 > tokenExpiration) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('tokenExpiration');
    }

    if (isAuth) {
      axios.get('http://localhost:3001/api/users/user-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }
  }, [dispatch, isAuth]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootSiteLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'shop',
          element: <ShopPage />,
          children: [

          ]
          ,

        },
        {
          path: 'shop/:productId',
          element: <ShopDetailPage />
        },
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'collection',
          element: <Collection />
        },
        {
          path: 'collectiondetail',
          element: <CollectionDetail />
        },
        {
          path: 'introduce',
          element: <Introduce />
        },
        // {
        //   path: 'checkout',
        //   element: isAuth ? <CheckoutPage /> : <Login />
        // },
        {
          path: 'checkout',
          element: <CheckoutPage /> 
        },
        {
          path: 'thank-you',
          element: <ThankYou />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
        ,
        {
          path: 'category/:categoryId',
          element: <ProductsByCategory />
        },
        {
          path: 'profile',
          element: <RootProfileLayout />,
          children: [
            {
              index: true,
              element: <UserProfile />
            }
            ,
            {
              path: 'orders/:userId',
              element: <OrderOfUser />
            },
            {
              path: 'orders/orderdetail/:IdOrder',
              element: <OrderDetailUser />
            },
            {
              path: 'editprofile/:UserId',
              element: <EditProfile />
            }

          ]
          ,

        },

      ],
      
    }
    ,{
      path: '/admin',
      element: <RootAdminLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />
        } ,
        {
          path: 'createCategory',
          element: <CreateCategory />
        }
        ,
        {
          path: 'listCategory',
          element: <ListCategory />
        },
        {
          path: 'createProduct',
          element: <CreateProduct />
        }
        ,
        {
          path: 'listProduct',
          element: <ListProduct />
        }
        ,
        {
          path: 'listOrder',
          element: <ListOrder />
        },
        {
          path: 'orders/orderdetail/:IdOrder',
          element: <OrderDetailAdmin />
        }
        ,
        {
          path: 'product/:id',
          element: <EditPage/>
        },
        {
          path: 'category/:id',
          element: <EditCategory/>
        },
        {
          path: 'profile',
          element: <AdminProfile/>
        }
        

      ],
      
    }
    ,
        {
          path: '/auth/login',
          element: <LoginAdmin />
        },

  ]);

  return <RouterProvider router={router} fallbackElement={<BigSpinner />} />;
}

export default App;
