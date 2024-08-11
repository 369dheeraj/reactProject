const sql = require('mssql');
const { ConnectionPool } = require('mssql');
const poolPromise = require('../model/database');
const bcrypt = require('bcryptjs');

// Define route handler
async function findByUser(email) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    if (result.recordset.length === 0) {
      return { length: 0, user: null }; // Return an object with length and user data
    } else {
      return { length: result.recordset.length, user: result.recordset[0] };
    }
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw new Error('Internal server error');
  }
}

async function saveUser(email, hashedPassword) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Email', sql.VarChar, email)
        .input('Password', sql.VarChar,hashedPassword)
        .query('INSERT INTO Users (email, password) VALUES (@email, @password)');
      return true; // User saved successfully
    } catch (err) {
      console.error('Error saving user:', err);
      return false; // Error occurred while saving user
    }
  }

  async function findFoodItem(foodItem) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('foodItem', sql.VarChar, foodItem)
        .query('SELECT * FROM fooditem WHERE name = @foodItem');
      if (result.recordset.length === 0) {
        return { length: 0, foodItem: null }; // Return an object with length and user data
      } else {
        return { length: result.recordset.length, foodItem: result.recordset[0] };
      }
    } catch (err) {
      console.error('Error fetching user by food name:', err);
      throw new Error('Internal server error');
    }
  }
  

module.exports = { findByUser, saveUser, findFoodItem };