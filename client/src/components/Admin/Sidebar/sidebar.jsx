// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from './sidebar.module.css';

// const Sidebar = () => {
//   return (
//     <div className={styles.sidebar}>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to="/admin/dashboard" activeClassName={styles.active}>Dashboard</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/products" activeClassName={styles.active}>Products Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/users" activeClassName={styles.active}>Users Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/bookings" activeClassName={styles.active}>Banquet Booking Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/queries" activeClassName={styles.active}>Contact Queries Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/menuCart" activeClassName={styles.active}>Menu Cart Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/bulkOrder" activeClassName={styles.active}>Bulk Order Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/giftBox" activeClassName={styles.active}>Gift Box Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/banquetQuery" activeClassName={styles.active}>Banquet Query Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/bulkOrderQuery" activeClassName={styles.active}>Bulk Order Query Management</NavLink>
//           </li>
//           <li>
//             <NavLink to="/admin/giftBoxOrderQuery" activeClassName={styles.active}>Gift Box Order Query Management</NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = () => {
  // State to control dropdown visibility
  const [showBanquetDropdown, setShowBanquetDropdown] = useState(false);
  const [showBulkOrderDropdown, setShowBulkOrderDropdown] = useState(false);
  const [showGiftBoxDropdown, setShowGiftBoxDropdown] = useState(false);

  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" activeClassName={styles.active}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" activeClassName={styles.active}>Products Management</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName={styles.active}>Users Management</NavLink>
          </li>
          <li>
            {/* Banquet Management Dropdown */}
            <div 
              className={styles.dropdownHeader}
              onClick={() => setShowBanquetDropdown((prev) => !prev)}
            >
              Banquet Management
              <span className={styles.dropdownArrow}>
                {showBanquetDropdown ? '▲' : '▼'}
              </span>
            </div>
            {showBanquetDropdown && (
              <ul className={styles.dropdown}>
                <li>
                  <NavLink to="/admin/bookings" activeClassName={styles.active}>Banquet Details Management</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/banquetQuery" activeClassName={styles.active}>Banquet Query Management</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {/* Bulk Order Management Dropdown */}
            <div 
              className={styles.dropdownHeader}
              onClick={() => setShowBulkOrderDropdown((prev) => !prev)}
            >
              Bulk Order Management
              <span className={styles.dropdownArrow}>
                {showBulkOrderDropdown ? '▲' : '▼'}
              </span>
            </div>
            {showBulkOrderDropdown && (
              <ul className={styles.dropdown}>
                <li>
                  <NavLink to="/admin/bulkOrder" activeClassName={styles.active}>Bulk Order Details Management</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/bulkOrderQuery" activeClassName={styles.active}>Bulk Order Query Management</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {/* Gift Box Management Dropdown */}
            <div 
              className={styles.dropdownHeader}
              onClick={() => setShowGiftBoxDropdown((prev) => !prev)}
            >
              Gift Box Management 
              <span className={styles.dropdownArrow}>
                {showGiftBoxDropdown ? '▲' : '▼'}
              </span>
            </div>
            {showGiftBoxDropdown && (
              <ul className={styles.dropdown}>
                <li>
                  <NavLink to="/admin/giftBox" activeClassName={styles.active}>Gift Box Details Management</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/giftBoxOrderQuery" activeClassName={styles.active}>Gift Box Order Query Management</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/admin/queries" activeClassName={styles.active}>Contact Queries Management</NavLink>
          </li>
          <li>
            <NavLink to="/admin/menuCart" activeClassName={styles.active}>Menu Buffet Management</NavLink>
          </li>
          <li>
            <NavLink to="/admin/menu" activeClassName={styles.active}>Menu Management</NavLink>
          </li>
          <li>
            <NavLink to="/admin/restaurentNav" activeClassName={styles.active}>Product <i class="fas fa-pagelines    "></i> Navbar Management</NavLink>
          </li>
          <li>
            <NavLink to="/admin/todaysDeal" activeClassName={styles.active}>Todays Deal Products Management</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;