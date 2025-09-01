// promote-to-admin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const promoteToAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Change this to the email of the user you want to promote
    const userEmail = 'rushi@gmail.com'; // CHANGE THIS
    
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log('✅ User promoted to admin successfully!');
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
    } else {
      console.log('❌ User not found with email:', userEmail);
      console.log('Available users:');
      const allUsers = await User.find({}, 'email name role');
      console.log(allUsers);
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

promoteToAdmin();
