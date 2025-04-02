const { getProfile, updateProfile, updateProfilePic, changePassword } = require('../../Controllers/Tasks/Profile.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');
const multer = require('multer');


const router = require('express').Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

// const router = require('express').Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });

router.get('/', isAuthenticated, getProfile);
router.put('/', isAuthenticated, updateProfile);
router.post('/profile-pic', isAuthenticated, upload.single('profilePic'), updateProfilePic);
router.put('/change-password', isAuthenticated, changePassword);

module.exports = router;