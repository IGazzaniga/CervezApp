import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import * as express from 'express'
import * as mercadopago from 'mercadopago'
mercadopago.configure({
    client_id: '5916380166339968',
    client_secret: 'e3fqwoAFTMLI9iCcpjpmQlu5kY83QRvc'
});
const cors = require('cors')({origin: true});
const app = express();

firebase.initializeApp(functions.config().firebase);
const usersRef = firebase.database().ref('/users');
const abonosRef = firebase.database().ref('/abonos');

const authenticate = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  firebase.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    req.user = decodedIdToken;
    return next();
  }).catch(() => {
    res.status(403).send('Unauthorized');
  });
};

app.use(cors);

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
      } else {
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
      } else {
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
        res.status(200).json({val:true});
      } else if (snap.val()[userId]) {
        res.status(200).json({val:true});
      } else {
        res.status(200).json({val:false});
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
      } else {
        usersRef.child(response.body.external_reference).child("pagado").set(false);
      }
    }).catch(function (error) {
      console.log(error);
    });
    res.sendStatus(200);
});

app.use(authenticate).get('/pay-abono', (req, res) => {
    abonosRef.child(req.query.abonoId).once("value", (snap) => {
      if (snap.val() != null) {
        let abono = snap.val();
        var preference = {
          items: [
            abono
          ],
          payer: {
            email: req.query.email
          },
          external_reference: req.query.uid,
          back_urls: {
            success:'https://cervezapp-a5297.firebaseapp.com/pago',
            pending:'https://cervezapp-a5297.firebaseapp.com/pago',
            failure:'https://cervezapp-a5297.firebaseapp.com/pago',
          }
        };
        mercadopago.preferences.create(preference).then(function (response) {
          console.log('el pago se crea correctamente');
          res.status(200).json(response.body);
        }).catch(function (error) {
          console.log('error al crear el pago: ' + error.message);
          res.status(500).send(error);
        });
      }
    })
})

exports.api = functions.https.onRequest(app);
