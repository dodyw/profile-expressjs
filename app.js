const express = require('express');
const firebaseAdmin = require('./firebase');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const setupRouter = () => {
    app.use(express.json({ limit: '5mb' }));
    app.use('/api/users', userRoutes);
};

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

setupRouter();
startServer();

module.exports = app;
