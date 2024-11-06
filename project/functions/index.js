const functions = require('firebase-functions');
const express = require('express');
const jsonServer = require('json-server');

// إنشاء تطبيق Express
const app = express();

// إعداد JSON Server
const router = jsonServer.router('../../json/db.json'); // تأكد من أن لديك db.json في مجلد functions أو استخدم المسار الصحيح
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

// تصدير التطبيق كدالة Firebase
exports.api = functions.https.onRequest(app);
