"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const express = require("express");
const mercadopago = require("mercadopago");
mercadopago.configure({
    client_id: '6892242983944155',
    client_secret: 'TQ0RA4WdF8UrQ4C9mSKty9ftOmqJAMlC'
});
const cors = require('cors')({ origin: true });
const app = express();
firebase.initializeApp(functions.config().firebase);
const usersRef = firebase.database().ref('/users');
app.use(cors);
//app.use(validateFirebaseIdToken);
app.get('/user/search', (req, res) => {
    const val = req.query.val;
    usersRef.orderByChild('nombre_busqueda').startAt(val).endAt(`${val}\uf8ff`).once('value', (snap) => {
        if (snap.val() !== null) {
            var returnArr = [];
            for (var key in snap.val()) {
                if (snap.val().hasOwnProperty(key)) {
                    var user = snap.val()[key];
                    returnArr.push(user);
                }
            }
            res.status(200).json(returnArr);
        }
        else {
            res.status(200).json([]);
        }
    }).catch(error => {
        console.log('Error getting user details', val, error.message);
        res.sendStatus(500);
    });
});
app.get('/user/search-by-location', (req, res) => {
    const placeId = req.query.placeId;
    usersRef.orderByChild('place_id').equalTo(placeId).once('value', (snap) => {
        if (snap.val() !== null) {
            var returnArr = [];
            for (var key in snap.val()) {
                if (snap.val().hasOwnProperty(key)) {
                    var user = snap.val()[key];
                    returnArr.push(user);
                }
            }
            res.status(200).json(returnArr);
        }
        else {
            res.status(200).json([]);
        }
    }).catch(error => {
        console.log('Error getting user details', placeId, error.message);
        res.sendStatus(500);
    });
});
app.get('/user/username', (req, res) => {
    const username = req.query.val;
    const userId = req.query.id;
    usersRef.orderByChild('username').equalTo(username).once('value', (snap) => {
        if (snap.val() == null) {
            res.status(200).json({ val: true });
        }
        else if (snap.val()[userId]) {
            res.status(200).json({ val: true });
        }
        else {
            res.status(200).json({ val: false });
        }
    }).catch(error => {
        console.log('Error getting user details', username, error.message);
        res.sendStatus(500);
    });
});
app.post('/notifications-mp', (req, res) => {
    const topic = req.query.topic;
    const id = req.query.id;
    console.log('topic de ipn: ' + topic);
    console.log('id de ipn: ' + id);
    mercadopago.payment.get(id).then(function (response) {
        console.log('pago obtenido: ', response);
    }).then(function (error) {
        console.log('pago obtenido An error ocurred: ' + error.message);
    });
    res.sendStatus(200);
});
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map