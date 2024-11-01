import Header from './Header';
import { Outlet } from 'react-router-dom';
import './UserProfile.scss'
const RootProfileLayout = () => {
  return (
     <div className="container-userprofile">
     <div className="container-profile">
     <Header />
       <div className="main-profile">
       <Outlet />
       </div>
     </div>
   </div>
  );
};

export default RootProfileLayout;
