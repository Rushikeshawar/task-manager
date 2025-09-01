// simple-admin-setup.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for admin setup');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const createAdminUser = async () => {
  try {
    await connectDB();

    // Admin details
    const adminEmail = 'admin@taskmanager.com';
    const adminName = 'System Administrator';
    
    // Generate a temporary UID (you'll replace this after Firebase user creation)
    const tempUid = 'temp-admin-uid-' + Date.now();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: adminEmail, 
      role: 'admin' 
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      process.exit(0);
    }

    // Create MongoDB user with admin role (without Firebase for now)
    const user = new User({
      uid: tempUid,
      email: adminEmail,
      name: adminName,
      role: 'admin'
    });

    await user.save();

    console.log('🎉 Admin user created in MongoDB!');
    console.log('📧 Email:', adminEmail);
    console.log('👤 Role: admin');
    console.log('\n📝 Next Steps:');
    console.log('1. Go to Firebase Console and create a user with email:', adminEmail);
    console.log('2. Set a password for this user');
    console.log('3. Copy the Firebase UID');
    console.log('4. Update the MongoDB record with the correct UID');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdminUser();
