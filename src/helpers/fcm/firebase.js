
const admin = require("firebase-admin");

const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

const serviceAccount = require(serviceAccountKey);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;
