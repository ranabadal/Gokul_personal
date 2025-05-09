
import Home from "../pages/home/home";
// import ProductCards from "../cc/ProductCards/productCards"
// import landingPage from "../pages/landingPage";
// import ProductPage from "../pages/productPage";
import Banquets from "../pages/banquets/banquets";
import Address from "../pages/Profile/BottomSection/Address/Address";
import OrderHistory from "../pages/Profile/BottomSection/order_history/order_history";
import About from "../pages/about/about";
import Wishlist from "../pages/wishlist/wishlist"
import LoginIn from "../pages/LoginIn/loginIn";
import ChangePassword from "../pages/Profile/BottomSection/ChangePassword/changePassword";
import Contact from "../pages/Contact/contact";

// import ChangePassword from "../pages/ChangePassword/changePassword";
import BokingHistory from "../pages/Profile/BottomSection/boking_history/boking_history";

// import ChangePassword from "../pages/ChangePassword/changePassword";
import LoginSignupPopup from "../pages/LoginIn/LoginPopup/loginPopup";
import Profile from "../pages/Profile/profile";
import Products from "../pages/Products/products";
import Admin from "../components/Admin/admin";
import Basket from "../components/basket/basket/basket";
import TodaysDeal from "../pages/Today'sDealUpdated/today'sDealUpdated";
import CateringForm from "../pages/banquets/CateringForm/cateringForm"
import GiftBoxes from "../pages/giftBoxes copy/giftBoxes";
import GiftBoxCart from "../pages/giftBoxes/giftBoxCart/giftBoxCart"
import BulkOrder from "../pages/bulkOrders copy/bulkOrders";
import BulkOrderCart from "../pages/bulkOrders/bulkOrderCart/bulkOrderCart";
import PreviewScreen from '../pages/bulkOrders/PreviewScreen/previewScreen'
import Title from "../pages/about/Title/title"
import BulkOrderNew from "../pages/bulkOrders/BulkOrder/bulkOrderNew";
import BulkOrderNewCards from "../pages/bulkOrders/BulkOrder/BulkOrderNewCards/bulkOrderNewCards";
import BulkOrdercartLeft from "../pages/bulkOrders copy/bulkOrderCart/BulkOrderCartLeft/bulkOrderCartLeft";
// import TermsAndConditions from "../pages/TermandCondition/t&c"
import GiftBoxNew from "../pages/giftBoxes/GiftBoxNew/giftBoxNew";


const routes = [
    {
      path: '/',
      element: <Home />
    },
    {
        path: '/title',
        element: <Title />
      },
    {
        path: '/banquets',
        element : <Banquets />
    },
    {
        path: '/address',
        element : <Address />
    },
    {
        path: '/orderhistory',
        element : <OrderHistory />
    },
    {
        path: '/about',
        element : <About />
    },
    {
        path: '/wishlist',
        element : <Wishlist />
    },
    {
        path: '/login',
        element : <LoginIn />
    },
    {
        path: '/bookinghistory',
        element : <BokingHistory />
    },
        {
        path:'/changePassword',
        element : <ChangePassword />
    },
    {
        path:'/contact',
        element : <Contact />
    },
        {
        path:'/loginpopup',
        element : <LoginSignupPopup />
    },
    {
        path:'/profile',
        element : <Profile />
    },
    {
        path:'/products',
        element : <Products />
    },
    {
        path:'/admin/*',
        element : <Admin />
    },
    {
        path:'/basket',
        element : <Basket />
    },
    {
        path:'/todaysDeal',
        element : <TodaysDeal />
    },
    {
        path:'/cateringForm',
        element : <CateringForm />
    },
    {
        path:'/giftbox',
        element : <GiftBoxes />
    },
    {
        path:'/giftboxCart',
        element : <GiftBoxCart />
    },
    {
        path:'/bulkOrders',
        element : <BulkOrder />
    },
    {
        path:'/bulkOrdersNew',
        element : <BulkOrderNew />
    },
    {
        path:'/bulkOrdersNewCards',
        element : <BulkOrderNewCards /> 
    },
    {
        path:'/bulkOrderCart',
        element : <BulkOrderCart />
    },
    {
        path:'/bulkOrderPreviewScreen',
        element : <PreviewScreen />
    }
,
{
    path:'/previewScreen',
    element : <PreviewScreen />
},
{
    path:'/previewScreen',
    element : <PreviewScreen />
},
{
    path: 'bulkOrdercartLeft',
    element: <BulkOrdercartLeft/>
},

{
    path:'/giftBoxNew',
    element : <GiftBoxNew />
},

// {
//     path:'/TermsAndConditions',
//     element : <TermsAndConditions/>
// }

    
   
   
   
    
  ];
  
  export default routes;