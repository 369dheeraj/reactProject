// passwordService.js
const bcrypt = require('bcryptjs');

class PasswordService {
  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      // Handle any errors during hashing
      console.error('Error hashing password:', error);
      throw error; // Rethrow the error for proper handling
    }
  }

  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      // Handle any errors during comparison
      console.error('Error comparing password:', error);
      throw error; // Rethrow the error for proper handling
    }
  }
}

module.exports = new PasswordService(); // Export an instance of the service
