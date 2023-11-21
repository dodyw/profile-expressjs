const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const initializeFirebase = () => {
    const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
};

initializeFirebase();

module.exports = admin;
