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
    mercadopago.payment.get(req.query.id).then(function (response) {
        console.log(response.body.status);
        if (response.body.status == 'approved') {
            usersRef.child(response.body.external_reference).child("pagado").set(true);
        }
        else {
            usersRef.child(response.body.external_reference).child("pagado").set(false);
        }
    }).then(function (error) {
        console.log(error);
    });
    res.sendStatus(200);
});
app.get('/pay-basic', (req, res) => {
    var preference = {
        items: [
            {
                id: '1',
                title: 'Abono Basico QuePinta',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 1
            }
        ],
        payer: {
            email: req.query.email
        },
        external_reference: req.query.uid
    };
    mercadopago.preferences.create(preference).then(function (response) {
        console.log('el pago se crea correctamente');
        res.status(200).json(response.body);
    }).catch(function (error) {
        console.log('error al crear el pago: ' + error.message);
        res.status(500).send(error);
    });
});
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map