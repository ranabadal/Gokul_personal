const bcrypt = require('bcryptjs');

const testPassword = async () => {
  const storedHash = "$2b$10$a1GULeR8R0Yc6bUte3Bh1.I0pfu5bF9HjaWljAvGssnQOfRSX/Xj6"; // Copy from MongoDB
  const isMatch = await bcrypt.compare("GokulAdminPassword", storedHash);
  console.log("Test Password Match:", isMatch);
};

testPassword();