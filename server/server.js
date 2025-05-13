



// old correctly working code

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const session = require('express-session');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// require('./passport-setup');

// const app = express();
// require('./Models/Auth/Auth.model');
// const AuthRouter = require('./Routes/Auth/Auth');
// const contactRoutes = require('./Routes/Auth/Auth');
// const profileRoutes = require('./Routes/Tasks/Profile');
// const addressRoutes = require('./Routes/Tasks/addressRoutes');
// const reviewRoutes = require('./Routes/Tasks/reviewRoutes');
// const productRoutes = require("./Routes/Tasks/productRoutes");

// // Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// app.use(bodyParser.json());
// app.use(cors());

// app.use(session({
//   secret: 'secret-123',
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(uploadsDir));

// app.use('/auth', AuthRouter);
// app.use('/contact', contactRoutes);
// app.use('/profile', profileRoutes);
// app.use('/address', addressRoutes);
// app.use('/reviews', reviewRoutes); 
// app.use("/api/products", productRoutes);

// // Serve static files from the React app build directory
// app.use(express.static(path.join(__dirname, '../client/build')));

// // Google OAuth routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/auth/failed' }),
//   (req, res) => {
//     const user = req.user;
//     if (!user) {
//       return res.redirect('/auth/failed');
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.cookie('jwtToken', token, { httpOnly: true });
//     res.redirect('/');
//   });

// app.get('/auth/failed', (req, res) => res.send('You Failed to log in!'));

// // Catch-all route to serve the front-end application
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log('server is running on ', PORT);
// });


//latest code 28 feb



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const session = require('express-session');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// require('./passport-setup');

// const app = express();
// require('./Models/Auth/Auth.model');
// const AuthRouter = require('./Routes/Auth/Auth');
// const contactRoutes = require('./Routes/Auth/Auth');
// const profileRoutes = require('./Routes/Tasks/Profile');
// const addressRoutes = require('./Routes/Tasks/addressRoutes');
// const reviewRoutes = require('./Routes/Tasks/reviewRoutes');
// const productRoutes = require("./Routes/Tasks/productRoutes");

// app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to handle large base64 images
// app.use(cors());

// app.use(session({
//   secret: 'secret-123',
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', AuthRouter);
// app.use('/contact', contactRoutes);
// app.use('/profile', profileRoutes);
// app.use('/addresses', addressRoutes);
// app.use('/reviews', reviewRoutes); 
// app.use("/api/products", productRoutes);

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/auth/failed' }),
//   (req, res) => {
//     const user = req.user;
//     if (!user) {
//       return res.redirect('/auth/failed');
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.cookie('jwtToken', token, { httpOnly: true });
//     res.redirect('/');
//   });

// app.get('/auth/failed', (req, res) => res.send('You Failed to log in!'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log('server is running on ', PORT);
// });


// new code for admin panel


const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); 
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('./passport-setup');

const app = express();
require('./Models/Auth/Auth.model');
require('./Models/Tasks/Contact.model');
const AuthRouter = require('./Routes/Auth/Auth');
const contactRoutes = require('./Routes/Tasks/ContactQuery.routes'); // Update path
const profileRoutes = require('./Routes/Tasks/Profile');
const addressRoutes = require('./Routes/Tasks/addressRoutes');
const reviewRoutes = require('./Routes/Tasks/reviewRoutes');
const productRoutes = require("./Routes/Tasks/productRoutes");
const userRoutes = require('./Routes/Tasks/User.routes');
const cartRoutes = require('./Routes/Tasks/cartRoutes');
const wishlistRoutes = require('./Routes/Tasks/wishlistRoutes');
const todaysDealRoutes = require('./Routes/Tasks/TodaysDealProduct.routes');
const banquetHallRoutes = require('./Routes/Tasks/BanquetHall.routes');
const menuRoutes = require("./Routes/Tasks/menuRoutes");
const menuCartRoutes = require("./Routes/Tasks/menuCartRoutes");
const bulkOrderRoutes = require("./Routes/Tasks/BulkOrder/regularBox.routes");

const banquetQueryRoutes = require('./Routes/Tasks/banquetQueryRoutes');
const GiftBoxesForBulkOrder = require('./Routes/Tasks/BulkOrder/GiftBoxesForBulkOrder.routes');
const GiftBoxOrderQueryRoutes = require('./Routes/Tasks/GiftBoxes/GiftBoxOrderQueryRoutes');
const RestaurentNavbar = require('./Routes/Tasks/restaurentNavbarRoutes');
const RestaurentProducts = require("./Routes/Tasks/restaurentProductsRoutes");
const TakeawayOrderRoutes = require("./Routes/Tasks/takeawayRoutes");
const RegularBoxRoutes = require("./Routes/Tasks/BulkOrder/regularBox.routes");
const bulkOrderQueryRoutes = require("./Routes/Tasks/BulkOrder/bulkOrderQueryRoutes");
const GiftBoxesRoutes = require('./Routes/Tasks/GiftBoxes/GiftBoxes.routes');
const AdminRoutes = require('./Routes/Tasks/admin.routes');


app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to handle large base64 images
app.use(cors());

app.use(session({
  secret: 'secret-123',
  resave: false,
  saveUninitialized: true,
}));

// Create uploads directory if it doesn't exist

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', AuthRouter);
app.use('/api/contact', contactRoutes); // Update path for contact queries
app.use('/api/profile', profileRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewRoutes); 
app.use("/api", productRoutes);
app.use('/api/users', userRoutes);
app.use('/api', cartRoutes); // Use cart routes
app.use('/api', wishlistRoutes); // Use wishlist routes
app.use('/api',todaysDealRoutes);
app.use('/api',banquetHallRoutes);
app.use("/api/menus", menuRoutes);
app.use('/api/bulkorders', GiftBoxesForBulkOrder);
app.use('/api/regularBoxes', RegularBoxRoutes); // Use regular box routes
app.use('/api/bulkOrder', bulkOrderRoutes); // Use bulk order routes
app.use('/api/giftboxpage', GiftBoxesRoutes); // Use gift boxes routes
app.use("/api/queries", banquetQueryRoutes);
app.use('/api/bulkOrderQueries',bulkOrderQueryRoutes);
app.use("/api/menuCart", menuCartRoutes); // Use menu cart routes
app.use('/api/navbar', RestaurentNavbar); // Use gift box routes
app.use('/api/restaurentProducts', RestaurentProducts);
app.use('/api/giftBoxOrderQueries',GiftBoxOrderQueryRoutes);
app.use('/api/takeawayOrders', TakeawayOrderRoutes);
app.use('/api/admin', AdminRoutes); // Use admin routes


app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect('/auth/failed');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('jwtToken', token, { httpOnly: true });
    res.redirect('/');
  });

app.get('/auth/failed', (req, res) => res.send('You Failed to log in!'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('server is running on ', PORT);
});
