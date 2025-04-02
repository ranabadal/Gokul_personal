import React,{useState} from 'react';
import styles from './topSection.module.css';
import BelowHeader from '../../../components/below_header/below_header'
import ChangePassword from '../BottomSection/ChangePassword/changePassword'
import Address from '../BottomSection/Address/Address';
import OrderHistory from '../BottomSection/order_history/order_history';
import Boking_history from '../BottomSection/boking_history/boking_history';
import UpdateProfile from '../BottomSection/UpdateProfile/updateProfile';

const TopSection = () => {
    const [activeSection, setActiveSection] = useState("MyProfile");

    const renderActiveSection = () => {
        switch (activeSection) {
          case "MyProfile":
            return <UpdateProfile />;
          case "ChangePassword":
            return <ChangePassword />;
          case "ManageAddress":
            return <Address/>;
          case "OrdersHistory":
            return <OrderHistory />;
          case "MyBookings":
            return <Boking_history />;
          default:
            return <UpdateProfile />;
        }
      };
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
       <div className={styles.below_header}>
                   <div className={styles.below_header_container}>
                       <div className={`${styles.links} ${activeSection === "MyProfile" ? styles.active : ""}`} onClick={() => setActiveSection("MyProfile")}>Update Profile</div>
                       <div className={`${styles.links} ${activeSection === "ManageAddress" ? styles.active : ""}`} onClick={() => setActiveSection("ManageAddress")}>Manage Address</div>
                       <div className={`${styles.links} ${activeSection === "OrdersHistory" ? styles.active : ""}`} onClick={() => setActiveSection("OrdersHistory")}>My Orders</div>
                       <div className={`${styles.links} ${activeSection === "MyBookings" ? styles.active : ""}`} onClick={() => setActiveSection("MyBookings")}>My Bookings</div>
                       <div className={`${styles.links} ${activeSection === "ChangePassword" ? styles.active : ""}`} onClick={() => setActiveSection("ChangePassword")}>Change Password</div>
       
                   </div>
               </div>
      </div>

        <div className={styles.bottomSection}>
        {renderActiveSection()}
        </div>
    </div>
  )
}

export default TopSection
