const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jwtmiddleware = require('./middleware/jwtVerifyMiddleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.use('/api/users', userRoutes);

//need to use jwtmiddleware and create searchRoutes
app.use('/api/food', jwtmiddleware, userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


