
// import './App.css';
// import Home from './pages/home/home';
// import Banquets from './pages/banquets/banquets';

// function App() {
//   return (
//     <div>
//       {/* <Home/> */}
//       <Banquets/>
//     </div>
//   );
// }

// export default App;


import RouterPath from "./routes/routerPath";
import routes from './routes/const';
import { BrowserRouter } from 'react-router-dom';
import { ToasterProvider } from './utils';
import { UserProvider } from './components/Context/userContext';

import './App.css';

function App() {

  const userId = "67c540b3f197c5fa8b5166ba"; // Dynamically fetch logged-in user ID
  return (
    <UserProvider>
  
        <ToasterProvider>
          <BrowserRouter>
            <RouterPath />
          </BrowserRouter>
        </ToasterProvider>
   
    </UserProvider>
  );
}

export default App;
