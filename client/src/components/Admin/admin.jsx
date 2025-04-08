// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import styles from './admin.module.css';
// // import Dashboard from './pages/Dashboard';
// // import ProductsManagement from './pages/ProductsManagement';
// // import TodaysDealsManagement from './pages/TodaysDealsManagement';
// import UsersManagement from './UserMng/userMng';
// // import BanquetBookingManagement from './pages/BanquetBookingManagement';
// import ContactQueriesManagement from './ContactQueryMng/contactQueryMng';
// import Header from './Header/header';
// import Sidebar from './Sidebar/sidebar';

// const Admin = () => {
//   const location = useLocation();

//   const renderContent = () => {
//     switch (location.pathname) {
//       case '/admin/users':
//         return <UsersManagement />;
//       case '/admin/queries':
//         return <ContactQueriesManagement />;
//       // case '/admin/dashboard':
//       //   return <Dashboard />;
//       // case '/admin/products':
//       //   return <ProductsManagement />;
//       // case '/admin/deals':
//       //   return <TodaysDealsManagement />;
//       // case '/admin/bookings':
//       //   return <BanquetBookingManagement />;
//       default:
//         return <UsersManagement />; // Default to Users Management
//     }
//   };

//   return (
//     <div className={styles.admin}>
//       <Sidebar />
//       <div className={styles.content}>
//         <Header />
//         <main className={styles.main}>
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Admin;


import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './admin.module.css';
import UsersManagement from './UserMng/userMng';
import ProductsManagement from './ProductMng/productMng';
import ContactQueriesManagement from './ContactQueryMng/contactQueryMng';
import Header from './Header/header';
import Sidebar from './Sidebar/sidebar';
import BanquetManagement from './BanquetBookingMng/banquetBookingMng';
import MenuCartManagement from './MenuCartMng/menuCartMng';
import BulkOrderManagement from './BulkOrderMng/bulkOrderMng';
import GiftBoxManagement from './GiftBoxMng/giftBoxMng';
import BanquetQueryPage from './BanquetQueryMng/banquetQueryMng';
import BulkOrderQuery from './BulkOrderQuery/bulkOrderQuery'
import GiftBoxOrderQueryPage from './GiftBoxOrderQuery/giftBoxOrderQuery'
import MenuMng from './MenuMng/menuMng';
import RestaurtentNavbar from './RestaurentNavMng/restaurentNavMng'

import TodaysDealMng from './TodaysDealMng/todaysDealMng';

const Admin = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/users':
        return <UsersManagement />;
      case '/admin/queries':
        return <ContactQueriesManagement />;
        case '/admin/products':
          return <ProductsManagement />;
          case '/admin/bookings':
          return <BanquetManagement />;
          case '/admin/menuCart':
            return <MenuCartManagement />;
            case '/admin/bulkOrder':
              return <BulkOrderManagement />;
              case '/admin/giftBox':
                return <GiftBoxManagement />;
                case '/admin/banquetQuery':
                return <BanquetQueryPage />;
                case '/admin/bulkOrderQuery':
                  return <BulkOrderQuery />;
                  case '/admin/giftBoxOrderQuery':
                  return <GiftBoxOrderQueryPage />;
                  case '/admin/menu':
                  return <MenuMng />;
                  case '/admin/restaurentNav':
                    return <RestaurtentNavbar />;
                    case '/admin/todaysDeal':
                      return <TodaysDealMng />;
      default:
        return <UsersManagement />; // Default to Users Management
    }
  };

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.brand}>🍬 Gokul's Admin Panel 🍬</h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
